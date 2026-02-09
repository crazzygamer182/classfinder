export default function Header({ count, avgKnown }) {
  return (
    <header
      className="shrink-0 text-white px-4 pb-3 text-center relative"
      style={{
        background: "linear-gradient(135deg, #4ECDC4 0%, #3BA8A0 100%)",
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 0.75rem)",
      }}
    >
      <a
        href="#admin"
        className="absolute right-3 top-3 text-[0.7rem] text-white/50 hover:text-white/80 transition-colors"
      >
        Admin
      </a>
      <div className="flex items-center justify-center gap-2">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-90"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <h1
          className="text-[1.4rem] font-extrabold tracking-tight"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Class<span className="font-semibold opacity-90">Finder</span>
        </h1>
      </div>
      <p className="text-[0.8rem] text-white/70 mt-0.5 font-medium tracking-wide">
        {count} student{count !== 1 ? "s" : ""}
        <span className="mx-1.5 opacity-50">&middot;</span>
        {avgKnown}/8 avg blocks known
      </p>
    </header>
  );
}
