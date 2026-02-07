import { useState, useEffect, useMemo } from "react";

const TOTAL_BLOCKS = 8;

export default function useStudentData() {
  const [data, setData] = useState({ students: {}, classes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData({ students: {}, classes: [] }))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const keys = Object.keys(data.students);
    const count = keys.length;
    if (count === 0) return { count: 0, avgKnown: 0 };

    let totalKnown = 0;
    for (const key of keys) {
      const blocks = data.students[key].blocks || {};
      totalKnown += Object.values(blocks).filter((b) => b.class !== "Free").length;
    }
    return { count, avgKnown: +(totalKnown / count).toFixed(1) };
  }, [data]);

  const sortedStudents = useMemo(() => {
    const keys = Object.keys(data.students);
    keys.sort((a, b) =>
      data.students[a].name.localeCompare(data.students[b].name)
    );
    return keys.map((key) => ({
      key,
      ...data.students[key],
      known: Object.values(data.students[key].blocks || {}).filter((b) => b.class !== "Free").length,
    }));
  }, [data]);

  return { students: sortedStudents, stats, loading, totalBlocks: TOTAL_BLOCKS };
}
