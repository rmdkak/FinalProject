import { type Tables } from "types/supabase";

import { supabase } from "./supabaseClient";

type BookmarkType = Tables<"BOOKMARKS", "Insert">;
const TABLE = "BOOKMARKS";

// get
export const fetchBookmark = async (bookmark: BookmarkType) => {
  const { userId, tileId, leftWallpaperId, rightWallpaperId, leftColorCode, rightColorCode } = bookmark;
  if (userId === null) return;
  if (leftWallpaperId !== null && rightWallpaperId !== null) {
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
  } else if (leftColorCode !== null && rightColorCode !== null) {
    const { data, error } = await supabase
      .from(TABLE)
      .select()
      .eq("tileId", tileId)
      .eq("leftColorCode", leftColorCode)
      .eq("rightColorCode", rightColorCode)
      .eq("userId", userId);
    if (error !== null) {
      console.error("error :", error);
      return;
    }
    return data;
  }
};

// post
export const addBookmark = async (bookmark: BookmarkType) => {
  const { userId } = bookmark;
  if (userId === null) return;
  await supabase.from(TABLE).insert(bookmark).select();
};

// delete
export const deleteBookmark = async (bookmark: BookmarkType) => {
  const { userId, tileId, leftWallpaperId, rightWallpaperId, leftColorCode, rightColorCode } = bookmark;
  if (userId === null) return;
  if (leftWallpaperId !== null && rightWallpaperId !== null) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq("tileId", tileId)
      .eq("leftWallpaperId", leftWallpaperId)
      .eq("rightWallpaperId", rightWallpaperId)
      .eq("userId", userId);
    if (error !== null) {
      console.error("error :", error);
    }
  } else if (leftColorCode !== null && rightColorCode !== null) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq("tileId", tileId)
      .eq("leftColorCode", leftColorCode)
      .eq("rightColorCode", rightColorCode)
      .eq("userId", userId);
    if (error !== null) {
      console.error("error :", error);
    }
  }
};
