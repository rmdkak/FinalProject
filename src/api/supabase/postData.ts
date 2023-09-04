import { type Tables } from "types/supabase";

import { supabase } from "./supabaseClient";

// get
export const fetchDetailData = async (postId: string) => {
  const { data, error } = await supabase.from("POSTS").select("*,POSTLIKES (*)").eq("id", postId).single();
  if (error != null) {
    console.log("error.message :", error.message);
    return;
  }
  return data;
};

// get
export const fetchPostData = async () => {
  const { data, error } = await supabase
    .from("POSTS")
    .select("*,POSTLIKES (*)")
    .order("created_at", { ascending: false });
  if (error != null) {
    console.log("error.message :", error.message);
    return;
  }
  return data;
};

// post
export const createPostHandler = async (postData: Tables<"POSTS", "Insert">) => {
  await supabase.from("POSTS").insert(postData).select();
  const { id } = postData;
  if (id === undefined) return;
  await supabase.from("POSTLIKES").insert({ postId: id, userId: [] }).select();
};

// post(D스토리지 저장)
export const savePostImageHandler = async ({ UUID, postImgFile }: { UUID: string; postImgFile: Blob }) => {
  await supabase.storage.from("Images").upload(`postImg/${UUID}`, postImgFile, {
    cacheControl: "3600",
    upsert: false,
  });
};

export const deletePostImage = async (UUID: string) => {
  await supabase.storage.from("Images").remove([`postImg/${UUID}`]);
};

// patch
export const patchPostHandler = async (patchData: Tables<"POSTS", "Update">) => {
  const { id } = patchData;
  const { error } = await supabase.from("POSTS").update(patchData).eq("id", id).select();
  if (error != null) {
    console.log("error.message :", error.message);
  }
};

// delete
export const deletePostHandler = async (postId: string) => {
  const { error } = await supabase.from("POSTS").delete().eq("id", postId);
  if (error != null) {
    console.log("error.message :", error.message);
  }
};
