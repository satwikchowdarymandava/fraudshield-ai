import { motion } from "framer-motion";

export default function StatCard({ title, value, icon: Icon, tone = "teal", caption }) {
  const tones = {
    teal: "from-teal-400/25 to-cyan-400/10 text-teal-200",
    red: "from-red-400/25 to-rose-400/10 text-red-200",
    green: "from-emerald-400/25 to-teal-400/10 text-emerald-200",
    blue: "from-blue-400/25 to-indigo-400/10 text-blue-200"
  };

  return (
    <motion.div
      className="glass rounded-2xl p-5 shadow-2xl shadow-slate-950/20"
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-white">{value}</p>
          <p className="mt-2 text-xs text-slate-400">{caption}</p>
        </div>
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${tones[tone]}`}>
          <Icon size={23} />
        </div>
      </div>
    </motion.div>
  );
}
