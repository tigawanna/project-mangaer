
import { Navigate } from 'react-router-dom';

//@ts-ignore
export const ProtectedRoute = ({ user, children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };
