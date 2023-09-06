// import { type IconType } from "react-icons/lib";
import { Link } from "react-router-dom";

import viewMore from "assets/svgs/viewMore.svg";
import { type Tables } from "types/supabase";

import { PreviewBookmark } from "./PreviewBookmark";
import { PreviewComment } from "./PreviewComment";
import { PreviewLike } from "./PreviewLike";
import { PreviewPost } from "./PreviewPost";

interface Props {
  mypageInfoArray: MypageInfo[];
  filteredData: FilteredData;
}

interface MypageInfo {
  title: string;
  link: string;
  icon: JSX.Element;
  data: any[] | undefined;
}

interface FilteredData {
  filteredPosts: Array<Tables<"POSTS", "Row">> | undefined;
  filteredComment: Array<Tables<"COMMENTS", "Row"> & { POSTS: Tables<"POSTS", "Row"> | null }> | undefined;
  filteredBookmark: Array<Tables<"BOOKMARKS", "Row">> | undefined;
  filteredLikes: Array<Tables<"POSTLIKES", "Row"> & { POSTS: Tables<"POSTS", "Row"> | null }> | undefined;
}

export const PreviewBox = ({ mypageInfoArray, filteredData }: Props) => {
  const { filteredPosts, filteredComment, filteredBookmark, filteredLikes } = filteredData;
  return (
    <div className="flex-column w-[1280px]">
      {mypageInfoArray.map((mypageInfo) => {
        return (
          <div key={mypageInfo.title} className="flex-column">
            <div className="flex items-center justify-between border-b border-black pb-[24px] mt-[80px]">
              <p className="text-[18px] font-normal leading-[150%]">{mypageInfo.title}</p>
              <Link to={mypageInfo.link} className="flex contents-center gap-[12px] body-4 text-gray02">
                VIEW MORE
                <img src={viewMore} className="w-[24px] h-[24px]" />
              </Link>
            </div>
            {mypageInfo.title === "내가 쓴 글" && <PreviewPost postData={filteredPosts} />}
            {mypageInfo.title === "내가 쓴 댓글" && <PreviewComment commentData={filteredComment} />}
            {mypageInfo.title === "북마크" && <PreviewBookmark bookmarkData={filteredBookmark} />}
            {mypageInfo.title === "좋아요" && <PreviewLike likeData={filteredLikes} />}
          </div>
        );
      })}
    </div>
  );
};
