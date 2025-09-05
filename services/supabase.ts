import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fpltdifkzijlziwgyykk.supabase.co';
// The provided publishable key is the anon key. The previous JWT was malformed.
// Using the provided publishable key directly should resolve the "Invalid API key" error.
const supabaseAnonKey = 'sb_publishable_0ssWwE3tUbMT3bjB9nrLFA_Tk2psXkl';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
