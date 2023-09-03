import { storageUrl } from "api/supabase";
import { type Tables } from "types/supabase";

import { PreviewEmpty } from "./PreviewEmpty";

interface Props {
  bookmarkData: Array<Tables<"BOOKMARKS", "Row">> | undefined;
}

export const PreviewBookmark = ({ bookmarkData }: Props) => {
  if (bookmarkData === undefined) return <PreviewEmpty />;
  return (
    <ul className="flex h-[240px]">
      {bookmarkData.length === 0 ? <PreviewEmpty /> : null}
      {bookmarkData.map((bookmark) => {
        return (
          <li
            key={bookmark.id}
            className="relative flex contents-center w-[400px] gap-[16px] h-[200px] mt-[40px] mx-[20px]"
          >
            <img
              src={`${storageUrl}/wallpaper/${bookmark.leftWallpaperId}`}
              className={`absolute translate-x-[-40%] translate-y-[-30%] w-[96px] border-[4px] border-white h-[96px] rounded-full bg-blue-500`}
            />
            <img
              src={`${storageUrl}/wallpaper/${bookmark.rightWallpaperId}`}
              className={`absolute translate-x-[40%] translate-y-[-30%] w-[96px] border-[4px] border-white h-[96px] rounded-full bg-blue-500`}
            />
            <img
              src={`${storageUrl}/tile/${bookmark.tileId}`}
              className={`absolute translate-y-[30%] w-[96px] border-[4px] border-white h-[96px] rounded-full bg-green-500`}
            />
          </li>
        );
      })}
    </ul>
  );
};
