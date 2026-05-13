import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", delay = 0 }) {
  return (
    <motion.section
      className={`glass rounded-2xl p-5 shadow-2xl shadow-slate-950/20 ${className}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
    >
      {children}
    </motion.section>
  );
}
