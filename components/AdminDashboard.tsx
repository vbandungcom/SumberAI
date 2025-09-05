
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

    /**
     * IMPORTANT SUPABASE SETUP:
     * This component relies on a 'profiles' table in your Supabase project.
     * 
     * 1. CREATE 'profiles' TABLE:
     *    - Columns: id (uuid, primary key, foreign key to auth.users.id),
     *               email (text), role (text, default 'user'), created_at (timestamptz)
     * 
     * 2. CREATE DATABASE TRIGGER:
     *    - Set up a trigger that automatically inserts a new row into 'profiles'
     *      whenever a new user signs up in 'auth.users'.
     * 
     * 3. SET UP ROW LEVEL SECURITY (RLS):
     *    - Enable RLS on the 'profiles' table.
     *    - Create a policy that allows users with the 'admin' role to SELECT and UPDATE all rows.
     *    - Create a policy that allows authenticated users to SELECT their own profile row.
     */
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        
        const { data, error: fetchError } = await supabase
            .from('profiles')
            .select('id, email, role');

        if (fetchError) {
            setError(`Failed to fetch users. Please ensure a 'profiles' table exists and that RLS policies grant admin read access. Error: ${fetchError.message}`);
            setUsers([]);
        } else {
            setUsers(data as Profile[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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
            // Refresh the user list to show the change
            await fetchUsers();
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

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-blue-700">
                                <tr>
                                    <th scope="col" className="p-4">Email</th>
                                    <th scope="col" className="p-4">Current Role</th>
                                    <th scope="col" className="p-4">Change Role</th>
                                    <th scope="col" className="p-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={4} className="text-center p-8">Loading users...</td></tr>
                                ) : users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={user.id} className="border-b border-blue-900/50 hover:bg-blue-800/70">
                                            <td className="p-4" data-label="Email">{user.email}</td>
                                            <td className="p-4 capitalize" data-label="Current Role">{user.role || 'user'}</td>
                                            <td className="p-4" data-label="Change Role">
                                                <select
                                                    defaultValue={user.role || 'user'}
                                                    id={`role-${user.id}`}
                                                    aria-label={`Change role for ${user.email}`}
                                                    className="bg-blue-900/50 border border-blue-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50"
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
                                                    className="bg-cyan-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-cyan-600 transition disabled:bg-gray-500/50 disabled:cursor-not-allowed"
                                                >
                                                    Update
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                   !error && <tr><td colSpan={4} className="text-center p-8">No users found.</td></tr>
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
