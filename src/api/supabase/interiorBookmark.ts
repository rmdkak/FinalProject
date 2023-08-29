import { type Tables } from "types/supabase";

import { supabase } from "./supabaseClient";

const DATA_TABLE = "ITEM-BOOKMARK";
// get
export const fetchItemBookmark = async ({
  userId,
  tileId,
  leftWallpaperId,
  rightWallpaperId,
}: Tables<"ITEM-BOOKMARK", "Insert">) => {
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
export const onInteriorBookmarkPostHandler = async ({
  userId,
  tileId,
  leftWallpaperId,
  rightWallpaperId,
}: Tables<"ITEM-BOOKMARK", "Insert">) => {
  if (userId == null) return;
  await supabase.from(DATA_TABLE).insert({ userId, tileId, leftWallpaperId, rightWallpaperId }).select();
};

// delete
export const onInteriorBookmarkDeleteHandler = async ({
  userId,
  tileId,
  leftWallpaperId,
  rightWallpaperId,
}: Tables<"ITEM-BOOKMARK", "Insert">) => {
  if (userId == null) return;
  await supabase
    .from(DATA_TABLE)
    .delete()
    .eq("userId", userId)
    .eq("tileId", tileId)
    .eq("leftWallpaperId", leftWallpaperId)
    .eq("rightWallpaperId", rightWallpaperId);
};
