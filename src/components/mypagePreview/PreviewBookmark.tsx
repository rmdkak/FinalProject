import { storageUrl } from "api/supabase";
import { type Tables } from "types/supabase";

import { PreviewEmpty } from "./PreviewEmpty";

interface Props {
  bookmarkData: Array<Tables<"BOOKMARKS", "Row">> | undefined;
}

export const PreviewBookmark = ({ bookmarkData }: Pick<Props, "bookmarkData">) => {
  if (bookmarkData === undefined) return <PreviewEmpty />
  return (
    <ul className="flex h-[240px]">
      {bookmarkData.length === 0 ? <PreviewEmpty /> : null}
      {bookmarkData.map((bookmark) => {
        return (
          <li key={bookmark.id} className="flex contents-center w-[400px] gap-[16px] h-[200px] mt-[40px] mx-[20px]">
            <div className="relative">
              {/* 백그라운드 지우고 url 넣기 */}
              <img src={`공용컴포넌트`} className="w-[300px] h-[196px] rounded-[20px] bg-red-500" />
            </div>
            <div className="flex-column gap-[20px]">
              <div className="flex-column gap-[8px]">
                <p className="text-[14px] font-medium leading-[130%] text-center">벽지</p>
                {/* FIXME */}
                {/* <img
                    src={`${storageUrl}/wallpaper/${bookmark.leftWallpaperId as string}`}
                    className="w-[62px] h-[62px] rounded-[12px] bg-blue-500"
                  />
                  <img
                    src={`${storageUrl}/wallpaper/${bookmark.rightWallpaperId as string}`}
                    className="w-[62px] h-[62px] rounded-[12px] bg-blue-500"
                  /> */}
                <div className="flex">
                  <img
                    src={`${storageUrl}/wallpaper/${bookmark.leftWallpaperId}`}
                    className="w-[31px] h-[62px] rounded-l-[12px] bg-blue-500"
                  />
                  <img
                    src={`${storageUrl}/wallpaper/${bookmark.rightWallpaperId}`}
                    className="w-[31px] h-[62px] rounded-r-[12px] bg-blue-500"
                  />
                </div>
              </div>
              <div className="flex-column gap-[8px]">
                <p className="text-[14px] font-medium leading-[130%] text-center">바닥재</p>
                <img
                  src={`${storageUrl}/tile/${bookmark.tileId}`}
                  className="w-[62px] h-[62px] rounded-[12px] bg-green-500"
                />
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}