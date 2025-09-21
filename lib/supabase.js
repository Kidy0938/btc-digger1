import { createClient } from '@supabase/supabase-js';

// Supabase URL & keys from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
import { supabase } from '../lib/supabase';

// Example: get current user
const { data: user } = await supabase.auth.getUser();
