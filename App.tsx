
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import DashboardPage from './components/DashboardPage';
import AdminDashboard from './components/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import ProfilePage from './components/ProfilePage';
import NewsPage from './components/NewsPage';
import ArticleDetailPage from './components/ArticleDetailPage'; // Import the new component
import { supabase } from './services/supabase';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#102A89] text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#102A89] text-white p-4 text-center">
        <div className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-8 border border-red-700/50 max-w-2xl">
            <h2 className="text-3xl font-bold text-red-400 mb-4">Authentication Error</h2>
            <p className="mb-2 text-blue-200">The application could not retrieve your user profile after login. This is often caused by a misconfiguration in the database's Row Level Security (RLS) policies or a missing helper function.</p>
            <div className="bg-blue-900/50 p-3 rounded-md text-left text-sm text-red-300 font-mono mb-6">
                <p><strong>Error Details:</strong> {error}</p>
            </div>
            <p className="mb-6 text-blue-200">Please check your Supabase project's SQL Editor to ensure the `get_my_role` function exists and RLS policies are correct, then try logging in again.</p>
            <button
              onClick={() => supabase.auth.signOut()}
              className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition"
            >
              Logout and Try Again
            </button>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
           <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news"
            element={<NewsPage />}
          />
          <Route 
            path="/news/:articleId"
            element={<ArticleDetailPage />}
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
