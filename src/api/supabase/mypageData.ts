import { supabase } from "./supabaseClient";

// MyPosts Get
export const fetchMyPostsData = async (id: string) => {
  const { data, error } = await supabase.from("POSTS").select("*").eq("userId", id);
  if (error != null) {
    console.error(error.message);
    return;
  }
  return data;
};

// MyComments Get
export const fetchMyCommentsData = async (id: string) => {
  const { data, error } = await supabase.from("COMMENTS").select("*").eq("writtenId", id);
  console.log('data :', data);
  if (error != null) {
    console.error(error.message);
    return;
  }
  return data;
};

// MyBookmarks Get
export const fetchMyBookmarksData = async (id: string) => {
  const { data, error } = await supabase.from("ITEM-BOOKMARK").select("*").eq("userId", id);
  if (error != null) {
    console.error(error.message);
    return;
  }
  return data;
};