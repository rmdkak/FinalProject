import { type Tables } from "types/supabase";

import { supabase } from "./supabaseClient";

const DATA_TABLE = "POSTLIKES";
// get
export const fetchPostLike = async (postId: string) => {
  const { data, error } = await supabase.from(DATA_TABLE).select().eq("postId", postId).limit(1).single();

  if (error !== null) {
    console.error("error :", error);
    return;
  }

  return data;
};

// patch
export const changePostLike = async ({ postId, userId }: Tables<"POSTLIKES", "Insert">) => {
  const { error } = await supabase.from("POSTLIKES").update({ userId }).eq("postId", postId).select();

  if (error !== null) {
    console.error(error);
  }
};
