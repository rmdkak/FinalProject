import { manToManCategory } from "pages";

import { supabase } from "./supabaseClient";

import type { Tables } from "types/supabase";

// 이벤트 GET
export const fetchEventAllData = async () => {
  const { data, error } = await supabase.from("EVENT").select("*").order("created_at", { ascending: false });
  if (error !== null) {
    console.error(error.message);
    return;
  }
  return data;
};

// 이벤트 GET
export const fetchEventDetailData = async (id: string) => {
  const { data, error } = await supabase.from("EVENT").select("*,USERS (*)").eq("id", id).single();
  if (error !== null) {
    console.error(error.message);
    return;
  }
  return data;
};

// 이벤트 post
export const addEventData = async (eventData: Tables<"EVENT", "Insert">) => {
  const { error } = await supabase.from("EVENT").insert(eventData);
  if (error !== null) {
    console.error("addEventError", error);
  }
};

// 이벤트 이미지 upload
export const uploadEventImg = async ({ UUID, eventImgFile }: { UUID: string; eventImgFile: Blob }) => {
  const { error } = await supabase.storage.from("Images").upload(`eventImg/${UUID}`, eventImgFile, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error !== null) {
    console.error("uploadEventImgError", error);
  }
};

// 이벤트 delete
export const deleteEventData = async (eventId: string) => {
  const { error } = await supabase.from("EVENT").delete().eq("id", eventId);
  if (error !== null) {
    console.error(error);
  }
};

// 문의하기 GET
export const fetchManToManData = async () => {
  const { data, error } = await supabase
    .from("MANTOMAN")
    .select("*,USERS (*)")
    .in("category", manToManCategory)
    .order("isCheck", { ascending: true });

  if (error !== null) {
    console.error(error);
    return;
  }

  return data;
};

// 문의하기 post
export const addManToManData = async (manToManData: Tables<"MANTOMAN", "Insert">) => {
  const { error } = await supabase.from("MANTOMAN").insert(manToManData);
  if (error !== null) {
    console.error("addManToManDataError", error);
  }
};

// 문의하기 이미지 upload
export const uploadManToManImg = async ({ UUID, imgFile }: { UUID: string; imgFile: Blob }) => {
  const { error } = await supabase.storage.from("Images").upload(`inquiryImg/${UUID}`, imgFile, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error !== null) {
    console.error("uploadManToManImgError", error);
  }
};

// 문의하기 patch
export const patchManToManData = async (inputValue: Tables<"MANTOMAN", "Update">) => {
  const { error } = await supabase.from("MANTOMAN").update(inputValue).eq("id", inputValue.id);
  if (error !== null) {
    console.error(error);
  }
};

// 문의하기 delete
export const deleteManToManData = async (manToManId: string) => {
  const { error } = await supabase.from("MANTOMAN").delete().eq("id", manToManId);
  if (error !== null) {
    console.error(error);
  }
};

// 신고하기 GET
export const fetchReportData = async () => {
  const { data, error } = await supabase.from("REPORT").select("*,USERS (*)");
  if (error !== null) {
    console.error(error);
    return;
  }
  return data;
};

// 신고하기 post
export const addReportData = async (inputValue: Tables<"REPORT", "Insert">) => {
  const { error } = await supabase.from("REPORT").insert(inputValue).select();
  if (error !== null) {
    console.error(error);
  }
};

// 신고하기 delete
export const deleteReport = async (reportId: string) => {
  const { error } = await supabase.from("REPORT").delete().eq("id", reportId);
  if (error !== null) {
    console.error(error);
  }
};

// 벽지타일 get
export const fetchInteriorData = async () => {
  const { data: tileData } = await supabase.from("TILE").select("*");
  const { data: wallpaperData } = await supabase.from("WALLPAPER").select("*");
  const data = { tile: tileData, wallpaper: wallpaperData };
  return data;
};

// 벽지타일 post
export const addWallpaperData = async (imgData: Tables<"WALLPAPER", "Insert">) => {
  const { error } = await supabase.from("WALLPAPER").insert(imgData).select();
  if (error !== null) {
    console.error(error);
  }
};

export const addTileData = async (imgData: Tables<"TILE", "Insert">) => {
  const { error } = await supabase.from("Tile").insert(imgData).select();
  if (error !== null) {
    console.error(error);
  }
};

// 벽지 타일 이미지 upload
export const uploadWallpaperImageHandler = async ({ UUID, postImgFile }: { UUID: string; postImgFile: Blob }) => {
  const { error } = await supabase.storage.from("Images").upload(`wallpaper/${UUID}`, postImgFile, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error !== null) {
    console.error(error);
  }
};

export const uploadTileImageHandler = async ({ UUID, postImgFile }: { UUID: string; postImgFile: Blob }) => {
  const { error } = await supabase.storage.from("Images").upload(`tile/${UUID}`, postImgFile, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error !== null) {
    console.error(error);
  }
};

// 벽지 delete
export const deleteTileData = async (tileId: string) => {
  const { error } = await supabase.from("TILE").delete().eq("id", tileId);
  if (error !== null) {
    console.error(error);
  }
};

export const deleteWallpaperData = async (wallpaperId: string) => {
  const { error } = await supabase.from("WALLPAPER").delete().eq("id", wallpaperId);
  if (error !== null) {
    console.error(error);
  }
};
