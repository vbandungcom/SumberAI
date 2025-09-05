import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EditorRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading...</div>;
  }

  // Allow access if the user is an 'admin' or 'operator'
  if (user && (role === 'admin' || role === 'operator')) {
    return <>{children}</>;
  }

  // Redirect to dashboard if logged in but not authorized, or to auth if not logged in
  return <Navigate to={user ? "/dashboard" : "/auth"} />;
};

export default EditorRoute;
