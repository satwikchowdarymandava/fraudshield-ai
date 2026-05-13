import axios from "axios";
import { mockTransactions } from "../utils/mockData.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 1400
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchTransactions() {
  try {
    const { data } = await api.get("/transactions");
    const transactions = Array.isArray(data) ? data : data?.transactions;
    return Array.isArray(transactions) ? transactions : mockTransactions;
  } catch {
    await wait(500);
    return mockTransactions;
  }
}

export async function predictFraud(payload) {
  try {
    const { data } = await api.post("/predict", payload);
    return normalizePrediction(data);
  } catch {
    await wait(900);
    const amount = Number(payload.amount);
    const riskScore =
      Math.min(0.96, 0.12 + amount / 7500 + (payload.location.length % 5) / 12 + (payload.merchant.length % 4) / 18);
    return {
      status: riskScore > 0.58 ? "Fraud" : "Safe",
      probability: Number(riskScore.toFixed(2)),
      message: riskScore > 0.58 ? "High-risk pattern detected" : "Transaction pattern looks normal"
    };
  }
}

export async function sendFraudEmail({ user, transaction, result }) {
  const emailPayload = {
    to: user?.email,
    subject: "FraudShield AI fraud alert",
    transactionId: transaction.id,
    merchant: transaction.merchant,
    amount: transaction.amount,
    location: transaction.location,
    time: transaction.time,
    probability: result.probability,
    status: result.status
  };

  try {
    await api.post("/notify-email", emailPayload);
    return { sent: true, mode: "api", to: user?.email };
  } catch {
    await wait(350);
    return { sent: true, mode: "demo", to: user?.email };
  }
}

export async function sendFraudDigestEmail({ user, transactions }) {
  const fraudTransactions = transactions.filter((item) => item.status === "Fraud");
  if (!user?.email || !fraudTransactions.length) {
    return { sent: false, reason: "No fraud transactions to email." };
  }

  const emailPayload = {
    to: user.email,
    subject: "FraudShield AI 10-minute fraud digest",
    count: fraudTransactions.length,
    transactions: fraudTransactions.map((item) => ({
      transactionId: item.id,
      merchant: item.merchant,
      amount: item.amount,
      location: item.location,
      time: item.time,
      probability: item.probability,
      status: item.status
    }))
  };

  try {
    await api.post("/notify-email", emailPayload);
    return { sent: true, mode: "api", to: user.email, count: fraudTransactions.length };
  } catch {
    await wait(350);
    return { sent: true, mode: "demo", to: user.email, count: fraudTransactions.length };
  }
}

function normalizePrediction(data) {
  const probability = Number(data.probability ?? data.score ?? 0);
  const status = data.status || data.prediction || (probability > 0.5 ? "Fraud" : "Safe");
  return {
    status: status.toLowerCase().includes("fraud") ? "Fraud" : "Safe",
    probability,
    message: data.message || "Prediction complete"
  };
}
