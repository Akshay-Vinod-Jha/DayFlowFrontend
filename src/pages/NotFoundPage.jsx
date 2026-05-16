import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-adaptive px-4 text-center theme-transition">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">404</p>
<h1 className="mt-2 text-4xl font-semibold text-adaptive">Page not found</h1>
        <p className="mt-2 text-muted">The page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-flex rounded-xl btn-primary text-sm font-semibold">
          Back to dashboard
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
