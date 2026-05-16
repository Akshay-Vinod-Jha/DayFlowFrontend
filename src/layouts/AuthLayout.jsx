import { motion } from 'framer-motion';
import { APP_NAME } from '../constants/appConfig';
import ThemeToggle from '../components/common/ThemeToggle';

const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <main className="min-h-screen bg-adaptive px-4 py-10 sm:px-6 theme-transition">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto w-full max-w-md"
      >
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">{APP_NAME}</p>
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        <section className="mt-4 rounded-3xl border p-6 shadow-[0_30px_60px_-40px_rgba(14,116,144,0.6)] backdrop-blur-xl sm:p-8 panel-adaptive">
          <h1 className="text-3xl font-semibold tracking-tight text-adaptive">{title}</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
          <div className="mt-6">{children}</div>
          {footer ? <div className="mt-5 text-sm text-muted">{footer}</div> : null}
        </section>
      </motion.div>
    </main>
  );
};

export default AuthLayout;
