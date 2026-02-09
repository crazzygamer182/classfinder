import { motion } from "framer-motion";

export default function BlockCard({ blockNum, block, index, onSuggestEdit }) {
  const isFree = block?.class === "Free";

  if (block && isFree) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 24 }}
        className="bg-teal-50 border-2 border-teal-200 rounded-xl p-3.5 min-h-[80px]
                   flex flex-col justify-center items-center text-center"
      >
        <div className="text-[0.7rem] font-bold uppercase tracking-wider text-teal-600 mb-1">
          Block {blockNum}
        </div>
        <div className="text-lg mb-0.5 text-teal-400">~</div>
        <div className="text-xs text-teal-600 font-medium">Free</div>
        {onSuggestEdit && (
          <button
            onClick={() => onSuggestEdit(blockNum)}
            className="text-[0.6rem] text-teal-400 hover:text-teal-600 mt-1.5 transition-colors"
          >
            Edit
          </button>
        )}
      </motion.div>
    );
  }

  if (block) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 24 }}
        className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-3.5 min-h-[80px]
                   flex flex-col justify-center"
      >
        <div className="text-[0.7rem] font-bold uppercase tracking-wider text-emerald-600 mb-1">
          Block {blockNum}
        </div>
        <div className="text-[0.95rem] font-semibold text-gray-800">
          {block.class}
        </div>
        {block.teacher && (
          <div className="text-xs text-gray-500 mt-0.5">{block.teacher}</div>
        )}
        {block.room && (
          <div className="text-[0.65rem] text-gray-400 mt-0.5">Room {block.room}</div>
        )}
        {onSuggestEdit && (
          <button
            onClick={() => onSuggestEdit(blockNum)}
            className="text-[0.6rem] text-emerald-400 hover:text-emerald-600 mt-1.5 transition-colors self-start"
          >
            Suggest Edit
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 24 }}
      className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-3.5 min-h-[80px]
                 flex flex-col justify-center items-center text-center text-gray-400"
    >
      <div className="text-[0.7rem] font-bold uppercase tracking-wider mb-1">
        Block {blockNum}
      </div>
      <div className="text-2xl mb-0.5">?</div>
      <div className="text-xs">Unknown</div>
      {onSuggestEdit && (
        <button
          onClick={() => onSuggestEdit(blockNum)}
          className="text-[0.65rem] text-teal-500 hover:text-teal-700 font-medium mt-1.5 transition-colors"
        >
          Know this? Add it!
        </button>
      )}
    </motion.div>
  );
}
