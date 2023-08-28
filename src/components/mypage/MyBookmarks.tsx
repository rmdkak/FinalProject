import { RxBookmark } from "react-icons/rx";
import { Link } from "react-router-dom";

import { type Tables } from "types/supabase";

import { BUTTON_STYLE } from "./MyInfo";

interface Props {
  userMyBookmarkData: Array<Tables<"ITEM-BOOKMARK", "Row">>;
}

export const MyBookmarks = ({ userMyBookmarkData }: Props) => {
  if (userMyBookmarkData === undefined || userMyBookmarkData.length === 0) {
    return (
      <div className="border-b border-[#dddddd] py-5 my-5">
        <div>
          <p className="flex gap-1 text-lg font-medium truncate w-[500px]">
            현재 <RxBookmark className="self-center text-center" /> 인테리어 북마크가 없습니다.
          </p>
          <p className="mt-1 h-[50px] w-[800px] overflow-hidden">새로운 북마크를 만들어보세요.</p>
          <Link to="/service" className={BUTTON_STYLE}>
            임시_서비스 페이지로 이동
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      {userMyBookmarkData.map(() => {
        return <></>;
      })}
    </>
  );
};
