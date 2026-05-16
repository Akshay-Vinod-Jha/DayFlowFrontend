import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerAccount, isSubmitting } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      await registerAccount(values);
      navigate('/');
    } catch (_error) {
      // Error toast handled by context.
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start tracking your daily output with clarity."
      footer={
        <>
          Already have an account?{' '}
          <Link className="font-semibold text-cyan-700 hover:text-cyan-800" to="/login">
            Login here
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-1 block text-sm font-medium text-muted">Name</label>
          <input
            type="text"
            className="w-full rounded-xl border-adaptive input-adaptive text-sm outline-none ring-cyan-500 theme-transition focus:ring-2"
            {...register('name', { required: 'Name is required.' })}
          />
          {errors.name ? <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p> : null}
        </div>

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
            {...register('password', {
              required: 'Password is required.',
              minLength: { value: 6, message: 'Minimum 6 characters.' },
            })}
          />
          {errors.password ? <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p> : null}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full btn-primary theme-transition text-sm font-semibold disabled:opacity-60">
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
