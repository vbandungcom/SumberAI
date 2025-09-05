
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';

// Icon Components
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const AwardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6a2 2 0 100-4 2 2 0 000 4zm0 12a2 2 0 100-4 2 2 0 000 4zm6-6a2 2 0 100-4 2 2 0 000 4zM6 12a2 2 0 100-4 2 2 0 000 4z" /></svg>;
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-8-8v8m-4-4h16" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;

// Reusable Components
const StatCard: React.FC<{ title: string; value: string; change: string; icon: React.ReactNode; iconBg: string }> = ({ title, value, change, icon, iconBg }) => (
    <div className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-5 flex justify-between items-center border border-blue-700/50">
        <div>
            <p className="text-blue-300 text-sm">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-xs text-green-400">{change}</p>
        </div>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${iconBg}`}>
            {icon}
        </div>
    </div>
);

const ProgressBar: React.FC<{ label: string; percentage: number; color: string }> = ({ label, percentage, color }) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-blue-200">{label}</span>
            <span className="text-sm font-semibold text-white">{percentage}%</span>
        </div>
        <div className="w-full bg-blue-900/70 rounded-full h-2.5">
            <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

const Footer = () => (
     <footer id="kontak" className="bg-blue-900/30 text-blue-200 mt-10">
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
                        <a href="#" className="w-8 h-8 rounded-full bg-blue-800/50 flex items-center justify-center hover:bg-blue-700">f</a>
                        <a href="#" className="w-8 h-8 rounded-full bg-blue-800/50 flex items-center justify-center hover:bg-blue-700">t</a>
                        <a href="#" className="w-8 h-8 rounded-full bg-blue-800/50 flex items-center justify-center hover:bg-blue-700">i</a>
                        <a href="#" className="w-8 h-8 rounded-full bg-blue-800/50 flex items-center justify-center hover:bg-blue-700">in</a>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-white mb-4">Fitur</h3>
                    <ul className="space-y-2">
                        <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
                        <li><Link to="/news" className="hover:text-white">AI News & Insight</Link></li>
                        <li><a href="#" className="hover:text-white">AI Academy</a></li>
                        <li><a href="#" className="hover:text-white">Marketplace</a></li>
                        <li><a href="#" className="hover:text-white">English Tutor</a></li>
                        <li><a href="#" className="hover:text-white">Scholar Hub</a></li>
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


// Page Data
const stats = [
    { title: 'Kursus Selesai', value: '12', change: '+3 minggu ini', icon: <CheckCircleIcon />, iconBg: 'bg-green-500/30 text-green-300' },
    { title: 'Jam Belajar', value: '45.2', change: '+8.5 jam', icon: <ClockIcon />, iconBg: 'bg-cyan-500/30 text-cyan-300' },
    { title: 'Skor TOEFL', value: '485', change: '+25 poin', icon: <AwardIcon />, iconBg: 'bg-purple-500/30 text-purple-300' },
    { title: 'Beasiswa Dilamar', value: '8', change: '+1 aplikasi', icon: <TargetIcon />, iconBg: 'bg-orange-500/30 text-orange-300' }
];

const progressData = [
    { label: 'AI Academy', percentage: 75, color: 'bg-gradient-to-r from-purple-500 to-cyan-400' },
    { label: 'English Tutor', percentage: 60, color: 'bg-gradient-to-r from-green-400 to-teal-300' },
    { label: 'Marketplace Activity', percentage: 40, color: 'bg-gradient-to-r from-orange-500 to-yellow-400' }
];

const notifications = [
    { title: 'Beasiswa Baru Tersedia', desc: 'LPDP membuka pendaftaran untuk periode 2025', time: '30 menit yang lalu' },
    { title: 'Quiz Baru Ditambahkan', desc: 'Deep Learning Fundamentals - Test kemampuan Anda', time: '2 jam yang lalu' },
    { title: 'Forum Diskusi Populer', desc: 'ChatGPT vs Google Bard - Join diskusi seru', time: '4 jam yang lalu' }
];

// Fix: Corrected the activities array which was cut off.
const activities = [
    { title: 'Menyelesaikan Quiz Machine Learning Basics', time: '2 jam yang lalu', tag: 'quiz', tagColor: 'bg-blue-500/80' },
    { title: 'Bergabung dalam diskusi AI Ethics', time: '5 jam yang lalu', tag: 'forum', tagColor: 'bg-green-500/80' },
    { title: 'Mengunggah proyek baru ke Marketplace', time: '1 hari yang lalu', tag: 'project', tagColor: 'bg-orange-500/80' }
];

// Fix: Added the DashboardPage component which was missing.
const DashboardPage: React.FC = () => {
    const { user, role } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/auth');
    };
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


    return (
        <div className="bg-[#102A89] min-h-screen text-white">
            <div className="absolute top-[-10rem] left-[-10rem] w-96 h-96 bg-blue-600/30 rounded-full filter blur-3xl opacity-50"></div>
            <div className="absolute bottom-[-15rem] right-[-15rem] w-[30rem] h-[30rem] bg-indigo-600/30 rounded-full filter blur-3xl opacity-50"></div>
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Selamat Datang, {user?.email?.split('@')[0] || 'Mahasiswa'}!</h1>
                        <p className="text-blue-200">Pantau progres belajar dan aktivitas Anda di sini.</p>
                    </div>
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold text-2xl border-2 border-transparent hover:border-cyan-400 transition">
                            {user?.email?.[0].toUpperCase() || 'S'}
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-blue-800/80 backdrop-blur-md rounded-lg shadow-lg border border-blue-700/50 py-2 z-50">
                                <div className="px-4 py-2 border-b border-blue-700/50">
                                    <p className="font-semibold text-white">{user?.email?.split('@')[0] || 'User'}</p>
                                    <p className="text-sm text-blue-300 truncate">{user?.email}</p>
                                </div>
                                <Link to="/profile" className="flex items-center w-full text-left px-4 py-2 text-sm text-blue-200 hover:bg-blue-700/50">
                                    <UserIcon /> Edit Profil
                                </Link>
                                {role === 'admin' && (
                                     <Link to="/admin" className="flex items-center w-full text-left px-4 py-2 text-sm text-blue-200 hover:bg-blue-700/50">
                                        <ShieldIcon /> Admin Panel
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-blue-200 hover:bg-blue-700/50">
                                    <LogoutIcon /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Progress Section */}
                        <div className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-6 border border-blue-700/50">
                            <h2 className="text-xl font-bold mb-4 flex items-center"><ChartBarIcon /> Progres Belajar Anda</h2>
                            <div className="space-y-4">
                                {progressData.map((prog, index) => (
                                    <ProgressBar key={index} {...prog} />
                                ))}
                            </div>
                        </div>
                        {/* Notifications Section */}
                        <div className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-6 border border-blue-700/50">
                             <h2 className="text-xl font-bold mb-4 flex items-center"><BellIcon /> Notifikasi Terbaru</h2>
                             <ul className="divide-y divide-blue-700/50">
                                {notifications.map((notif, index) => (
                                    <li key={index} className="py-3 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-white">{notif.title}</p>
                                            <p className="text-sm text-blue-200">{notif.desc}</p>
                                        </div>
                                        <span className="text-xs text-blue-300 whitespace-nowrap ml-4">{notif.time}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Right Column (Activities) */}
                    <div className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-6 border border-blue-700/50">
                        <h2 className="text-xl font-bold mb-4 flex items-center"><CalendarIcon /> Aktivitas Terakhir</h2>
                        <ul className="space-y-4">
                            {activities.map((activity, index) => (
                                <li key={index} className="flex items-start">
                                    <div className={`mt-1 w-2 h-2 rounded-full ${activity.tagColor} mr-3 flex-shrink-0`}></div>
                                    <div>
                                        <p className="text-white text-sm">{activity.title}</p>
                                        <p className="text-xs text-blue-300">{activity.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

// Fix: Added a default export for DashboardPage.
export default DashboardPage;
