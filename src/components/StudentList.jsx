import StudentCard from "./StudentCard";
import EmptyState from "./EmptyState";

export default function StudentList({ students, query, onSelect }) {
  const q = query.toLowerCase().trim();

  const filtered = students.filter((s) => {
    if (!q) return true;
    return s.key.includes(q) || s.name.toLowerCase().includes(q);
  });

  if (students.length === 0) {
    return <EmptyState message="No students yet. Add data to get started." />;
  }

  if (filtered.length === 0) {
    return <EmptyState message="No students match your search." />;
  }

  return (
    <main className="px-4 pb-6 flex flex-col gap-2.5 sm:max-w-[600px] sm:mx-auto sm:px-6">
      {filtered.map((student, i) => (
        <StudentCard
          key={student.key}
          student={student}
          index={i}
          onSelect={onSelect}
        />
      ))}
    </main>
  );
}
