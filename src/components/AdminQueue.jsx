import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../supabaseClient";

export default function AdminQueue({ students, adminPassword, onBadPassword, refetch }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(null); // id being acted on

  const fetchSuggestions = async () => {
    const { data } = await supabase
      .from("suggested_edits")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true });
    setSuggestions(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const studentName = (key) => {
    const s = students.find((st) => st.key === key);
    return s ? s.name : key;
  };

  const currentBlock = (studentKey, blockNum) => {
    const s = students.find((st) => st.key === studentKey);
    return s?.blocks?.[String(blockNum)] || null;
  };

  const handleAction = async (id, action) => {
    setActing(id);
    const { data } = await supabase.rpc("review_suggestion", {
      suggestion_id: id,
      action,
      admin_password: adminPassword,
    });

    if (data && !data.success && data.error === "Invalid password.") {
      onBadPassword();
      setActing(null);
      return;
    }

    // Remove from list with animation
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
    setActing(null);

    if (action === "approve") {
      refetch();
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading suggestions...</p>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No pending suggestions.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <p className="text-xs text-gray-400 font-medium mb-2">
        {suggestions.length} pending suggestion{suggestions.length !== 1 ? "s" : ""}
      </p>
      <AnimatePresence>
        {suggestions.map((sug) => {
          const cur = currentBlock(sug.student_key, sug.block_number);
          return (
            <motion.div
              key={sug.id}
              layout
              initial={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {studentName(sug.student_key)}
                  </p>
                  <p className="text-xs text-gray-400">
                    Block {sug.block_number}
                    {sug.submitter_name && ` \u00B7 by ${sug.submitter_name}`}
                  </p>
                </div>
                <p className="text-[0.65rem] text-gray-300">
                  {new Date(sug.created_at).toLocaleDateString()}
                </p>
              </div>

              {/* Current vs proposed */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-gray-400 font-medium mb-0.5">Current</p>
                  {cur ? (
                    <>
                      <p className="text-gray-700">{cur.class}</p>
                      {cur.teacher && <p className="text-gray-400">{cur.teacher}</p>}
                      {cur.room && <p className="text-gray-400">Room {cur.room}</p>}
                    </>
                  ) : (
                    <p className="text-gray-300 italic">Unknown</p>
                  )}
                </div>
                <div className="bg-teal-50 rounded-lg p-2">
                  <p className="text-teal-600 font-medium mb-0.5">Proposed</p>
                  <p className="text-gray-700">{sug.suggested_class}</p>
                  {sug.suggested_teacher && (
                    <p className="text-gray-400">{sug.suggested_teacher}</p>
                  )}
                  {sug.suggested_room && (
                    <p className="text-gray-400">Room {sug.suggested_room}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction(sug.id, "approve")}
                  disabled={acting === sug.id}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs
                             font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(sug.id, "reject")}
                  disabled={acting === sug.id}
                  className="flex-1 bg-red-400 hover:bg-red-500 text-white text-xs
                             font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
