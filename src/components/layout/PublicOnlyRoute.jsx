import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../feedback/Loader';

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isBooting } = useAuth();

  if (isBooting) {
    return <Loader fullScreen label="Preparing app" />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
