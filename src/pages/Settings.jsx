import { Bell, Moon, Sun, UserRound } from "lucide-react";
import GlassCard from "../components/GlassCard.jsx";
import PageTransition from "../components/PageTransition.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function Settings() {
  const { theme, setTheme, user } = useApp();
  const dark = theme === "dark";

  return (
    <PageTransition className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-teal-200">Settings</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Workspace preferences</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-400 text-slate-950">
              <UserRound size={26} />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-white">{user?.name}</h2>
              <p className="truncate text-sm text-slate-400">{user?.email}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <input className="field" value={user?.name || ""} readOnly />
                <input className="field" value="Fraud Analyst" readOnly />
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Appearance</h2>
              <p className="mt-1 text-sm text-slate-400">Switch dashboard theme</p>
            </div>
            <button
              className={`relative h-12 w-24 rounded-full border border-white/10 p-1 transition ${dark ? "bg-slate-950" : "bg-cyan-100"}`}
              onClick={() => setTheme(dark ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <span className={`grid h-10 w-10 place-items-center rounded-full transition ${dark ? "translate-x-12 bg-teal-400 text-slate-950" : "translate-x-0 bg-white text-amber-500"}`}>
                {dark ? <Moon size={18} /> : <Sun size={18} />}
              </span>
            </button>
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-red-400/15 text-red-200">
              <Bell size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Alert Rules</h2>
              <p className="text-sm text-slate-400">Notification thresholds for suspicious activity</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {["High-value international payments", "Multiple failed card attempts", "Unusual merchant category"].map((label) => (
              <label key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.08] p-4">
                <span className="text-sm font-semibold text-slate-200">{label}</span>
                <input type="checkbox" defaultChecked className="h-5 w-5 accent-teal-400" />
              </label>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
