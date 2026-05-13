import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { fetchTransactions, predictFraud, sendFraudDigestEmail, sendFraudEmail } from "../services/api.js";
import { createAccount, verifyAccount } from "../utils/auth.js";
import { makeId } from "../utils/id.js";
import { initialNotifications } from "../utils/mockData.js";
import { readJson, readText, removeItem, writeJson, writeText } from "../utils/storage.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => readText("theme", "dark"));
  const [user, setUser] = useState(() => readJson("fraudshield-user", null));
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [toastAlerts, setToastAlerts] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const emailedDigestIds = useRef(new Set(readJson("fraudshield-emailed-digest-ids", [])));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    writeText("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!user) return;
    loadTransactions();
  }, [user]);

  useEffect(() => {
    if (!user) return undefined;
    const timer = setInterval(() => {
      const alert = {
        id: makeId("ALERT"),
        merchant: ["MetaPay", "CloudCart", "QuickFuel", "NeoMart"][Math.floor(Math.random() * 4)],
        amount: Math.floor(Math.random() * 90000) / 100,
        time: "Just now",
        severity: Math.random() > 0.55 ? "high" : "medium",
        message: "Live fraud signal detected"
      };
      pushFraudAlert(alert);
    }, 14000);
    return () => clearInterval(timer);
  }, [user]);

  useEffect(() => {
    if (!toastAlerts.length) return undefined;
    const timer = setTimeout(() => {
      setToastAlerts((items) => items.slice(0, -1));
    }, 5200);
    return () => clearTimeout(timer);
  }, [toastAlerts]);

  useEffect(() => {
    if (!user) return undefined;
    const sendDigest = async () => {
      const fraudTransactions = transactions.filter(
        (item) => item.status === "Fraud" && !emailedDigestIds.current.has(item.id)
      );
      if (!fraudTransactions.length) return;

      const result = await sendFraudDigestEmail({ user, transactions: fraudTransactions });
      if (!result.sent) return;

      fraudTransactions.forEach((item) => emailedDigestIds.current.add(item.id));
      writeJson("fraudshield-emailed-digest-ids", [...emailedDigestIds.current]);
      pushFraudAlert({
        id: makeId("DIGEST"),
        merchant: "Fraud digest",
        amount: fraudTransactions.reduce((sum, item) => sum + Number(item.amount || 0), 0),
        time: "Just now",
        severity: "high",
        message: `${result.count} fraud transaction${result.count === 1 ? "" : "s"} emailed to ${result.to}`
      });
    };

    const timer = setInterval(sendDigest, 10 * 60 * 1000);
    return () => clearInterval(timer);
  }, [user, transactions]);

  const pushFraudAlert = (alert) => {
    setNotifications((items) => [alert, ...items].slice(0, 10));
    setToastAlerts((items) => [alert, ...items].slice(0, 3));
  };

  const loadTransactions = async () => {
    setLoadingTransactions(true);
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } finally {
      setLoadingTransactions(false);
    }
  };

  const login = (email, password) => {
    const result = verifyAccount(email, password);
    if (!result.ok) return result;
    writeJson("fraudshield-user", result.user);
    setUser(result.user);
    return result;
  };

  const signup = (name, email, password) => {
    const result = createAccount({ name, email, password });
    if (!result.ok) return result;
    writeJson("fraudshield-user", result.user);
    setUser(result.user);
    return result;
  };

  const logout = () => {
    removeItem("fraudshield-user");
    setUser(null);
    setPrediction(null);
  };

  const submitPrediction = async (payload) => {
    setPrediction(null);
    const result = await predictFraud(payload);
    const transaction = {
      id: `TXN-${Math.floor(100000 + Math.random() * 899999)}`,
      amount: Number(payload.amount),
      merchant: payload.merchant,
      location: payload.location,
      time: payload.time,
      status: result.status,
      probability: result.probability
    };
    setTransactions((items) => [transaction, ...items]);
    if (result.status === "Fraud") {
      const emailStatus = await sendFraudEmail({ user, transaction, result });
      pushFraudAlert({
        id: makeId("ALERT"),
        merchant: payload.merchant,
        amount: Number(payload.amount),
        time: "Just now",
        severity: "high",
        message: `Fraud alert emailed to ${emailStatus.to}`,
        emailStatus
      });
    }
    setPrediction(result);
    return result;
  };

  const addDatasetTransactions = (items) => {
    setTransactions((current) => [...items, ...current]);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      signup,
      logout,
      theme,
      setTheme,
      transactions,
      loadingTransactions,
      notifications,
      toastAlerts,
      prediction,
      setPrediction,
      submitPrediction,
      addDatasetTransactions,
      loadTransactions
    }),
    [user, theme, transactions, loadingTransactions, notifications, toastAlerts, prediction]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
