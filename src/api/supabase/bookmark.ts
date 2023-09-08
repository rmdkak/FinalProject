import { type Tables } from "types/supabase";

import { supabase } from "./supabaseClient";

type BookmarkType = Tables<"BOOKMARKS", "Insert">;
const TABLE = "BOOKMARKS";

// get
export const fetchBookmark = async (bookmark: BookmarkType) => {
  const { userId, tileId, leftWallpaperId, rightWallpaperId } = bookmark;
  if (userId === null) return;
  const { data, error } = await supabase
    .from(TABLE)
    .select()
    .eq("tileId", tileId)
    .eq("leftWallpaperId", leftWallpaperId)
    .eq("rightWallpaperId", rightWallpaperId)
    .eq("userId", userId);
  if (error !== null) {
    console.error("error :", error);
    return;
  }
  return data;
};

// post
export const addBookmark = async (bookmark: BookmarkType) => {
  const { userId } = bookmark;
  if (userId == null) return;
  await supabase.from(TABLE).insert(bookmark).select();
};

// delete
export const deleteBookmark = async (bookmark: BookmarkType) => {
  const { userId, tileId, leftWallpaperId, rightWallpaperId } = bookmark;
  if (userId == null) return;
  await supabase
    .from(TABLE)
    .delete()
    .eq("userId", userId)
    .eq("tileId", tileId)
    .eq("leftWallpaperId", leftWallpaperId)
    .eq("rightWallpaperId", rightWallpaperId);
};
