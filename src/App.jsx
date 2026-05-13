import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { useApp } from "./context/AppContext.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Datasets = lazy(() => import("./pages/Datasets.jsx"));
const History = lazy(() => import("./pages/History.jsx"));
const Scan = lazy(() => import("./pages/Scan.jsx"));
const Settings = lazy(() => import("./pages/Settings.jsx"));

function ProtectedRoute({ children }) {
  const { user } = useApp();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-cyber text-white">
          <LoadingSpinner label="Loading FraudShield AI" />
        </main>
      }
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="scan" element={<Scan />} />
          <Route path="datasets" element={<Datasets />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
