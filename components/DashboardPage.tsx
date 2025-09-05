import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';

const DashboardPage: React.FC = () => {
  const { user, role, error: authError } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      // On successful sign-out, the onAuthStateChange listener in AuthContext
      // will update the user state to null. The ProtectedRoute component will then
      // automatically handle the navigation, unmounting this page.
      // No manual navigation is needed here.
    } catch (e: any) {
      console.error('Error during logout:', e.message);
      alert(`Logout failed: ${e.message}`);
      // If logout fails, reset the button so the user can try again.
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#102A89] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center bg-blue-800/50 backdrop-blur-md rounded-2xl p-8 border border-blue-700/50">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-lg text-blue-200 mb-2">
          You are logged in as: <span className="font-semibold text-cyan-300">{user?.email}</span>
        </p>

        {authError ? (
          <div className="bg-red-900/50 border border-red-700 text-white p-3 rounded-md my-4 text-left">
            <p className="font-bold mb-2">Could not retrieve your role:</p>
            <p className="text-sm">{authError}</p>
          </div>
        ) : (
          <p className="text-lg text-blue-200 mb-6">
            Your role is: <span className="font-semibold text-cyan-300 capitalize">{role || 'Not assigned'}</span>
          </p>
        )}
        
        <p className="text-blue-200 mb-8">
          This is your personal space. More features are coming soon!
        </p>
        <div className="flex items-center justify-center space-x-4">
          {role === 'admin' && (
            <Link 
              to="/admin"
              className="bg-cyan-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-cyan-600 transition-transform transform hover:scale-105"
            >
              Admin Dashboard
            </Link>
          )}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;