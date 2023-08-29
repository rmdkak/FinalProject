import { type Tables } from "types/supabase";

import { supabase } from "./supabaseClient";

// get(comments)
export const fetchComments = async (paramsId: string) => {
  const { data } = await supabase.from("COMMENTS").select(`*,USERS (*),RECOMMENTS (*)`).eq("postId",paramsId);
  console.log('data :', data);
  // const { data:data2 } = await supabase.from("COMMENTS").select(`*,RECOMMENTS (*)`).eq("id","4a34f31a-68ab-9750-e895-296ab68d353f");
  // console.log('data2 :', data2);
  // console.log('data3 :', {...data2,...data});
  return data;
};

// post(comments)
export const createCommentsHandler = async (commentData: Tables<"COMMENTS", "Insert">) => {
  await supabase.from("COMMENTS").insert(commentData).select();
};

// get(reply)
export const fetchReplyData = async (commentId: string) => {
  const { data } = await supabase.from("RECOMMENTS").select(`*,USERS (*)`).eq("commentId",commentId);
  console.log('data :', data);
  return data;
};

// post(reply)
export const createReplyHandler = async (replyData: Tables<"RECOMMENTS", "Insert">) => {
  await supabase.from("RECOMMENTS").insert(replyData).select();
};
