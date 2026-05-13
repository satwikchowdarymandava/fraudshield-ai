import { Activity, CreditCard, ShieldAlert, ShieldCheck } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import GlassCard from "../components/GlassCard.jsx";
import Heatmap from "../components/Heatmap.jsx";
import NotificationsPanel from "../components/NotificationsPanel.jsx";
import PageTransition from "../components/PageTransition.jsx";
import StatCard from "../components/StatCard.jsx";
import TransactionTable from "../components/TransactionTable.jsx";
import { useApp } from "../context/AppContext.jsx";
import { getMetrics } from "../utils/format.js";
import { trendData } from "../utils/mockData.js";

export default function Dashboard() {
  const { transactions } = useApp();
  const metrics = getMetrics(transactions);
  const pieData = [
    { name: "Fraud", value: metrics.fraud },
    { name: "Safe", value: metrics.safe }
  ];

  return (
    <PageTransition className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-teal-200">FraudShield AI</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Transaction risk dashboard</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Transactions" value={metrics.total} icon={CreditCard} tone="blue" caption="Live ledger sample" />
        <StatCard title="Fraudulent Transactions" value={metrics.fraud} icon={ShieldAlert} tone="red" caption="Flagged by model" />
        <StatCard title="Safe Transactions" value={metrics.safe} icon={ShieldCheck} tone="green" caption="Cleared payments" />
        <StatCard title="Fraud Rate" value={`${metrics.rate}%`} icon={Activity} tone="teal" caption="Current detection ratio" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <GlassCard>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Fraud vs Normal</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={70} outerRadius={105} paddingAngle={6} dataKey="value">
                  <Cell fill="#f87171" />
                  <Cell fill="#34d399" />
                </Pie>
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard>
          <h2 className="mb-5 text-xl font-bold text-white">Regional Risk Heatmap</h2>
          <Heatmap />
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_.9fr]">
        <GlassCard>
          <h2 className="mb-5 text-xl font-bold text-white">Weekly Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="Fraud" stroke="#f87171" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="Safe" stroke="#34d399" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-5 text-xl font-bold text-white">Notifications</h2>
          <NotificationsPanel />
        </GlassCard>
      </div>

      <div className="grid gap-6">
        <GlassCard>
          <h2 className="mb-5 text-xl font-bold text-white">Recent Transactions</h2>
          <TransactionTable transactions={(Array.isArray(transactions) ? transactions : []).slice(0, 8)} />
        </GlassCard>
      </div>

      <GlassCard>
        <h2 className="mb-5 text-xl font-bold text-white">Hourly Risk Volume</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12 }} />
              <Bar dataKey="Fraud" fill="#f87171" radius={[10, 10, 0, 0]} />
              <Bar dataKey="Safe" fill="#2dd4bf" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </PageTransition>
  );
}
