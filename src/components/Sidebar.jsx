import { BarChart3, DatabaseZap, History, LogOut, ScanLine, Settings, ShieldCheck, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

const links = [
  { to: "/", label: "Dashboard", icon: BarChart3 },
  { to: "/scan", label: "Scan Transaction", icon: ScanLine },
  { to: "/datasets", label: "Datasets", icon: DatabaseZap },
  { to: "/history", label: "History", icon: History },
  { to: "/settings", label: "Settings", icon: Settings }
];

export default function Sidebar({ open, setOpen }) {
  const { logout } = useApp();

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm transition md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-72 flex-col border-r border-white/10 bg-slate-950/85 p-5 backdrop-blur-2xl transition-transform md:sticky md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-400 text-slate-950 shadow-glow">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-lg font-extrabold">FraudShield AI</p>
              <p className="text-xs text-teal-200/80">Risk command center</p>
            </div>
          </div>
          <button className="rounded-lg p-2 text-slate-300 md:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive ? "bg-teal-400 text-slate-950 shadow-glow" : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-red-500/15 hover:text-red-200" onClick={logout}>
          <LogOut size={19} />
          Logout
        </button>
      </aside>
    </>
  );
}
