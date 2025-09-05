import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Icons
const BackArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const GraduationCapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-5.197M15 11a4 4 0 110-5.292" /></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const statsData = [
    { label: 'Kursus Terdaftar', value: 4 },
    { label: 'Kursus Selesai', value: 2 },
    { label: 'Jam Belajar', value: 45 },
    { label: 'Quiz Selesai', value: 8 },
];

const tabs = ['Kursus', 'Quiz', 'Projek', 'AI Tutor'];

const courseData = [
    {
        id: 1,
        title: 'Machine Learning Fundamentals',
        description: 'Pelajari dasar-dasar machine learning dari konsep hingga implementasi praktis',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop',
        difficulty: 'Beginner',
        category: 'Machine Learning',
        progress: 75,
        duration: '8 jam',
        modules: 12,
        students: 1250,
        rating: 4.8,
        instructor: 'Dr. Ahmad Rizki',
        status: 'in-progress'
    },
    {
        id: 2,
        title: 'Deep Learning with Python',
        description: 'Mendalami neural networks dan deep learning menggunakan Python dan TensorFlow',
        imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop',
        difficulty: 'Intermediate',
        category: 'Deep Learning',
        progress: 40,
        duration: '12 jam',
        modules: 16,
        students: 890,
        rating: 4.9,
        instructor: 'Sarah Chen',
        status: 'in-progress'
    },
    {
        id: 3,
        title: 'Natural Language Processing',
        description: 'Teknik pemrosesan bahasa alami untuk memahami dan menganalisis teks',
        imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
        difficulty: 'Advanced',
        category: 'NLP',
        progress: 0,
        duration: '10 jam',
        modules: 14,
        students: 650,
        rating: 4.7,
        instructor: 'Prof. Maria Santos',
        status: 'not-started'
    },
    {
        id: 4,
        title: 'Computer Vision Basics',
        description: 'Dasar-dasar computer vision dan pengolahan citra digital',
        imageUrl: 'https://images.unsplash.com/photo-1517423568342-33b5c7774e1d?q=80&w=1928&auto=format&fit=crop',
        difficulty: 'Beginner',
        category: 'Computer Vision',
        progress: 0,
        duration: '6 hours',
        modules: 10,
        students: 420,
        rating: 4.6,
        instructor: 'Dr. James Wilson',
        status: 'not-started'
    }
];

const CourseCard = ({ course }) => {
    const difficultyColors = {
        'Beginner': 'bg-green-500',
        'Intermediate': 'bg-yellow-500',
        'Advanced': 'bg-red-500'
    };
    
    return (
        <div className="bg-blue-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-blue-700/50 flex flex-col group hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
                <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
                <div className={`absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded-md ${difficultyColors[course.difficulty]}`}>{course.difficulty}</div>
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">{course.category}</div>
            </div>
            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-sm text-blue-200 mb-4 flex-grow">{course.description}</p>

                {course.progress > 0 && (
                     <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-blue-200">Progress</span>
                            <span className="text-sm font-bold text-white">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-blue-900/70 rounded-full h-2">
                            <div className="bg-cyan-400 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-blue-200 mb-4">
                    <div className="flex items-center"><ClockIcon /><span>{course.duration}</span></div>
                    <div className="flex items-center"><BookOpenIcon /><span>{course.modules} modul</span></div>
                    <div className="flex items-center"><UsersIcon /><span>{course.students} siswa</span></div>
                    <div className="flex items-center"><StarIcon /><span>{course.rating}</span></div>
                </div>

                <div className="text-xs text-blue-300 mb-4">Instruktur: {course.instructor}</div>

                <button className="mt-auto w-full bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition flex items-center justify-center">
                    {course.status === 'in-progress' ? 'Lanjutkan' : 'Mulai'}
                    <PlayIcon />
                </button>
            </div>
        </div>
    );
}

const Footer: React.FC = () => (
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


const AIAcademyPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Kursus');

    return (
        <div className="bg-[#102A89] min-h-screen text-white flex flex-col">
            <main className="container mx-auto px-4 py-8 flex-grow">
                {/* Header */}
                <div className="mb-8">
                     <Link to="/dashboard" className="inline-flex items-center text-blue-300 hover:text-white mb-6 transition-colors">
                        <BackArrowIcon />
                        Kembali ke Beranda
                    </Link>
                     <div className="flex items-center">
                        <GraduationCapIcon />
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold">AI Academy</h1>
                            <p className="text-blue-200 mt-1">Akses modul pembelajaran AI interaktif, video tutorial, quiz, dan chatbot pembelajaran personal</p>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-6 border border-blue-700/50 mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {statsData.map(stat => (
                            <div key={stat.label}>
                                <p className="text-3xl md:text-4xl font-bold text-cyan-300">{stat.value}</p>
                                <p className="text-sm text-blue-200">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="mb-8">
                    <div className="bg-blue-800/50 backdrop-blur-md rounded-lg p-1 border border-blue-700/50 inline-flex space-x-1">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-md font-semibold text-sm transition-colors
                                    ${activeTab === tab 
                                        ? 'bg-white text-blue-800' 
                                        : 'text-blue-200 hover:bg-blue-700/50'
                                    }`
                                }
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {courseData.map(course => <CourseCard key={course.id} course={course} />)}
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default AIAcademyPage;
