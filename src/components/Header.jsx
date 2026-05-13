import { Bell, Menu, Search, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext.jsx";

export default function Header({ setSidebarOpen }) {
  const { user, notifications } = useApp();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/60 px-4 py-4 backdrop-blur-2xl sm:px-6">
      <div className="flex items-center gap-4">
        <button className="rounded-xl border border-white/10 p-3 text-slate-100 md:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <div className="hidden flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 lg:flex">
          <Search size={18} className="text-slate-400" />
          <input className="w-full bg-transparent text-sm text-white placeholder:text-slate-500" placeholder="Search transactions, merchants, alerts" />
        </div>
        <motion.div
          className="ml-auto hidden items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-100 sm:flex"
          animate={{ boxShadow: ["0 0 0 rgba(248,113,113,0)", "0 0 22px rgba(248,113,113,.24)", "0 0 0 rgba(248,113,113,0)"] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <ShieldAlert size={16} />
          {notifications.length} live alerts
        </motion.div>
        <button className="relative rounded-xl border border-white/10 bg-white/[0.08] p-3 text-slate-100" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-400" />
        </button>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">{user?.name || "Analyst"}</p>
          <p className="truncate text-xs text-slate-400">{user?.email}</p>
        </div>
      </div>
    </header>
  );
}
