import { AlertTriangle } from 'lucide-react';

const ErrorState = ({ title, subtitle }) => {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 shrink-0" />
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
