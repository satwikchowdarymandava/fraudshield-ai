import { motion } from "framer-motion";

const cells = Array.from({ length: 35 }, (_, index) => ({
  id: index,
  value: (index * 17 + 23) % 100
}));

export default function Heatmap() {
  return (
    <div className="grid grid-cols-7 gap-2">
      {cells.map((cell) => (
        <motion.div
          key={cell.id}
          className="aspect-square rounded-lg border border-white/10"
          style={{ backgroundColor: `rgba(45, 212, 191, ${0.12 + cell.value / 130})` }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: cell.id * 0.01 }}
          title={`${cell.value}% regional risk`}
        />
      ))}
    </div>
  );
}
