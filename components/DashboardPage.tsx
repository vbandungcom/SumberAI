
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';

const DashboardPage: React.FC = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-[#102A89] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center bg-blue-800/50 backdrop-blur-md rounded-2xl p-8 border border-blue-700/50">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-lg text-blue-200 mb-2">
          You are logged in as: <span className="font-semibold text-cyan-300">{user?.email}</span>
        </p>
        <p className="text-lg text-blue-200 mb-6">
          Your role is: <span className="font-semibold text-cyan-300">{role || 'Not assigned'}</span>
        </p>
        <p className="text-blue-200 mb-8">
          This is your personal space. More features are coming soon!
        </p>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
