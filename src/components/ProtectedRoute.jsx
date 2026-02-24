import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

// Ruta que requiere autenticación (cualquier rol)
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Ruta que requiere rol de administrador
export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Ruta solo para usuarios no autenticados (login, register)
export const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated()) {
    return <Navigate to="/tendencias" replace />;
  }
  
  return children;
};
