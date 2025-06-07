import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';

const ProtectedRoute = ({ children }) => {
  const { status } = useAuthStore();

  if (status === 'authenticated') {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default ProtectedRoute;