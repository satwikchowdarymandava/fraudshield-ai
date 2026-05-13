import { AnimatePresence, motion } from "framer-motion";
import { MailCheck, ShieldAlert, X } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { formatCurrency } from "../utils/format.js";

export default function FraudToasts() {
  const { toastAlerts } = useApp();

  return (
    <div className="pointer-events-none fixed right-4 top-24 z-50 flex w-[min(92vw,380px)] flex-col gap-3">
      <AnimatePresence>
        {toastAlerts.map((alert) => (
          <motion.article
            key={alert.id}
            className="pointer-events-auto overflow-hidden rounded-2xl border border-red-300/30 bg-slate-950/90 p-4 shadow-danger backdrop-blur-2xl"
            initial={{ opacity: 0, x: 80, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-red-400 text-red-950">
                <ShieldAlert size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-extrabold text-red-100">Fraud alert</p>
                  <X size={16} className="text-slate-500" />
                </div>
                <p className="mt-1 truncate text-sm font-semibold text-white">{alert.merchant}</p>
                <p className="mt-1 text-xs text-slate-300">
                  {formatCurrency(alert.amount)} • {alert.time}
                </p>
                {alert.message && (
                  <p className="mt-3 flex items-center gap-2 rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-100">
                    <MailCheck size={15} />
                    {alert.message}
                  </p>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </div>
  );
}
