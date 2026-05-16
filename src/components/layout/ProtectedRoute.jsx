import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../feedback/Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isBooting } = useAuth();

  if (isBooting) {
    return <Loader fullScreen label="Restoring session" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
