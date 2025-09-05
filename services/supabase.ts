import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fpltdifkzijlziwgyykk.supabase.co';
// The provided publishable key is the anon key. The previous JWT was malformed.
// Using the provided publishable key directly should resolve the "Invalid API key" error.
const supabaseAnonKey = 'sb_publishable_0ssWwE3tUbMT3bjB9nrLFA_Tk2psXkl';

// FIX: Explicitly configure session handling to rule out client-side edge cases.
// This is a targeted attempt to resolve the login hang by specifying how the client
// should manage sessions, which can sometimes fix mysterious authentication issues.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Disabling this as it's for OAuth/magic links and might interfere.
  },
});
