import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';

// Icon Components
const BackArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const NewsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-1-5h.01" /></svg>;
const SearchIcon = () => <svg className="h-5 w-5 text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>;
const TrendingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const ExternalLinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 group-hover:text-cyan-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 9.516a.5.5 0 01.45-.316h6.626a.5.5 0 01.45.316l2.12 6.484A2 2 0 0117.886 19H6.114a2 2 0 01-1.94-2.999l2.563-6.485z" /></svg>;

export interface Article {
    id: number;
    title: string;
    description: string;
    content: string;
    author: string;
    date: string;
    read_time: string;
    image_url: string;
    featured: boolean;
    language: 'id' | 'en';
    tags: string[];
}

const trendingTopics = [
    '#GPT-5 Release',
    '#AI Ethics in Education',
    '#Machine Learning Careers',
    '#AI Research Tools'
];

const LanguageBadge: React.FC<{ lang: 'id' | 'en' }> = ({ lang }) => (
    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs flex items-center">
        <GlobeIcon />
        {lang.toUpperCase()}
    </div>
);

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
    <Link to={`/news/${article.id}`} className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-4 border border-blue-700/50 flex flex-col group hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative mb-4">
            <img src={article.image_url} alt={article.title} className="rounded-lg w-full h-48 object-cover" />
            {article.featured && <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">Featured</div>}
            <LanguageBadge lang={article.language} />
        </div>
        <div className="flex-grow flex flex-col">
            <div className="flex items-center text-xs text-blue-300 mb-2">
                <ClockIcon />
                <span>{article.read_time}</span>
                <span className="mx-2">&bull;</span>
                <span>{article.date}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 flex-grow">{article.title}</h3>
            <p className="text-sm text-blue-200 mb-4 flex-grow">{article.description}</p>
            <div className="flex justify-between items-center mt-auto pt-2 border-t border-blue-700/50">
                <span className="text-xs text-blue-300">{article.author}</span>
                <ExternalLinkIcon />
            </div>
        </div>
    </Link>
);


const Footer: React.FC = () => (
     <footer id="kontak" className="bg-blue-900/30 text-blue-200 mt-auto">
        <div className="container mx-auto px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md-col-span-2">
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

const NewsPage: React.FC = () => {
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('Featured');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const ARTICLES_TO_SHOW = 4;
    const [visibleCount, setVisibleCount] = useState(ARTICLES_TO_SHOW);
    
    const tabs = ['Featured', 'Indonesia', 'English', 'Semua'];

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('articles')
                .select('*')
                .order('date', { ascending: false });

            if (fetchError) {
                setError(`Gagal memuat artikel. Pastikan tabel 'articles' sudah dibuat di Supabase. Error: ${fetchError.message}`);
                console.error(fetchError);
            } else {
                setAllArticles(data || []);
            }
            setLoading(false);
        };

        fetchArticles();
    }, []);
    
    useEffect(() => {
        let currentArticles = allArticles;

        if (activeTab === 'Featured') {
            currentArticles = allArticles.filter(a => a.featured);
        } else if (activeTab === 'Indonesia') {
            currentArticles = allArticles.filter(a => a.language === 'id');
        } else if (activeTab === 'English') {
            currentArticles = allArticles.filter(a => a.language === 'en');
        }

        if (searchTerm.trim() !== '') {
            const lowercasedTerm = searchTerm.toLowerCase();
            currentArticles = currentArticles.filter(article =>
                article.title.toLowerCase().includes(lowercasedTerm) ||
                article.description.toLowerCase().includes(lowercasedTerm) ||
                article.author.toLowerCase().includes(lowercasedTerm) ||
                article.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
            );
        }
        
        setFilteredArticles(currentArticles);
        setVisibleCount(ARTICLES_TO_SHOW);
    }, [searchTerm, activeTab, allArticles]);

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + ARTICLES_TO_SHOW);
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="md:col-span-2 text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
                    <p className="mt-4 text-blue-200">Memuat artikel...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="md:col-span-2 text-center py-16 bg-red-900/30 rounded-2xl border border-red-700/50 p-6">
                    <h3 className="text-2xl font-bold text-red-300">Terjadi Kesalahan</h3>
                    <p className="text-blue-200 mt-2 max-w-2xl mx-auto">{error}</p>
                </div>
            );
        }

        if (filteredArticles.length === 0) {
            return (
                <div className="md:col-span-2 text-center py-16 bg-blue-800/30 rounded-2xl">
                    <h3 className="text-2xl font-bold text-white">Tidak Ada Artikel Ditemukan</h3>
                    <p className="text-blue-200 mt-2">Coba ganti kata kunci pencarian atau pilih kategori lain.</p>
                </div>
            );
        }

        return filteredArticles.slice(0, visibleCount).map(article => (
            <ArticleCard key={article.id} article={article} />
        ));
    };

    return (
        <div className="bg-[#102A89] min-h-screen text-white flex flex-col">
             <main className="container mx-auto px-4 py-8 flex-grow">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center text-blue-300 hover:text-white mb-6 transition-colors">
                        <BackArrowIcon />
                        Kembali ke Beranda
                    </Link>
                    <div className="flex items-center">
                        <NewsIcon />
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold">AI News & Insight</h1>
                            <p className="text-blue-200 mt-1">Dapatkan berita terkini dan wawasan mendalam tentang perkembangan AI dalam bahasa Indonesia dan Inggris</p>
                        </div>
                    </div>
                </div>

                {/* Search & Trending */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari artikel berdasarkan judul, deskripsi, penulis, atau tag..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-blue-800/50 border border-blue-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                        </div>
                    </div>
                    <div className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-4 border border-blue-700/50">
                        <h3 className="font-bold text-lg mb-3 flex items-center"><TrendingIcon /> Trending</h3>
                        <div className="flex flex-wrap gap-2">
                            {trendingTopics.map(topic => (
                                <a key={topic} href="#" className="text-sm text-blue-200 bg-blue-900/70 px-3 py-1 rounded-full hover:bg-blue-700 hover:text-white transition-colors">{topic}</a>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="mb-8">
                    <div className="border-b border-blue-700/50">
                        <nav className="-mb-px flex space-x-6">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                        ${activeTab === tab 
                                            ? 'border-cyan-400 text-cyan-300' 
                                            : 'border-transparent text-blue-300 hover:text-white hover:border-blue-400'
                                        }`
                                    }
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                     {renderContent()}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredArticles.length && !loading && !error && (
                    <div className="text-center">
                        <button 
                            onClick={handleLoadMore}
                            className="bg-blue-700/80 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                        >
                            Muat Artikel Lainnya
                        </button>
                    </div>
                )}
             </main>

            <Footer />
        </div>
    );
}

export default NewsPage;