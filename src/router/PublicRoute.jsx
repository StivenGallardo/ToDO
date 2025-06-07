import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';

const PublicRoute = ({ children }) => {
  const { status } = useAuthStore();

  if (status === 'authenticated') {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
};

export default PublicRoute;