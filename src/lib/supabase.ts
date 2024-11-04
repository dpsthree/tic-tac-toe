import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://gdvewevdpflsxemrmvwf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkdmV3ZXZkcGZsc3hlbXJtdndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NzAyNjUsImV4cCI6MjA0NjI0NjI2NX0.AXhcgzl_iOJkUP8HDgVmr6brungJ8xJdq-7uvZUSQ3U';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
});