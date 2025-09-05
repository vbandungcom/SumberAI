import React from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import DashboardPage from './components/DashboardPage';
import AdminDashboard from './components/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import EditorRoute from './components/EditorRoute'; // Import the new route
import ArticleManagement from './components/ArticleManagement'; // Import the new component
import ProfilePage from './components/ProfilePage';
import NewsPage from './components/NewsPage';
import ArticleDetailPage from './components/ArticleDetailPage'; 
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

const PlaceholderFooter: React.FC = () => (
    <footer className="bg-blue-900/30 text-blue-200">
        <div className="container mx-auto px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-2xl text-white">S</div>
                        <div>
                            <h1 className="font-bold text-xl text-white">SUMBER AI</h1>
                            <p className="text-xs text-blue-300">Solusi Cerdas Mahasiswa</p>
                        </div>
                    </div>
                    <p className="max-w-md">Platform AI terdepan yang dirancang khusus untuk membantu mahasiswa Indonesia mencapai potensi akademik maksimal dengan teknologi artificial intelligence terkini.</p>
                     <div className="flex space-x-4 mt-6">
                        <a href="#" className="w-8 h-8 rounded-full bg-blue-800/50 flex items-center justify-center hover:bg-blue-700"><i className="fab fa-facebook-f">f</i></a>
                        <a href="#" className="w-8 h-8 rounded-full bg-blue-800/50 flex items-center justify-center hover:bg-blue-700"><i className="fab fa-twitter">t</i></a>
                        <a href="#" className="w-8 h-8 rounded-full bg-blue-800/50 flex items-center justify-center hover:bg-blue-700"><i className="fab fa-instagram">i</i></a>
                        <a href="#" className="w-8 h-8 rounded-full bg-blue-800/50 flex items-center justify-center hover:bg-blue-700"><i className="fab fa-linkedin-in">in</i></a>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-white mb-4">Fitur</h3>
                    <ul className="space-y-2">
                        <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
                        <li><Link to="/news" className="hover:text-white">AI News & Insight</Link></li>
                        <li><Link to="/ai-academy" className="hover:text-white">AI Academy</Link></li>
                        <li><Link to="/marketplace" className="hover:text-white">Marketplace</Link></li>
                        <li><Link to="/english-tutor" className="hover:text-white">English Tutor</Link></li>
                        <li><Link to="/scholar-hub" className="hover:text-white">Scholar Hub</Link></li>
                        <li><Link to="/forum" className="hover:text-white">Community Forum</Link></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-bold text-white mb-4">Kontak</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>info@sumberai.id</li>
                        <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.76a11.024 11.024 0 008.57 8.57l.76-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>+62 21 1234 5678</li>
                        <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>Jakarta, Indonesia</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-blue-800/50 mt-8 pt-6 text-center text-sm">
                <p>&copy; 2025 SUMBER AI | Powered by Mahasiswa Digital. All rights reserved.</p>
            </div>
        </div>
    </footer>
);


const PlaceholderPage: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-[#102A89] min-h-screen text-white flex flex-col relative overflow-hidden">
        <div className="absolute top-[-10rem] left-[-10rem] w-96 h-96 bg-blue-600/30 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-15rem] right-[-15rem] w-[30rem] h-[30rem] bg-indigo-600/30 rounded-full filter blur-3xl opacity-50"></div>
        <main className="flex-grow container mx-auto px-4 flex flex-col items-center justify-center text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{title}</h1>
            <p className="text-lg md:text-xl text-blue-200 mb-8 max-w-2xl">{description}</p>
            <span className="bg-cyan-300 text-blue-900 font-bold text-sm py-2 px-4 rounded-full mb-8">SEGERA HADIR</span>
            <Link to="/" className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105">
                Kembali ke Beranda
            </Link>
        </main>
        <PlaceholderFooter />
    </div>
);


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
          <Route
            path="/admin/news"
            element={
              <EditorRoute>
                <ArticleManagement />
              </EditorRoute>
            }
          />
           {/* Placeholder Routes */}
          <Route path="/ai-academy" element={<PlaceholderPage title="AI Academy" description="Fitur ini akan menjadi pusat pembelajaran AI Anda, dengan modul interaktif, video tutorial, kuis, dan chatbot personal untuk mengasah kemampuan Anda." />} />
          <Route path="/marketplace" element={<PlaceholderPage title="AI Marketplace" description="Segera hadir, sebuah marketplace untuk jual beli produk digital berbasis AI seperti prompt engineering, template, dan toolkit canggih lainnya." />} />
          <Route path="/english-tutor" element={<PlaceholderPage title="AI English Tutor" description="Persiapkan diri untuk TOEFL/IELTS dengan chatbot pintar kami yang akan memberikan feedback real-time dan analisis mendalam untuk kemampuan speaking & writing Anda." />} />
          <Route path="/scholar-hub" element={<PlaceholderPage title="AI Scholar Hub" description="Pencarian beasiswa menjadi lebih mudah dengan AI. Dapatkan notifikasi otomatis beasiswa yang paling sesuai dengan profil dan preferensi akademik Anda." />} />
          <Route path="/forum" element={<PlaceholderPage title="Community Forum" description="Bergabunglah dalam forum diskusi antar mahasiswa untuk berbagi pengalaman, tips, dan wawasan terbaru seputar dunia AI dan teknologi." />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;