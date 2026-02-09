import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function SuggestEditForm({ studentKey, studentName, blockNumber, existingBlock, onClose }) {
  const [className, setClassName] = useState(existingBlock?.class || "");
  const [teacher, setTeacher] = useState(existingBlock?.teacher || "");
  const [room, setRoom] = useState(existingBlock?.room || "");
  const [submitter, setSubmitter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!className.trim()) {
      setError("Class name is required.");
      return;
    }
    setSubmitting(true);
    setError("");

    const { error: insertError } = await supabase.from("suggested_edits").insert({
      student_key: studentKey,
      block_number: blockNumber,
      suggested_class: className.trim(),
      suggested_teacher: teacher.trim() || null,
      suggested_room: room.trim() || null,
      submitter_name: submitter.trim() || null,
    });

    setSubmitting(false);
    if (insertError) {
      setError("Failed to submit. Please try again.");
    } else {
      setSuccess(true);
      setTimeout(onClose, 1500);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-3xl mb-2">&#10003;</div>
        <p className="text-gray-700 font-medium">Suggestion submitted!</p>
        <p className="text-gray-400 text-sm mt-1">It will be reviewed by an admin.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-gray-700">
          {existingBlock ? "Suggest Correction" : "Add Info"} &mdash; Block {blockNumber}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>

      {existingBlock && (
        <div className="text-xs text-gray-400 bg-gray-50 rounded-lg p-2 mb-1">
          Current: {existingBlock.class}
          {existingBlock.teacher && ` / ${existingBlock.teacher}`}
          {existingBlock.room && ` / Room ${existingBlock.room}`}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Class <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="e.g. AP Chemistry"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          autoFocus
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Teacher</label>
        <input
          type="text"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          placeholder="e.g. Mr. Smith"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Room</label>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="e.g. 204"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Your name (optional)</label>
        <input
          type="text"
          value={submitter}
          onChange={(e) => setSubmitter(e.target.value)}
          placeholder="e.g. Jane"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
        />
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold
                   py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Suggestion"}
      </button>
    </form>
  );
}
