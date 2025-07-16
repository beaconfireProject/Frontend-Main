import React from 'react';
import { Navigate } from 'react-router-dom';

interface RoleGuardProps {
  allowedRoles: string[]; // e.g. ['HR'] or ['EMPLOYEE']
  children: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    // Unauthorized: could redirect to a 403 page or login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;
