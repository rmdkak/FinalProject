import { type Tables } from "types/supabase";

import { supabase } from "./supabaseClient";

// get
export const fetchDetailData = async (postId: string) => {
  const { data } = await supabase.from("POSTS").select("*").eq("id", postId).single();
  return data;
};

// get
export const fetchPostData = async () => {
  const { data, error } = await supabase.from("POSTS").select("*").order("created_at", { ascending: false });
  if (error != null) {
    console.log("error.message :", error.message);
    return;
  }
  return data;
};

// post
export const createPostHandler = async (postData: Tables<"POSTS", "Insert">) => {
  await supabase.from("POSTS").insert(postData).select();
};

// patch
export const patchPostHandler = async (postData: Tables<"POSTS", "Update">) => {
  // 수정 로직 추가
  console.log(postData);
};

// delete
export const deletePostHandler = async (postId: string) => {
  await supabase.from("POSTS").delete().eq("id", postId);
};
