import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';

// Define the shape of a user profile object from our 'profiles' table
interface Profile {
    id: string;
    email: string;
    role: string;
}

const AdminDashboard: React.FC = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async (searchText: string = '') => {
        setLoading(true);
        setError(null);
        
        let query = supabase
            .from('profiles')
            .select('id, email, role');

        // If there's a search term, apply a filter using .or()
        // This searches across multiple columns case-insensitively.
        if (searchText) {
            const cleanedSearchText = `%${searchText.trim()}%`;
            query = query.or(`email.ilike.${cleanedSearchText},full_name.ilike.${cleanedSearchText},username.ilike.${cleanedSearchText}`);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
            setError(`Failed to fetch users. Please ensure a 'profiles' table exists and that RLS policies grant admin read access. Error: ${fetchError.message}`);
            setUsers([]);
        } else {
            setUsers(data as Profile[]);
        }
        setLoading(false);
    };

    // This effect runs once on mount to fetch all users,
    // and re-runs with a debounce when the searchTerm changes.
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchUsers(searchTerm);
        }, 300); // 300ms delay

        // Cleanup function to clear the timer if the component unmounts
        // or if the searchTerm changes before the timer finishes.
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const handleRoleChange = async (userId: string, newRole: string) => {
        setSuccess(null);
        setError(null);

        if (userId === currentUser?.id) {
            setError("For security, you cannot change your own role.");
            return;
        }

        const { error: updateError } = await supabase
            .from('profiles')
            .update({ role: newRole })
            .eq('id', userId);

        if (updateError) {
            setError(`Failed to update role. Ensure RLS policies grant admin update permission. Error: ${updateError.message}`);
        } else {
            setSuccess(`Successfully updated role for the user.`);
            // Refresh the user list to show the change, respecting the current search term
            await fetchUsers(searchTerm);
        }
    };

    const roles = ['user', 'admin', 'operator'];

    return (
        <div className="min-h-screen bg-[#102A89] text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                     <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                     <Link to="/dashboard" className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition">Back to Dashboard</Link>
                </div>

                <div className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-6 border border-blue-700/50">
                    <h2 className="text-2xl font-bold mb-4">User Management</h2>

                    {/* Search Input */}
                    <div className="mb-4 relative">
                        <label htmlFor="user-search" className="sr-only">Search users</label>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="user-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full bg-blue-900/50 border border-blue-700 rounded-md py-2 pl-10 pr-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:text-sm"
                            placeholder="Search by email, name, or username..."
                        />
                    </div>

                    {error && (
                        <div className="bg-red-900/50 border border-red-700 text-white p-3 rounded-md mb-4" role="alert">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    )}
                     {success && (
                        <div className="bg-green-900/50 border border-green-700 text-white p-3 rounded-md mb-4" role="status">
                            <p>{success}</p>
                        </div>
                    )}

                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="w-full text-left text-gray-800">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                    <th scope="col" className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Current Role</th>
                                    <th scope="col" className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Change Role</th>
                                    <th scope="col" className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr><td colSpan={4} className="text-center p-8 text-gray-500">Loading users...</td></tr>
                                ) : users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="p-4 whitespace-nowrap" data-label="Email">{user.email}</td>
                                            <td className="p-4 capitalize" data-label="Current Role">{user.role || 'user'}</td>
                                            <td className="p-4" data-label="Change Role">
                                                <select
                                                    defaultValue={user.role || 'user'}
                                                    id={`role-${user.id}`}
                                                    aria-label={`Change role for ${user.email}`}
                                                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 disabled:bg-gray-200"
                                                    disabled={user.id === currentUser?.id}
                                                >
                                                    {roles.map(role => (
                                                        <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="p-4" data-label="Action">
                                                <button
                                                    onClick={() => {
                                                        const select = document.getElementById(`role-${user.id}`) as HTMLSelectElement;
                                                        handleRoleChange(user.id, select.value);
                                                    }}
                                                    disabled={user.id === currentUser?.id}
                                                    className="bg-cyan-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-cyan-600 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
                                                >
                                                    Update
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                   !error && <tr><td colSpan={4} className="text-center p-8 text-gray-500">No users found{searchTerm ? " matching your search" : ""}.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;