
import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();

    // State for profile form
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profileError, setProfileError] = useState<string | null>(null);
    const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

    // State for password form
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            
            setLoadingProfile(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('full_name, username, email')
                .eq('id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') { // Ignore error for no rows found
                setProfileError("Could not fetch profile data. Please ensure you have added 'full_name' and 'username' columns to your 'profiles' table.");
                console.error("Error fetching profile:", error);
            } else if (data) {
                setFullName(data.full_name || '');
                setUsername(data.username || '');
                setEmail(data.email || user.email || '');
            } else {
                 setEmail(user.email || '');
            }
            setLoadingProfile(false);
        };

        fetchProfile();
    }, [user]);

    const handleProfileUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoadingProfile(true);
        setProfileError(null);
        setProfileSuccess(null);

        const { error } = await supabase
            .from('profiles')
            .update({ full_name: fullName, username: username })
            .eq('id', user.id);

        if (error) {
            setProfileError(`Failed to update profile: ${error.message}. Make sure RLS is configured to allow updates.`);
        } else {
            setProfileSuccess("Profile updated successfully!");
        }
        setLoadingProfile(false);
    };

    const handlePasswordUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (!password) {
            setPasswordError("Password cannot be empty.");
            return;
        }

        setLoadingPassword(true);
        setPasswordError(null);
        setPasswordSuccess(null);

        const { error } = await supabase.auth.updateUser({ password: password });

        if (error) {
            setPasswordError(`Failed to update password: ${error.message}`);
        } else {
            setPasswordSuccess("Password updated successfully!");
            setPassword(''); // Clear password field
        }
        setLoadingPassword(false);
    };

    return (
      <div className="min-h-screen bg-[#102A89] text-white p-4 sm:p-6 lg:p-8">
        <main className="container mx-auto max-w-4xl">
           <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white">Edit Profile</h1>
                    <p className="text-blue-200">Manage your account settings and set your password.</p>
                </div>
                <Link to="/dashboard" className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition text-sm">
                    Back to Dashboard
                </Link>
           </div>

           {/* Profile Information Card */}
           <div className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-blue-700/50 mb-8">
                <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                {profileError && <p className="bg-red-900/50 text-white p-3 rounded-md mb-4 text-center">{profileError}</p>}
                {profileSuccess && <p className="bg-green-900/50 text-white p-3 rounded-md mb-4 text-center">{profileSuccess}</p>}
                
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-blue-200">Email Address</label>
                        <input id="email" type="email" value={email} readOnly disabled className="mt-1 block w-full bg-blue-900/70 border border-blue-700 rounded-md py-2 px-3 text-blue-300 cursor-not-allowed"/>
                    </div>
                     <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-blue-200">Full Name</label>
                        <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 block w-full bg-blue-900/50 border border-blue-700 rounded-md py-2 px-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Your full name"/>
                    </div>
                     <div>
                        <label htmlFor="username" className="block text-sm font-medium text-blue-200">Username</label>
                        <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full bg-blue-900/50 border border-blue-700 rounded-md py-2 px-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="A unique username"/>
                    </div>
                    <div className="text-right">
                        <button type="submit" disabled={loadingProfile} className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 disabled:bg-gray-400 transition">
                            {loadingProfile ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
           </div>

           {/* Change Password Card */}
           <div className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-blue-700/50">
                <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                {passwordError && <p className="bg-red-900/50 text-white p-3 rounded-md mb-4 text-center">{passwordError}</p>}
                {passwordSuccess && <p className="bg-green-900/50 text-white p-3 rounded-md mb-4 text-center">{passwordSuccess}</p>}

                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                    <div>
                        <label htmlFor="newPassword"className="block text-sm font-medium text-blue-200">New Password</label>
                        <input id="newPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full bg-blue-900/50 border border-blue-700 rounded-md py-2 px-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Enter new password"/>
                    </div>
                    <div className="text-right">
                        <button type="submit" disabled={loadingPassword} className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 disabled:bg-gray-400 transition">
                            {loadingPassword ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </form>
           </div>
        </main>
      </div>
    );
};

export default ProfilePage;
