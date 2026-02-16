import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../Services/AuthService.ts'; 

interface AdminRouteProps {
  component: React.ComponentType<any>;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ component: Component,...rest }) => {
  return AuthService.isAdmin() ? <Component {...rest} /> :  <Navigate to="/" replace />;
};

export default AdminRoute;
