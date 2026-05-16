import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isSubmitting } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      await login(values);
      navigate('/');
    } catch (_error) {
      // Error toast handled by context.
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your productivity streak."
      footer={
        <>
          New to DayFlow?{' '}
          <Link className="font-semibold text-cyan-700 hover:text-cyan-800" to="/register">
            Create account
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-1 block text-sm font-medium text-muted">Email</label>
          <input
            type="email"
            className="w-full rounded-xl border-adaptive input-adaptive text-sm outline-none ring-cyan-500 theme-transition focus:ring-2"
            {...register('email', { required: 'Email is required.' })}
          />
          {errors.email ? <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-muted">Password</label>
          <input
            type="password"
            className="w-full rounded-xl border-adaptive input-adaptive text-sm outline-none ring-cyan-500 theme-transition focus:ring-2"
            {...register('password', { required: 'Password is required.' })}
          />
          {errors.password ? <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p> : null}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full btn-primary theme-transition text-sm font-semibold disabled:opacity-60">
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
