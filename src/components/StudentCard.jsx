import { motion } from "framer-motion";

function badgeClasses(known) {
  if (known === 8) return "bg-green-100 text-green-600";
  if (known >= 4) return "bg-amber-100 text-amber-600";
  return "bg-red-100 text-red-600";
}

export default function StudentCard({ student, index, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(student)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(student);
        }
      }}
      className="bg-white rounded-xl shadow-sm px-4 py-3.5 flex items-center justify-between
                 cursor-pointer min-h-[44px] active:shadow-md transition-shadow"
    >
      <span className="font-semibold text-gray-800">{student.name}</span>
      <span
        className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${badgeClasses(student.known)}`}
      >
        {student.known}/8 blocks
      </span>
    </motion.div>
  );
}
