
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading...</div>;
  }

  if (user && role === 'admin') {
    return <>{children}</>;
  }

  // Redirect to dashboard if logged in but not admin, or to auth if not logged in
  return <Navigate to={user ? "/dashboard" : "/auth"} />;
};

export default AdminRoute;