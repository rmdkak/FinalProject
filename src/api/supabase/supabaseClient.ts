import { createClient } from "@supabase/supabase-js";
import { type Database } from "types/supabase";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);
const auth = supabase.auth;

export { supabase, auth };
