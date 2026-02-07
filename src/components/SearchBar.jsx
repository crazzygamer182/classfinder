export default function SearchBar({ value, onChange }) {
  return (
    <div className="sticky top-0 z-10 bg-gray-100 px-4 py-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search students..."
        autoComplete="off"
        className="w-full px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-xl
                   outline-none transition-colors duration-200
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                   placeholder:text-gray-400"
      />
    </div>
  );
}
