import { type Tables } from "types/supabase";

import { supabase } from "./supabaseClient";

type BookmarkType = Tables<"BOOKMARKS", "Insert">;
const DATA_TABLE = "BOOKMARKS";

// get
export const fetchBookmark = async (bookmark: BookmarkType) => {
  const { userId, tileId, leftWallpaperId, rightWallpaperId } = bookmark;
  if (userId === null) return;
  const { data } = await supabase
    .from(DATA_TABLE)
    .select()
    .eq("tileId", tileId)
    .eq("leftWallpaperId", leftWallpaperId)
    .eq("rightWallpaperId", rightWallpaperId)
    .eq("userId", userId);
  return data;
};

// post
export const addBookmark = async (bookmark: BookmarkType) => {
  const { userId } = bookmark;
  if (userId == null) return;
  await supabase.from(DATA_TABLE).insert(bookmark).select();
};

// delete
export const deleteBookmark = async (bookmark: BookmarkType) => {
  const { userId, tileId, leftWallpaperId, rightWallpaperId } = bookmark;
  if (userId == null) return;
  await supabase
    .from(DATA_TABLE)
    .delete()
    .eq("userId", userId)
    .eq("tileId", tileId)
    .eq("leftWallpaperId", leftWallpaperId)
    .eq("rightWallpaperId", rightWallpaperId);
};
