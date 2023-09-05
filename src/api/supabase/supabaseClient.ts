import { createClient } from "@supabase/supabase-js";
import { type Database } from "types/supabase";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string;
const storageUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;

const options = {
  auth: { storageKey: "stile-token" },
};

const supabase = createClient<Database>(supabaseUrl, supabaseKey, options);
const auth = supabase.auth;

export { supabase, auth, storageUrl };
