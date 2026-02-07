import { motion } from "framer-motion";

export default function BlockCard({ blockNum, block, index }) {
  if (block) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 24 }}
        className="bg-green-50 border-2 border-green-200 rounded-xl p-3.5 min-h-[80px]
                   flex flex-col justify-center"
      >
        <div className="text-[0.7rem] font-bold uppercase tracking-wider text-green-600 mb-1">
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
    </motion.div>
  );
}
