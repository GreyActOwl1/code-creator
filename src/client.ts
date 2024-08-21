import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_ENDPOINT!
const API_KEY = process.env.SUPABASE_API_KEY!

const supabase = createClient(SUPABASE_URL, API_KEY)

