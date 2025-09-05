import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Article } from './NewsPage';

// Icon Components
const BackArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>;


// Reusable Footer Component
const Footer: React.FC = () => (
     <footer id="kontak" className="bg-blue-900/30 text-blue-200 mt-auto">
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

const ArticleDetailPage: React.FC = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    
    useEffect(() => {
        const fetchArticle = async () => {
            if (!articleId) {
                setError("ID Artikel tidak valid.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('articles')
                .select('*')
                .eq('id', articleId)
                .single();

            if (fetchError) {
                if (fetchError.code === 'PGRST116') {
                    setError("Artikel tidak ditemukan.");
                } else {
                    setError(`Gagal memuat artikel: ${fetchError.message}`);
                }
                console.error(fetchError);
            } else {
                setArticle(data);
            }
            setLoading(false);
        };

        fetchArticle();
        window.scrollTo(0, 0); // Scroll to top on new article load
    }, [articleId]);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (totalHeight > 0) {
                const progress = (window.scrollY / totalHeight) * 100;
                setScrollProgress(progress);
            } else {
                setScrollProgress(100);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [article]); // Recalculate on article change

    const handleShare = () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    };

    if (loading) {
        return (
            <div className="bg-[#102A89] min-h-screen text-white flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                <p className="mt-4 text-blue-200">Memuat artikel...</p>
            </div>
        );
    }
    
    if (error || !article) {
        return (
            <div className="bg-[#102A89] min-h-screen text-white flex flex-col items-center justify-center p-4">
                <div className="text-center bg-blue-800/50 backdrop-blur-md rounded-2xl p-8 border border-red-700/50">
                    <h1 className="text-4xl font-bold mb-4 text-red-300">Terjadi Kesalahan</h1>
                    <p className="text-blue-200 mb-8">{error || "Maaf, kami tidak dapat menemukan artikel yang Anda cari."}</p>
                    <Link to="/news" className="inline-flex items-center bg-white text-blue-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition">
                        Kembali ke Halaman Berita
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#102A89] min-h-screen text-white flex flex-col">
            <div 
                className="fixed top-0 left-0 w-full h-1 bg-blue-900/50 z-50" 
                role="progressbar" 
                aria-label="Reading progress"
                aria-valuenow={Math.round(scrollProgress)} 
                aria-valuemin={0} 
                aria-valuemax={100}
            >
                <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-75 ease-linear" 
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            <main className="container mx-auto px-4 py-8 flex-grow">
                <div className="max-w-4xl mx-auto">
                    <Link to="/news" className="inline-flex items-center text-blue-300 hover:text-white mb-8 transition-colors">
                        <BackArrowIcon />
                        Kembali ke Semua Berita
                    </Link>

                    <article>
                        <header className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{article.title}</h1>
                            <div className="flex flex-wrap items-center text-blue-300 text-sm gap-x-4 gap-y-2">
                                <span>By {article.author}</span>
                                <span className="hidden sm:inline">&bull;</span>
                                <span>{article.date}</span>
                                <span className="hidden sm:inline">&bull;</span>
                                <span className="flex items-center"><ClockIcon /> {article.read_time}</span>
                                <span className="hidden sm:inline">&bull;</span>
                                <div className="relative flex items-center">
                                    <button 
                                        onClick={handleShare} 
                                        className="flex items-center text-blue-300 hover:text-white transition-colors focus:outline-none"
                                        aria-label="Bagikan artikel"
                                    >
                                        <ShareIcon />
                                        Bagikan
                                    </button>
                                    {isCopied && (
                                        <div className="absolute left-full ml-3 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-md whitespace-nowrap" role="status">
                                            Link disalin!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </header>

                        <img src={article.image_url} alt={article.title} className="w-full h-auto max-h-[500px] object-cover rounded-2xl mb-8 border border-blue-700/50" />
                        
                        <div
                            className="text-blue-200 prose prose-invert lg:prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ArticleDetailPage;