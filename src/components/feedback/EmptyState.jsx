import { Sparkles } from 'lucide-react';

const EmptyState = ({ title, subtitle }) => {
  return (
    <div className="rounded-2xl border border-dashed border-adaptive bg-adaptive px-6 py-10 text-center">
      <Sparkles className="mx-auto h-10 w-10 text-cyan-500" />
      <h3 className="mt-3 text-lg font-semibold text-adaptive">{title}</h3>
      <p className="mt-1 text-sm text-muted">{subtitle}</p>
    </div>
  );
};

export default EmptyState;
