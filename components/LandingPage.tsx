
import React from 'react';
import { Link } from 'react-router-dom';

const IconContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${className}`}>
        {children}
    </div>
);

const featureData = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
        color: 'bg-pink-500',
        title: 'Dashboard',
        description: 'Pantau aktivitas belajar, progres akademik, dan notifikasi penting dalam satu tampilan terpusat',
        links: ['Analytics', 'Notifikasi'],
        path: '/dashboard'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-1-5h.01" /></svg>,
        color: 'bg-green-500',
        title: 'AI News & Insight',
        description: 'Dapatkan berita terkini dan wawasan mendalam tentang perkembangan AI dalam Bahasa Indonesia dan Inggris',
        links: ['Global', 'AI Trends'],
        path: '/news'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
        color: 'bg-blue-500',
        title: 'AI Academy',
        description: 'Akses modul pembelajaran AI interaktif, video tutorial, quiz, dan chatbot pembelajaran personal',
        links: ['Video', 'Quiz'],
        path: '/ai-academy'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
        color: 'bg-orange-500',
        title: 'AI Marketplace',
        description: 'Jual beli produk digital berbasis AI seperti prompt engineering, template, dan toolkit AI',
        links: ['Beli', 'Jual'],
        path: '/marketplace'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>,
        color: 'bg-teal-500',
        title: 'AI English Tutor',
        description: 'Chatbot pintar untuk latihan TOEFL/IELTS dengan feedback real-time dan analisis kemampuan',
        links: ['Speaking', 'Writing'],
        path: '/english-tutor'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
        color: 'bg-yellow-500',
        title: 'AI Scholar Hub',
        description: 'Pencarian beasiswa cerdas dengan notifikasi otomatis berdasarkan profil dan preferensi Anda',
        links: ['Filter', 'Alert'],
        path: '/scholar-hub'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.273-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.273.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        color: 'bg-purple-500',
        title: 'Community Forum',
        description: 'Forum diskusi mahasiswa untuk berbagi pengalaman, tips, dan insight tentang AI dan teknologi',
        links: ['Diskusi', 'Berbagi'],
        path: '/forum'
    }
];

const testimonialData = [
    {
        name: 'Andi Setiawan',
        university: 'Universitas Indonesia',
        initials: 'AS',
        color: 'bg-pink-500',
        text: '"AI Academy sangat membantu saya memahami machine learning. Video tutorialnya jelas dan quiz interaktifnya membuat belajar jadi menyenangkan!"'
    },
    {
        name: 'Sari Putri',
        university: 'ITB',
        initials: 'SP',
        color: 'bg-green-500',
        text: '"AI Scholar Hub membantu saya menemukan beasiswa yang tepat. Notifikasinya sangat akurat dan sesuai dengan profil akademik saya."'
    },
    {
        name: 'Rizki Firmansyah',
        university: 'UGM',
        initials: 'RF',
        color: 'bg-orange-500',
        text: '"AI English Tutor luar biasa! Feedback real-time untuk speaking practice sangat membantu persiapan IELTS saya."'
    }
];

const Header: React.FC = () => (
    <header className="absolute top-0 left-0 right-0 z-10 py-6 px-4 md:px-8">
        <div className="container mx-auto flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-2xl">S</div>
                <div>
                    <h1 className="font-bold text-xl">SUMBER AI</h1>
                    <p className="text-xs text-blue-200">Solusi Cerdas Mahasiswa</p>
                </div>
            </div>
            <nav className="hidden md:flex space-x-8 text-blue-200">
                <a href="#beranda" className="hover:text-white">Beranda</a>
                <a href="#fitur" className="hover:text-white">Fitur</a>
                <a href="#tentang" className="hover:text-white">Tentang</a>
                <a href="#kontak" className="hover:text-white">Kontak</a>
            </nav>
            <div className="flex items-center space-x-4">
                <Link to="/auth" state={{ isLogin: true }} className="hidden sm:block border border-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Masuk</Link>
                <Link to="/auth" state={{ isLogin: false }} className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition">Daftar</Link>
            </div>
        </div>
    </header>
);

const LandingPage: React.FC = () => {
    return (
        <div className="bg-[#102A89] min-h-screen text-white overflow-hidden relative">
            <div className="absolute top-[-10rem] left-[-10rem] w-96 h-96 bg-blue-600/30 rounded-full filter blur-3xl opacity-50"></div>
            <div className="absolute bottom-[-15rem] right-[-15rem] w-[30rem] h-[30rem] bg-indigo-600/30 rounded-full filter blur-3xl opacity-50"></div>

            <Header />

            <main className="container mx-auto px-4 pt-32 pb-16 relative z-0">
                {/* Hero */}
                <section id="beranda" className="text-center py-20">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                        Satu Platform, <br/>
                        <span className="text-cyan-300 relative">
                            Banyak Solusi
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-cyan-300 opacity-50 filter blur-sm"></span>
                        </span> Cerdas
                        <br/> untuk Mahasiswa
                    </h1>
                    <p className="max-w-3xl mx-auto text-blue-200 text-lg mb-8">
                        Tingkatkan produktivitas akademik dengan kekuatan AI. Dari pembelajaran interaktif, riset, hingga pencarian beasiswa, semua ada di sini.
                    </p>
                    <button className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105 flex items-center mx-auto space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        <span>Jelajahi Fitur</span>
                    </button>
                </section>

                {/* Features */}
                <section id="fitur" className="py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold">Fitur Unggulan</h2>
                        <p className="text-blue-200 mt-2">Tujuh solusi cerdas yang dirancang khusus untuk memenuhi kebutuhan akademik mahasiswa modern</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
                        {/* Decorative shape */}
                        <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/20 rounded-2xl rotate-45 opacity-50"></div>
                        {featureData.slice(0, 6).map((feature, index) => (
                             <Link to={feature.path} key={index} className="flex">
                                <div className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-6 border border-blue-700/50 transition-all duration-300 hover:border-cyan-400 hover:bg-blue-800/80 transform hover:-translate-y-2 w-full">
                                    <IconContainer className={feature.color}>{feature.icon}</IconContainer>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-blue-200 text-sm mb-4 h-20">{feature.description}</p>
                                    <div className="flex space-x-4 text-sm text-blue-300 mt-auto">
                                        {feature.links.map(link => <span key={link}>{link}</span>)}
                                    </div>
                                </div>
                             </Link>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                       <Link to={featureData[6].path} className="lg:w-1/3 md:w-1/2 w-full flex">
                           <div className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-6 border border-blue-700/50 transition-all duration-300 hover:border-cyan-400 hover:bg-blue-800/80 transform hover:-translate-y-2 w-full">
                               <IconContainer className={featureData[6].color}>{featureData[6].icon}</IconContainer>
                               <h3 className="text-xl font-bold mb-2">{featureData[6].title}</h3>
                               <p className="text-blue-200 text-sm mb-4">{featureData[6].description}</p>
                               <div className="flex space-x-4 text-sm text-blue-300 mt-auto">
                                   {featureData[6].links.map(link => <span key={link}>{link}</span>)}
                               </div>
                           </div>
                       </Link>
                    </div>
                </section>

                {/* Stats */}
                <section id="tentang" className="py-20 flex justify-center">
                    <div className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-10 border border-blue-700/50 max-w-5xl w-full">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold">Dipercaya Mahasiswa Indonesia</h2>
                            <p className="text-blue-200 mt-2">Bergabunglah dengan ribuan mahasiswa yang telah merasakan manfaatnya</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <p className="text-4xl font-bold text-cyan-300">25,000+</p>
                                <p className="text-blue-200">Pengguna Aktif</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-cyan-300">150+</p>
                                <p className="text-blue-200">Universitas</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-cyan-300">1,200+</p>
                                <p className="text-blue-200">Beasiswa Ditemukan</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-cyan-300">98%</p>
                                <p className="text-blue-200">Tingkat Kepuasan</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold">Kata Mereka</h2>
                        <p className="text-blue-200 mt-2">Testimoni dari mahasiswa yang telah merasakan manfaatnya</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonialData.map((testimonial, index) => (
                            <div key={index} className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-6 border border-blue-700/50">
                                <div className="flex items-center mb-4">
                                    <div className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center font-bold text-xl mr-4`}>
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <p className="font-bold">{testimonial.name}</p>
                                        <p className="text-sm text-blue-300">{testimonial.university}</p>
                                    </div>
                                </div>
                                <p className="text-blue-200 mb-4">{testimonial.text}</p>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* CTA */}
                <section className="py-20">
                    <div className="text-center bg-blue-800/50 backdrop-blur-md rounded-2xl p-12 border border-blue-700/50 max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold mb-4">Siap Memulai Perjalanan AI Anda?</h2>
                        <p className="text-blue-200 max-w-2xl mx-auto mb-8">Bergabunglah dengan ribuan mahasiswa yang telah mengoptimalkan studi mereka dengan kekuatan AI.</p>
                        <Link to="/auth" state={{ isLogin: false }} className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105 inline-flex items-center space-x-2">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            <span>Mulai Gratis Sekarang</span>
                        </Link>
                    </div>
                </section>

            </main>
            
            {/* Footer */}
            <footer id="kontak" className="bg-blue-900/30 text-blue-200">
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
        </div>
    );
};

export default LandingPage;
