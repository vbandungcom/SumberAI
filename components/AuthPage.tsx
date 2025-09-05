
import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        navigate('/dashboard');
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'user',
          },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage('Check your email for the confirmation link!');
        setIsLogin(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#102A89] flex flex-col justify-center items-center p-4 text-white">
      <Link to="/" className="absolute top-8 left-8 flex items-center space-x-2">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-2xl">S</div>
        <div>
            <h1 className="font-bold text-xl">SUMBER AI</h1>
            <p className="text-xs text-blue-200">Solusi Cerdas Mahasiswa</p>
        </div>
      </Link>

      <div className="w-full max-w-md bg-blue-800/50 backdrop-blur-md rounded-2xl p-8 border border-blue-700/50">
        <h2 className="text-3xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
        
        {error && <p className="bg-[#8c4373] text-white p-3 rounded-md mb-4 text-center">{error}</p>}
        {message && <p className="bg-green-500/50 text-white p-3 rounded-md mb-4 text-center">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-200">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full bg-blue-900/50 border border-blue-700 rounded-md py-2 px-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-blue-200">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full bg-blue-900/50 border border-blue-700 rounded-md py-2 px-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="••••••••"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-blue-200">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button onClick={() => { setIsLogin(!isLogin); setError(null); setMessage(null); }} className="font-medium text-cyan-300 hover:underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
