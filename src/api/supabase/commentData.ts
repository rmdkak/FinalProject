import { type Tables } from "types/supabase";

import { supabase } from "./supabaseClient";

// get(comments)
export const fetchComments = async (postId: string) => {
  const { data, error } = await supabase
    .from("COMMENTS")
    .select(`*,USERS (*),RECOMMENTS (*,USERS(*))`)
    .eq("postId", postId)
    .order("created_at", { ascending: false });
  if (error !== null) {
    console.error("errorMessage", error);
    return;
  }
  return data;
};

// post(comments)
export const createCommentsHandler = async (commentData: Tables<"COMMENTS", "Insert">) => {
  const { error } = await supabase.from("COMMENTS").insert(commentData).select();
  if (error !== null) throw new Error();
};

// post(스토리지 저장)
export const saveCommentImageHandler = async ({ id, commentImgFile }: { id: string; commentImgFile: Blob }) => {
  console.log("id :", id);
  console.log("commentImgFile :", commentImgFile);
  const { data, error } = await supabase.storage.from("Images").upload(`commentImg/${id}`, commentImgFile, {
    cacheControl: "3600",
    upsert: false,
  });
  console.log("data :", data);
  console.log("error :", error);
};
// post(스토리지 삭제)
export const deleteCommentImageHandler = async (currentImg: string) => {
  console.log("currentImg :", currentImg);
  if (currentImg !== null) currentImg.replace("/", "");
  const { data, error } = await supabase.storage.from("Images").remove([currentImg]);
  console.log("data :", data);
  console.log("error :", error);
};

// patch(comments)
export const patchCommentsHandler = async ({
  commentId,
  newComment,
  newCommentImg,
}: {
  commentId: string;
  newComment: string;
  newCommentImg: string | null;
}) => {
  const { error } = await supabase
    .from("COMMENTS")
    .update({ content: newComment, commentImg: newCommentImg })
    .eq("id", commentId)
    .select();

  if (error !== null) {
    console.error(error);
  }
};

// delete(comments)
export const deleteCommentHandler = async (commentId: string) => {
  await supabase.from("COMMENTS").delete().eq("id", commentId);
};

// post(reply)
export const createReplyHandler = async (replyData: Tables<"RECOMMENTS", "Insert">) => {
  await supabase.from("RECOMMENTS").insert(replyData).select().order("created_at", { ascending: false });
};

// patch(reply)
export const patchReplyHandler = async ({ replyId, newReply }: { replyId: string; newReply: string }) => {
  const { error } = await supabase.from("RECOMMENTS").update({ content: newReply }).eq("id", replyId).select();

  if (error !== null) {
    console.error(error);
  }
};

// delete(reply)
export const deleteReplyHandler = async (replyId: string) => {
  await supabase.from("RECOMMENTS").delete().eq("id", replyId);
};
