import { supabase } from "./supabaseClient";

// MyPosts Get
export const fetchMyPostsData = async (id: string) => {
  const { data, error } = await supabase.from("POSTS").select("*").eq("userId", id);
  if (error !== null) {
    console.error(error.message);
    return;
  }
  return data;
};

// MyPosts Delete
export const deletePostsData = async (postIdsToDelete: string[]) => {
  await supabase.from("POSTS").delete().in("id", postIdsToDelete);
};

// MyPosts filter Get
export const filteredMyPostsData = async (id: string) => {
  const { data, error } = await supabase
    .from("POSTS")
    .select("*")
    .eq("userId", id)
    .order("created_at", { ascending: false })
    .limit(2);

  if (error !== null) {
    console.error(error.message);
    return;
  }

  return data;
};

// MyComments Get
export const fetchMyCommentsData = async (id: string) => {
  const { data, error } = await supabase.from("COMMENTS").select(`*,POSTS (*)`).eq("userId", id);
  if (error !== null) {
    console.error(error.message);
    return;
  }
  return data;
};

// MyComments Delete
export const deleteCommentsData = async (postIdsToDelete: string[]) => {
  await supabase.from("COMMENTS").delete().in("id", postIdsToDelete);
};

// MyComments filter Get
export const filteredMyCommentsData = async (id: string) => {
  const { data, error } = await supabase
    .from("COMMENTS")
    .select(`*,POSTS (*)`)
    .eq("userId", id)
    .order("created_at", { ascending: false })
    .limit(2);

  if (error !== null) {
    console.error(error.message);
    return;
  }

  return data;
};

// MyBookmarks Get
export const fetchMyBookmarksData = async (id: string) => {
  const { data, error } = await supabase.from("BOOKMARKS").select("*").eq("userId", id);
  if (error !== null) {
    console.error(error.message);
    return;
  }
  return data;
};

// my bookmark select Delete
export const deleteBookmarksData = async (postIdsToDelete: string[]) => {
  await supabase.from("BOOKMARKS").delete().in("id", postIdsToDelete);
};

// MyBookmarks filter Get
export const filteredMyBookmarksData = async (id: string) => {
  const { data, error } = await supabase
    .from("BOOKMARKS")
    .select("*")
    .eq("userId", id)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error !== null) {
    console.error(error.message);
    return;
  }

  return data;
};

// MyLikes Get
export const fetchMyLikesData = async (id: string) => {
  const { data, error } = await supabase.from("POSTLIKES").select(`*,POSTS (*)`).contains("userId", [id]);
  if (error !== null) {
    console.error(error.message);
    return;
  }
  return data;
};

// my like Delete
export const deleteLikesData = async (postIdsToDelete: string[]) => {
  await supabase.from("POSTLIKES").delete().in("id", postIdsToDelete);
};

// MyLikes filter Get
export const filteredMyLikesData = async (id: string) => {
  const { data, error } = await supabase
    .from("POSTLIKES")
    .select(`*,POSTS (*)`)
    .contains("userId", [id])
    .order("created_at", { ascending: false })
    .limit(5);

  if (error !== null) {
    console.error(error.message);
    return;
  }

  return data;
};
// MyInquiry filter Get
export const fetchMyInquiry = async (userId: string) => {
  const { data, error } = await supabase.from("MANTOMAN").select("*").eq("userId", userId);
  if (error !== null) {
    console.error("error :", error);
    return;
  }
  return data;
};

// MyInquiry Get
export const filteredMyInquiryData = async (id: string) => {
  const { data, error } = await supabase
    .from("MANTOMAN")
    .select("*")
    .eq("userId", id)
    .order("created_at", { ascending: false })
    .limit(2);

  if (error !== null) {
    console.error(error.message);
    return;
  }
  return data;
};

// MyInquiry Delete
export const deleteInquiryData = async (inquiryIdsToDelete: string[]) => {
  await supabase.from("MANTOMAN").delete().in("id", inquiryIdsToDelete);
};
