import { type Tables } from "types/supabase";

import { supabase } from "./supabaseClient";

const DATA_TABLE = "ITEM-BOOKMARK"
// get
export const fetchItemBookmark = async ({ userId, tileId, wallpaperId }: Tables<"ITEM-BOOKMARK", "Insert">) => {
  if (userId === null) return;
  const { data } = await supabase.from(DATA_TABLE).select().eq("tileId", tileId).eq("wallpaperId", wallpaperId).eq("userId", userId);
  return data;
};

// post
export const onInteriorBookmarkPostHandler = async ({ userId, tileId, wallpaperId }: Tables<"ITEM-BOOKMARK", "Insert">) => {
  if (userId == null) return;
  await supabase.from(DATA_TABLE).insert({ userId, tileId, wallpaperId }).select();
};

// delete
export const onInteriorBookmarkDeleteHandler = async ({ userId, tileId, wallpaperId }: Tables<"ITEM-BOOKMARK", "Insert">) => {
  if (userId == null) return;
  await supabase.from(DATA_TABLE).delete().eq("userId", userId).eq("tileId", tileId).eq("wallpaperId", wallpaperId);
};