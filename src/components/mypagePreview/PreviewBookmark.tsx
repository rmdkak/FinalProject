import { STORAGE_URL } from "api/supabase/supabaseClient";
import { type Tables } from "types/supabase";

import { PreviewEmpty } from "./PreviewEmpty";

interface Props {
  bookmarkData: Array<Tables<"BOOKMARKS", "Row">> | undefined;
}

export const PreviewBookmark = ({ bookmarkData }: Props) => {
  if (bookmarkData === undefined) return <PreviewEmpty />;
  return (
    <ul className="flex w-full h-20 gap-5 mt-6 contents-center sm:h-10 sm:gap-6">
      {bookmarkData.length === 0 ? <PreviewEmpty /> : null}
      {bookmarkData.map((bookmark) => {
        return (
          <li key={bookmark.id} className="relative flex h-20 w-60 gap-11 contents-center sm:mt-4">
            <img
              src={`${STORAGE_URL}/wallpaper/${bookmark.leftWallpaperId}`}
              alt="왼쪽 벽지"
              className="absolute w-20 h-20 border-2 border-white rounded-full -translate-x-3/4 sm:-translate-x-2/3 sm:w-8 sm:h-8"
            />
            <img
              src={`${STORAGE_URL}/wallpaper/${bookmark.rightWallpaperId}`}
              alt="오른쪽 벽지"
              className="absolute w-20 h-20 border-2 border-white rounded-full sm:h-8 sm:w-8"
            />
            <img
              src={`${STORAGE_URL}/tile/${bookmark.tileId}`}
              alt="타일"
              className="absolute w-20 h-20 border-2 border-white rounded-full translate-x-3/4 sm:translate-x-2/3 sm:w-8 sm:h-8"
            />
          </li>
        );
      })}
    </ul>
  );
};
