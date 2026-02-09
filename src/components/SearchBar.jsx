export default function SearchBar({ value, onChange }) {
  return (
    <div className="shrink-0 bg-gray-100 px-4 py-2.5">
      <div className="relative">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search students..."
          autoComplete="off"
          className="w-full pl-10 pr-4 py-2.5 text-[0.95rem] bg-white border border-gray-200 rounded-xl
                     outline-none transition-all duration-200 shadow-sm
                     focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:shadow-md
                     placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}
