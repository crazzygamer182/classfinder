import BlockCard from "./BlockCard";

const TOTAL_BLOCKS = 8;

export default function ScheduleGrid({ blocks }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      {Array.from({ length: TOTAL_BLOCKS }, (_, i) => {
        const num = i + 1;
        const block = blocks?.[String(num)] || null;
        return <BlockCard key={num} blockNum={num} block={block} index={i} />;
      })}
    </div>
  );
}
