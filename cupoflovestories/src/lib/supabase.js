import { createClient } from '@supabase/supabase-js'

// 🔧 REPLACE THESE WITH YOUR SUPABASE PROJECT CREDENTIALS
// Go to: https://supabase.com → Your Project → Settings → API
const SUPABASE_URL = 'https://qkgcyxwkflnbpppdsudm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrZ2N5eHdrZmxuYnBwcGRzdWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NTU5ODcsImV4cCI6MjA4OTMzMTk4N30.ZVyiwQH2Eg6PTeauXvlFHdk9ve8sGYYqYPWxoIw8VBE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
