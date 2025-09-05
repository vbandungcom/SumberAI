import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import DashboardPage from './components/DashboardPage';
import AdminDashboard from './components/AdminDashboard';
import ArticleManagement from './components/ArticleManagement';
import ProfilePage from './components/ProfilePage';
import NewsPage from './components/NewsPage';
import ArticleDetailPage from './components/ArticleDetailPage'; 
import AIAcademyPage from './components/AIAcademyPage';
import AdminRoute from './components/AdminRoute';
import EditorRoute from './components/EditorRoute';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#102A89] text-white">
        Loading...
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/auth" />;
};

// FIX: The App component was missing, and there was no default export, causing the application to fail.
// Re-created the main App component with the application's routing structure and added the default export.
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
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:articleId" element={<ArticleDetailPage />} />
          <Route path="/ai-academy" element={<AIAcademyPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/news"
            element={
              <EditorRoute>
                <ArticleManagement />
              </EditorRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
