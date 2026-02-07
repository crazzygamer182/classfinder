export default function Header({ count, avgKnown }) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 pt-6 pb-4 text-center">
      <h1 className="text-2xl font-bold tracking-tight">ClassFinder</h1>
      <p className="text-sm text-white/80 mt-1">
        {count} student{count !== 1 ? "s" : ""}
        <span className="mx-1.5">&middot;</span>
        {avgKnown}/8 avg blocks known
      </p>
    </header>
  );
}
