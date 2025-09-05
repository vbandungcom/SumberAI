

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  // FIX: Re-added `role` to the context type to be used by protected routes.
  role: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  // FIX: Added `role` to the default context value.
  role: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  // FIX: Added state to store the user's role.
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // FIX: This effect now fetches both the session and the user's role from the 'profiles' table.
    // This restores functionality for role-based routes like AdminRoute and EditorRoute, which was
    // previously removed for diagnostic purposes.

    // 1. Get the initial session and profile when the app loads.
    const getInitialData = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
            // If a user is logged in, fetch their profile.
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', currentUser.id)
                .single();
            setRole(profile?.role || null);
        }
        setLoading(false); // We are ready to render the app.
    };
    
    getInitialData();

    // 2. Listen for any changes in authentication state (login, logout).
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
            // When auth state changes, re-fetch the profile.
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', currentUser.id)
                .single();
            setRole(profile?.role || null);
        } else {
            // If logged out, clear the role.
            setRole(null);
        }
        setLoading(false); // Update state on any auth change.
      }
    );

    // 3. Clean up the listener when the component unmounts.
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = { user, session, loading, role };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
