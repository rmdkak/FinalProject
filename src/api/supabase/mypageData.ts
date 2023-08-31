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

// MyPosts Delete
export const deletePostsData = async (postIdsToDelete: string[]) => {
  await supabase.from("POSTS").delete().in("id", postIdsToDelete);
};

// MyComments Get
export const fetchMyCommentsData = async (id: string) => {
  const { data, error } = await supabase.from("COMMENTS").select("*").eq("writtenId", id);
  if (error != null) {
    console.error(error.message);
    return;
  }
  return data;
};

// MyPosts Delete
export const deleteCommentsData = async (postIdsToDelete: string[]) => {
  await supabase.from("COMMENTS").delete().in("id", postIdsToDelete);
};

// MyBookmarks Get
export const fetchMyBookmarksData = async (id: string) => {
  const { data, error } = await supabase.from("BOOKMARKS").select("*").eq("userId", id);
  if (error != null) {
    console.error(error.message);
    return;
  }
  return data;
};

// my bookmark Delete
export const deleteBookmarksData = async (postIdsToDelete: string[]) => {
  await supabase.from("BOOKMARKS").delete().in("id", postIdsToDelete);
};

// MyLikes Get
export const fetchMyLikesData = async (id: string) => {
  const { data, error } = await supabase.from("POSTLIKES").select("*").eq("userId", id);
  if (error != null) {
    console.error(error.message);
    return;
  }
  return data;
};

// my like Delete
export const deleteLikesData = async (postIdsToDelete: string[]) => {
  await supabase.from("POSTLIKES").delete().in("id", postIdsToDelete);
};
