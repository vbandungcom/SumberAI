import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Article } from './NewsPage';

const initialArticleState: Omit<Article, 'id'> = {
    title: '',
    description: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    read_time: '',
    image_url: '',
    featured: false,
    language: 'id',
    tags: [],
};

const ArticleFormModal: React.FC<{
    article: Article | Omit<Article, 'id'> | null;
    onClose: () => void;
    onSave: () => void;
}> = ({ article, onClose, onSave }) => {
    const [formData, setFormData] = useState<Article | Omit<Article, 'id'>>(() => 
        (article && 'id' in article) ? { ...article } : { ...initialArticleState }
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isEditing = article && 'id' in article;

    // Fix: To resolve the TypeScript error on 'e.target.checked', we must narrow down the type of e.target.
    // The `instanceof HTMLInputElement` check acts as a type guard, assuring TypeScript
    // that within this block, e.target is an HTMLInputElement and has the 'checked' property.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: e.target.checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tagsArray = e.target.value.split(',').map(tag => tag.trim());
        setFormData(prev => ({...prev, tags: tagsArray}));
    };
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const finalData = { ...formData, tags: formData.tags.filter(t => t) };

        let result;
        if (isEditing) {
            result = await supabase.from('articles').update(finalData).eq('id', (formData as Article).id);
        } else {
            result = await supabase.from('articles').insert(finalData);
        }

        if (result.error) {
            setError(result.error.message);
        } else {
            onSave();
            onClose();
        }
        setLoading(false);
    };
    
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-blue-900/80 w-full max-w-4xl max-h-[90vh] rounded-2xl border border-blue-700/50 flex flex-col">
                <header className="flex justify-between items-center p-4 border-b border-blue-700/50">
                    <h2 className="text-2xl font-bold">{isEditing ? 'Edit Article' : 'Add New Article'}</h2>
                    <button onClick={onClose} className="text-blue-300 hover:text-white">&times;</button>
                </header>
                <div className="p-6 overflow-y-auto">
                    {error && <p className="bg-red-900/50 text-white p-3 rounded-md mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Column 1 */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-blue-200">Title</label>
                                <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} required className="input-style" />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-blue-200">Description</label>
                                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} className="input-style" />
                            </div>
                             <div>
                                <label htmlFor="content" className="block text-sm font-medium text-blue-200">Content (HTML)</label>
                                <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={10} className="input-style" />
                            </div>
                        </div>
                        {/* Column 2 */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-blue-200">Author</label>
                                <input id="author" name="author" type="text" value={formData.author} onChange={handleChange} required className="input-style" />
                            </div>
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-blue-200">Date</label>
                                <input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required className="input-style" />
                            </div>
                             <div>
                                <label htmlFor="read_time" className="block text-sm font-medium text-blue-200">Read Time (e.g., 5 menit)</label>
                                <input id="read_time" name="read_time" type="text" value={formData.read_time} onChange={handleChange} className="input-style" />
                            </div>
                            <div>
                                <label htmlFor="image_url" className="block text-sm font-medium text-blue-200">Image URL</label>
                                <input id="image_url" name="image_url" type="url" value={formData.image_url} onChange={handleChange} className="input-style" />
                            </div>
                             <div>
                                <label htmlFor="tags" className="block text-sm font-medium text-blue-200">Tags (comma-separated)</label>
                                <input id="tags" name="tags" type="text" value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''} onChange={handleTagsChange} className="input-style" />
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <label htmlFor="language" className="block text-sm font-medium text-blue-200">Language</label>
                                    <select id="language" name="language" value={formData.language} onChange={handleChange} className="input-style">
                                        <option value="id">Indonesia</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                                <div className="flex items-center pt-6">
                                    <input id="featured" name="featured" type="checkbox" checked={formData.featured} onChange={handleChange} className="h-4 w-4 text-cyan-400 bg-blue-800 border-blue-600 rounded focus:ring-cyan-500" />
                                    <label htmlFor="featured" className="ml-2 text-sm text-blue-200">Featured Article</label>
                                </div>
                            </div>
                        </div>
                        {/* Footer Buttons */}
                        <div className="md:col-span-2 flex justify-end gap-4 pt-4 border-t border-blue-700/50">
                            <button type="button" onClick={onClose} className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition">Cancel</button>
                            <button type="submit" disabled={loading} className="bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition disabled:bg-gray-500">
                                {loading ? 'Saving...' : 'Save Article'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ArticleManagement: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchArticles = async (searchText: string = '') => {
        setLoading(true);
        setError(null);
        let query = supabase
            .from('articles')
            .select('*')
            .order('date', { ascending: false });

        if (searchText) {
            const cleanedSearchText = `%${searchText.trim()}%`;
            query = query.or(`title.ilike.${cleanedSearchText},author.ilike.${cleanedSearchText}`);
        }

        const { data, error: fetchError } = await query;
        if (fetchError) {
            setError(fetchError.message);
        } else {
            setArticles(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchArticles(searchTerm);
        }, 300); // 300ms delay

        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const handleAdd = () => {
        setEditingArticle(null);
        setShowModal(true);
    };

    const handleEdit = (article: Article) => {
        setEditingArticle(article);
        setShowModal(true);
    };

    const handleDelete = async (articleId: number) => {
        if (window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
            const { error: deleteError } = await supabase.from('articles').delete().eq('id', articleId);
            if (deleteError) {
                setError(deleteError.message);
            } else {
                fetchArticles(searchTerm); // Refresh list respecting current search
            }
        }
    };

    const handleSave = () => {
        fetchArticles(searchTerm);
    };

    return (
        <div className="min-h-screen bg-[#102A89] text-white p-4 md:p-8">
            <style>{`.input-style { background-color: rgba(17, 39, 137, 0.5); border: 1px solid rgba(49, 80, 196, 1); border-radius: 0.375rem; padding: 0.5rem 0.75rem; color: white; width: 100%; }`}</style>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold">Article Management</h1>
                        <p className="text-blue-200">Create, edit, and delete news articles.</p>
                    </div>
                     <div className="flex items-center gap-4">
                        <button onClick={handleAdd} className="bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition">
                            + Add New Article
                        </button>
                        <Link to="/admin" className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition">Back to Admin</Link>
                    </div>
                </div>

                 {/* Search Input */}
                 <div className="mb-6 relative">
                    <label htmlFor="article-search" className="sr-only">Search articles</label>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="article-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full bg-blue-900/50 border border-blue-700 rounded-md py-2 pl-10 pr-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:text-sm"
                        placeholder="Search by title or author..."
                    />
                </div>

                {error && <p className="bg-red-900/50 text-white p-3 rounded-md mb-4">{error}</p>}

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left text-gray-800">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Author</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr><td colSpan={4} className="text-center p-8 text-gray-500">Loading articles...</td></tr>
                                ) : articles.length > 0 ? (
                                    articles.map(article => (
                                        <tr key={article.id} className="hover:bg-gray-50">
                                            <td className="p-4 font-semibold text-gray-900">{article.title}</td>
                                            <td className="p-4 text-gray-600">{article.author}</td>
                                            <td className="p-4 text-gray-600">{article.date}</td>
                                            <td className="p-4 text-right space-x-2">
                                                <button onClick={() => handleEdit(article)} className="bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg hover:bg-blue-700 transition">Edit</button>
                                                <button onClick={() => handleDelete(article.id)} className="bg-red-600 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-700 transition">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                   <tr><td colSpan={4} className="text-center p-8 text-gray-500">No articles found{searchTerm ? " matching your search" : ""}. Add one to get started.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
                <ArticleFormModal 
                    key={editingArticle ? editingArticle.id : 'new-article'}
                    article={editingArticle}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default ArticleManagement;