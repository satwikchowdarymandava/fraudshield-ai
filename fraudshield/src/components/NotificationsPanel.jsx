import { motion } from "framer-motion";
import { BellRing } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { formatCurrency } from "../utils/format.js";

export default function NotificationsPanel() {
  const { notifications } = useApp();

  return (
    <div className="space-y-3">
      {notifications.map((item, index) => (
        <motion.div
          key={item.id}
          className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.04 }}
        >
          <div className="flex gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-400/20 text-red-200">
              <BellRing size={18} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">{item.merchant}</p>
              <p className="text-xs text-red-100/80">
                {formatCurrency(item.amount)} flagged • {item.time}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
