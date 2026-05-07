import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './Loader';

const AdminRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <Loader />;
  
  return user?.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;