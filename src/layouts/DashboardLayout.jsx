import { LogOut } from 'lucide-react';
import { APP_NAME } from '../constants/appConfig';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from '../components/common/ThemeToggle';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-adaptive theme-transition">
      <header className="sticky top-0 z-20 border-b border-adaptive bg-adaptive backdrop-blur-xl theme-transition">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">{APP_NAME}</p>
            <p className="text-sm text-slate-500">Daily focus tracker</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden rounded-xl bg-adaptive px-3 py-1.5 text-sm font-medium text-muted sm:block">
              {user?.name}
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl border border-adaptive bg-adaptive px-3 py-2 text-sm font-medium text-muted theme-transition hover:border-rose-200 hover:text-rose-700"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
