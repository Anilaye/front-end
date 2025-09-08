import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qaaduqvqzbckpgtgdpxv.supabase.co";
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhYWR1cXZxemJja3BndGdkcHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMzUxNDMsImV4cCI6MjA3MTgxMTE0M30.LZUpIL0qtVlp8-rlYhwLOKhKMpzq_4140XtTvbt2YeM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
