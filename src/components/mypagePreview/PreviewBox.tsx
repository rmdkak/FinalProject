import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import {
  filteredMyBookmarksData,
  filteredMyCommentsData,
  filteredMyInquiryData,
  filteredMyLikesData,
  filteredMyPostsData,
} from "api/supabase/mypageData";
import { ADMIN_ID } from "api/supabase/supabaseClient";
import viewMore from "assets/svgs/viewMore.svg";
import xmark from "assets/svgs/xmark.svg";
import { useDynamicImport } from "hooks/useDynamicImport";
import { type MypageInfo } from "pages/mypage/Mypage";
import { type Tables } from "types/supabase";

import { PreviewBookmark } from "./PreviewBookmark";
import { PreviewComment } from "./PreviewComment";
import { PreviewInquiry } from "./PreviewInquiry";
import { PreviewLike } from "./PreviewLike";
import { PreviewPost } from "./PreviewPost";

interface Props {
  mypageInfoArray: MypageInfo[];
  userId: string;
}

type PostData = Array<Tables<"POSTS", "Row">>;
type CommentData = Array<Tables<"COMMENTS", "Row"> & { POSTS: Tables<"POSTS", "Row"> | null }>;
type Bookmark = Array<Tables<"BOOKMARKS", "Row">>;
type Like = Array<Tables<"POSTLIKES", "Row"> & { POSTS: Tables<"POSTS", "Row"> | null }>;
type Inquiry = Array<Tables<"MANTOMAN", "Row">>;

export const PreviewBox = ({ mypageInfoArray, userId }: Props) => {
  const [filteredPost, setFilteredPost] = useState<PostData>();
  const [filteredComment, setFilteredComment] = useState<CommentData>();
  const [filteredBookmark, setFilteredBookmark] = useState<Bookmark>();
  const [filteredLike, setFilteredLike] = useState<Like>();
  const [filteredInquiry, setFilteredInquiry] = useState<Inquiry>();
  const { preFetchPageBeforeEnter } = useDynamicImport();

  const isAdmin = userId === ADMIN_ID;

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const fetchFilteredPost = await filteredMyPostsData(userId);
        setFilteredPost(fetchFilteredPost);
        const fetchFilteredComment = await filteredMyCommentsData(userId);
        setFilteredComment(fetchFilteredComment);
        const fetchFilteredBookmark = await filteredMyBookmarksData(userId);
        setFilteredBookmark(fetchFilteredBookmark);
        const fetchFilteredLike = await filteredMyLikesData(userId);
        setFilteredLike(fetchFilteredLike);
        const fetchFilteredInquiry = await filteredMyInquiryData(userId);
        setFilteredInquiry(fetchFilteredInquiry);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchMyData();
  }, [filteredMyPostsData, filteredMyCommentsData, filteredMyBookmarksData, filteredMyLikesData]);

  return (
    <div className="w-full flex-column">
      {mypageInfoArray.map((mypageInfo) => {
        return (
          <Fragment key={mypageInfo.title}>
            {isAdmin && mypageInfo.title === "문의&신고" ? (
              <></>
            ) : (
              <div className="flex-column">
                <div className="flex items-center justify-between pb-6 mt-20 border-b border-black sm:mt-12">
                  <p className="body-1">{mypageInfo.title}</p>
                  <Link
                    to={mypageInfo.link}
                    className="flex gap-3 contents-center body-4 text-gray02 sm:hidden"
                    onMouseEnter={async () => {
                      await preFetchPageBeforeEnter(mypageInfo.link);
                    }}
                  >
                    VIEW MORE
                    <img src={viewMore} className="w-6 h-6" />
                  </Link>
                  <Link
                    to={mypageInfo.link}
                    className="hidden gap-3 sm:flex contents-center body-4 text-gray02"
                    onMouseEnter={async () => {
                      await preFetchPageBeforeEnter(mypageInfo.link);
                    }}
                  >
                    <img src={xmark} className="w-6 h-6 rotate-45" />
                  </Link>
                </div>
                {mypageInfo.title === "내가 쓴 글" && <PreviewPost postData={filteredPost} />}
                {mypageInfo.title === "내가 쓴 댓글" && <PreviewComment commentData={filteredComment} />}
                {mypageInfo.title === "북마크" && <PreviewBookmark bookmarkData={filteredBookmark} />}
                {mypageInfo.title === "좋아요" && <PreviewLike likeData={filteredLike} />}
                {mypageInfo.title === "문의&신고" && <PreviewInquiry inquiryData={filteredInquiry} />}
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
