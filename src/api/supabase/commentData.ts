import { type Tables } from "types/supabase";

import { supabase } from "./supabaseClient";

// get(comments)
export const fetchComments = async (postId: string) => {
  const { data, error } = await supabase
    .from("COMMENTS")
    .select(`*,USERS (*),RECOMMENTS (*,USERS(*))`)
    .eq("postId", postId);
  if (error !== null) {
    console.log("errorMessage", error);
    return;
  }
  return data;
};

// post(comments)
export const createCommentsHandler = async (commentData: Tables<"COMMENTS", "Insert">) => {
  await supabase.from("COMMENTS").insert(commentData).select();
};

// post(스토리지 저장)
export const saveCommentImageHandler = async ({ id, commentImgFile }: { id: string; commentImgFile: Blob }) => {
  await supabase.storage.from("Images").upload(`commentImg/${id}`, commentImgFile, {
    cacheControl: "3600",
    upsert: false,
  });
};

// patch(comments)
export const patchCommentsHandler = async (commentData: Tables<"COMMENTS", "Update">) => {
  // 수정 로직 추가
  console.log(commentData);
};

// delete(comments)
export const deleteCommentHandler = async (commentId: string) => {
  await supabase.from("COMMENTS").delete().eq("id", commentId);
};

// post(reply)
export const createReplyHandler = async (replyData: Tables<"RECOMMENTS", "Insert">) => {
  await supabase.from("RECOMMENTS").insert(replyData).select();
};

// patch(reply)
export const patchReplyHandler = async (replyData: Tables<"RECOMMENTS", "Update">) => {
  // 수정 로직 추가
  console.log(replyData);
};

// delete(reply)
export const deleteReplyHandler = async (replyId: string) => {
  await supabase.from("RECOMMENTS").delete().eq("id", replyId);
};
