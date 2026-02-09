import { useState, useEffect, useMemo } from "react";
import { supabase } from "../supabaseClient";

const TOTAL_BLOCKS = 8;

export default function useStudentData() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const refetch = () => setRefreshKey((k) => k + 1);

  useEffect(() => {
    supabase
      .from("students")
      .select("key, name, blocks")
      .then(({ data, error }) => {
        if (error || !data) {
          setStudents([]);
        } else {
          setStudents(data);
        }
        setLoading(false);
      });
  }, [refreshKey]);

  const stats = useMemo(() => {
    const count = students.length;
    if (count === 0) return { count: 0, avgKnown: 0 };

    let totalKnown = 0;
    for (const s of students) {
      totalKnown += Object.keys(s.blocks || {}).length;
    }
    return { count, avgKnown: +(totalKnown / count).toFixed(1) };
  }, [students]);

  const sortedStudents = useMemo(() => {
    return [...students]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((s) => ({
        key: s.key,
        name: s.name,
        blocks: s.blocks || {},
        known: Object.keys(s.blocks || {}).length,
      }));
  }, [students]);

  return { students: sortedStudents, stats, loading, totalBlocks: TOTAL_BLOCKS, refetch };
}
