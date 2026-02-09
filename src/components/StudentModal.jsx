import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScheduleGrid from "./ScheduleGrid";

const TOTAL_BLOCKS = 8;

export default function StudentModal({ student, onClose }) {
  // Lock body scroll when open
  useEffect(() => {
    if (student) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [student]);

  // Escape to close
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (student) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [student, onClose]);

  const known = student ? Object.keys(student.blocks || {}).length : 0;
  const pct = Math.round((known / TOTAL_BLOCKS) * 100);

  return (
    <AnimatePresence>
      {student && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center"
        >
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose();
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-[500px] max-h-[85vh] overflow-y-auto
                       rounded-t-2xl sm:rounded-2xl sm:mb-6
                       px-5 pt-3 pb-8 relative"
          >
            {/* Drag handle */}
            <div className="flex justify-center mb-3">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center
                         text-gray-400 hover:text-gray-600 text-2xl transition-colors"
            >
              &times;
            </button>

            {/* Name */}
            <h2 className="text-xl font-bold text-gray-800 pr-10 mb-3">
              {student.name}
            </h2>

            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-teal-500 rounded-full"
                />
              </div>
              <span className="text-sm font-semibold text-gray-400 whitespace-nowrap">
                {known}/{TOTAL_BLOCKS} blocks
              </span>
            </div>

            {/* Schedule grid */}
            <ScheduleGrid blocks={student.blocks} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
