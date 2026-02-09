export default function Header({ count, avgKnown }) {
  return (
    <header
      className="text-white px-4 pb-4 text-center"
      style={{
        background: "linear-gradient(135deg, #4ECDC4 0%, #3BA8A0 100%)",
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 1.5rem)",
      }}
    >
      <h1 className="text-2xl font-bold tracking-tight">ClassFinder</h1>
      <p className="text-sm text-white/80 mt-1">
        {count} student{count !== 1 ? "s" : ""}
        <span className="mx-1.5">&middot;</span>
        {avgKnown}/8 avg blocks known
      </p>
    </header>
  );
}
