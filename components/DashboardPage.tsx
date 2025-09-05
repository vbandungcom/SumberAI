
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';

const DashboardPage: React.FC = () => {
  const { user, role, error: authError } = useAuth(); // Get authError from context
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      // Successful sign out will trigger onAuthStateChange, which handles state cleanup.
      // Navigate immediately for a faster UX.
      navigate('/auth');
    } catch (e: any) {
      console.error('Error during logout:', e.message);
      alert(`Logout failed: ${e.message}`);
    } finally {
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
