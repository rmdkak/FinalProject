import { InteriorCombination } from "components/service";

import { PreviewEmpty } from "./PreviewEmpty";

import type { Tables } from "types/supabase";

interface Props {
  bookmarkData: Array<Tables<"BOOKMARKS", "Row">> | undefined;
}

export const PreviewBookmark = ({ bookmarkData }: Props) => {
  if (bookmarkData === undefined) return <PreviewEmpty />;

  return (
    <ul className="flex w-full h-20 gap-5 mt-6 contents-center sm:h-10 sm:gap-6">
      {bookmarkData.length === 0 ? <PreviewEmpty /> : null}
      {bookmarkData.map((bookmark) => {
        const { leftWallpaperId, rightWallpaperId, tileId } = bookmark;
        return (
          <InteriorCombination
            key={bookmark.id}
            type="mypage"
            interiorItemId={{ leftWallpaperId, rightWallpaperId, tileId }}
          />
        );
      })}
    </ul>
  );
};
