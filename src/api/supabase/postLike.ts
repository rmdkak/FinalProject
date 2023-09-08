import { type Tables } from "types/supabase";

import { supabase } from "./supabaseClient";

const TABLE = "POSTLIKES";

interface ChangeLikes {
  id: string;
  likeState: "delete" | "add";
  bookmark: number;
}

// get
export const fetchPostLike = async (postId: string) => {
  const { data, error } = await supabase.from(TABLE).select().eq("postId", postId).limit(1).single();

  if (error !== null) {
    console.error("error :", error);
    return;
  }

  return data;
};

// patch
export const changePostLike = async ({ postId, userId }: Tables<"POSTLIKES", "Insert">) => {
  const { error } = await supabase.from(TABLE).update({ userId }).eq("postId", postId).select();

  if (error !== null) {
    console.error(error);
  }
};

export const wholeChangePostLike = async ({ id, likeState, bookmark }: ChangeLikes) => {
  const newLikes = likeState === "delete" ? bookmark - 1 : bookmark + 1;
  await supabase.from("POSTS").update({ bookmark: newLikes }).eq("id", id);
};
