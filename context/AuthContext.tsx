
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  role: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  // This function will check and update the user's role if it's not set.
  const updateUserRoleIfNeeded = async (currentUser: User): Promise<User> => {
    if (!currentUser.user_metadata?.role) {
      const { data, error } = await supabase.auth.updateUser({
        data: { role: 'user' },
      });
      if (error) {
        console.error('Error updating user role:', error.message);
        return currentUser; // Return original user on error
      }
      // Return the updated user from the API response
      return data.user;
    }
    return currentUser; // Return original user if role already exists
  };

  useEffect(() => {
    const getSessionAndUser = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      let finalUser = currentSession?.user ?? null;
      if (finalUser) {
        finalUser = await updateUserRoleIfNeeded(finalUser);
      }
      
      setSession(currentSession);
      setUser(finalUser);
      setRole(finalUser?.user_metadata?.role ?? null);
      setLoading(false);
    };

    getSessionAndUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        let finalUser = newSession?.user ?? null;
        if (finalUser) {
            finalUser = await updateUserRoleIfNeeded(finalUser);
        }
        setSession(newSession);
        setUser(finalUser);
        setRole(finalUser?.user_metadata?.role ?? null);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
