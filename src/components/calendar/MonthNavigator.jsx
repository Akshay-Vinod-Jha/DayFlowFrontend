import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMonthName, shiftMonth } from '../../utils/date';

const MonthNavigator = ({ monthKey, onMonthChange }) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border p-4 shadow-sm panel-adaptive">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-adaptive text-muted transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-600 theme-transition"
        onClick={() => onMonthChange(shiftMonth(monthKey, -1))}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">{getMonthName(monthKey)}</p>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-adaptive text-muted transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-600 theme-transition"
        onClick={() => onMonthChange(shiftMonth(monthKey, 1))}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default MonthNavigator;
