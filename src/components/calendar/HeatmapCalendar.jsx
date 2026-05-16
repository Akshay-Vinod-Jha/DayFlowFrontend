import { motion } from 'framer-motion';
import { getMonthDaysGrid } from '../../utils/date';

const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const intensityClass = (count, maxCount) => {
  // No tasks = neutral
  if (!count || !maxCount) {
    return 'bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-700/30 dark:border-slate-700 dark:text-slate-400';
  }

  const ratio = count / maxCount;
  
  // 0-20%: very light green
  if (ratio < 0.2) {
    return 'bg-green-100 border-green-200 text-green-700 dark:bg-green-950/40 dark:border-green-700 dark:text-green-300';
  }
  // 20-40%: light green
  if (ratio < 0.4) {
    return 'bg-green-200 border-green-300 text-green-700 dark:bg-green-900/50 dark:border-green-600 dark:text-green-200';
  }
  // 40-60%: medium green
  if (ratio < 0.6) {
    return 'bg-green-300 border-green-400 text-green-800 dark:bg-green-800/60 dark:border-green-600 dark:text-green-100';
  }
  // 60-80%: strong green
  if (ratio < 0.8) {
    return 'bg-green-400 border-green-500 text-white dark:bg-green-700 dark:border-green-600 dark:text-white';
  }
  // 80%+: vibrant dark green
  return 'bg-green-600 border-green-700 text-white dark:bg-green-600 dark:border-green-700 dark:text-white';
};

const HeatmapCalendar = ({ monthKey, heatmap, selectedDate, onDateSelect }) => {
  const gridDays = getMonthDaysGrid(monthKey);
  const heatmapMap = new Map(heatmap.days.map((entry) => [entry.date, entry.completedCount]));

  return (
    <div className="rounded-2xl border p-4 shadow-sm panel-adaptive">
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-muted">
        {dayLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2">
        {gridDays.map((date, index) => {
          if (!date) {
            return <div key={`blank-${index}`} className="h-10 rounded-lg bg-transparent" />;
          }

          const count = heatmapMap.get(date) || 0;
          const isSelected = date === selectedDate;

          return (
            <motion.button
              key={date}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onDateSelect(date)}
              className={`h-10 rounded-lg border text-xs font-medium transition ${intensityClass(count, heatmap.maxCount)} ${
                isSelected ? 'ring-2 ring-cyan-500 ring-offset-2' : 'hover:ring-1 hover:ring-cyan-300'
              }`}
              title={`${date}: ${count} completed`}
            >
              {Number(date.slice(-2))}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default HeatmapCalendar;
