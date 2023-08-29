import { supabase } from "./supabaseClient";

// get
export const fetchPostData = async (paramsId: string) => {
  const { data } = await supabase.from("POSTS").select("*").eq("id", paramsId).single();;
  return data;
};
