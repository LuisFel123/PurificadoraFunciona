import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, redirectTo }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
