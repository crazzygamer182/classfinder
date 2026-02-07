import { useState, useCallback } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import StudentList from "./components/StudentList";
import StudentModal from "./components/StudentModal";
import useStudentData from "./hooks/useStudentData";

export default function App() {
  const { students, stats, loading } = useStudentData();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const handleClose = useCallback(() => setSelected(null), []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header count={stats.count} avgKnown={stats.avgKnown} />
      <SearchBar value={query} onChange={setQuery} />
      <StudentList students={students} query={query} onSelect={setSelected} />
      <StudentModal student={selected} onClose={handleClose} />
    </div>
  );
}
