import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function ResultAlert() {
  const { prediction } = useApp();

  if (!prediction) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 p-6 text-center text-sm text-slate-400">
        Awaiting transaction scan
      </div>
    );
  }

  const fraud = prediction.status === "Fraud";
  const Icon = fraud ? ShieldAlert : CheckCircle2;

  return (
    <motion.div
      className={`overflow-hidden rounded-2xl border p-6 ${
        fraud ? "border-red-400/40 bg-red-500/12 shadow-danger" : "border-emerald-400/40 bg-emerald-500/12 shadow-glow"
      }`}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <div className="flex items-center gap-4">
        <motion.div
          className={`grid h-14 w-14 place-items-center rounded-2xl ${fraud ? "bg-red-400 text-red-950" : "bg-emerald-400 text-emerald-950"}`}
          animate={{ rotate: [0, -4, 4, 0] }}
          transition={{ duration: 0.7 }}
        >
          <Icon size={28} />
        </motion.div>
        <div>
          <p className="text-sm text-slate-300">Detection Result</p>
          <h3 className={`text-3xl font-extrabold ${fraud ? "text-red-200" : "text-emerald-200"}`}>{prediction.status}</h3>
        </div>
      </div>
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-300">Probability score</span>
          <span className="font-bold text-white">{Math.round(prediction.probability * 100)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-950/70">
          <motion.div
            className={`h-full ${fraud ? "bg-red-400" : "bg-emerald-400"}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.round(prediction.probability * 100)}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-300">{prediction.message}</p>
    </motion.div>
  );
}
