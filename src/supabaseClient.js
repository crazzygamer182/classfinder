import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lhqdodahexsyrmabrxgj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxocWRvZGFoZXhzeXJtYWJyeGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NjM1MDUsImV4cCI6MjA4NjIzOTUwNX0.AlmvgP6oZNNBzrcvoQ9y_OPKgZQxHazgcItxkxXuUDg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
