import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthService } from '../Services/AuthService.ts';

interface AuthenticatedRouteProps {
  component: React.ComponentType<any>;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ component: Component,...rest }) => {
  return AuthService.isAuthenticated() ? <Component {...rest} /> : <Navigate to="/" replace />;
};

export default AuthenticatedRoute;
