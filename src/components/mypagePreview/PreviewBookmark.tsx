import { STORAGE_URL } from "api/supabase";
import { type Tables } from "types/supabase";

import { PreviewEmpty } from "./PreviewEmpty";

interface Props {
  bookmarkData: Array<Tables<"BOOKMARKS", "Row">> | undefined;
}

export const PreviewBookmark = ({ bookmarkData }: Props) => {
  if (bookmarkData === undefined) return <PreviewEmpty />;
  return (
    <ul className="flex h-60">
      {bookmarkData.length === 0 ? <PreviewEmpty /> : null}
      {bookmarkData.map((bookmark) => {
        return (
          <li key={bookmark.id} className="relative flex contents-center w-[400px] gap-4 h-[200px] mt-10 mx-5">
            <img
              src={`${STORAGE_URL}/wallpaper/${bookmark.leftWallpaperId}`}
              alt="왼쪽 벽지"
              className="absolute translate-x-[-40%] translate-y-[-30%] w-24 border-4 h-24 rounded-full border-white"
            />
            <img
              src={`${STORAGE_URL}/wallpaper/${bookmark.rightWallpaperId}`}
              alt="오른쪽 벽지"
              className="absolute translate-x-[40%] translate-y-[-30%] w-24 border-4 h-24 rounded-full border-white"
            />
            <img
              src={`${STORAGE_URL}/tile/${bookmark.tileId}`}
              alt="타일"
              className="absolute translate-y-[30%] w-24 border-4 h-24 rounded-full border-white"
            />
          </li>
        );
      })}
    </ul>
  );
};
