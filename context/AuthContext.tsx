
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: string | null;
  error: string | null; // New error state
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  role: null,
  error: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // New error state

  const getProfile = async (currentUser: User) => {
    setError(null); // Reset error on new attempt
    try {
      // Step 1: Fetch role using the secure RPC function to avoid RLS recursion.
      // This function must be created in your Supabase SQL editor.
      const { data: roleData, error: rpcError } = await supabase.rpc('get_my_role');

      // The RPC returns null if no profile exists, which is not an error.
      if (rpcError) {
        throw rpcError;
      }

      if (roleData) {
        setRole(roleData);
      } else {
        // Step 2: Profile doesn't exist. Create it for the user (backfill).
        // This 'insert' is allowed by the "Allow individual insert access" RLS policy.
        const { error: insertError } = await supabase.from('profiles').insert({
          id: currentUser.id,
          email: currentUser.email,
          role: 'user',
        });
        if (insertError) throw insertError;
        setRole('user');
      }
    } catch (e: any) {
      const errorMessage = `Failed to get user profile. This may be due to missing RLS policies or a missing 'get_my_role' database function. Please check your Supabase dashboard. Original error: ${e.message}`;
      console.error(errorMessage);
      setError(errorMessage); // Set the detailed error message
      setRole(null);
    }
  };

  useEffect(() => {
    const getSessionAndProfile = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        await getProfile(currentSession.user);
      } else {
        setRole(null);
      }
      setLoading(false);
    };

    getSessionAndProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (newSession?.user) {
          await getProfile(newSession.user);
        } else {
          setRole(null);
          setError(null); // Clear role and error on logout
        }
        if (loading) setLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    session,
    loading,
    role,
    error, // Provide the error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
