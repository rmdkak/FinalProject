import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import {
  ADMIN_ID,
  filteredMyBookmarksData,
  filteredMyCommentsData,
  filteredMyInquiryData,
  filteredMyLikesData,
  filteredMyPostsData,
} from "api/supabase";
import viewMore from "assets/svgs/viewMore.svg";
import { type MypageInfo } from "pages";
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
    <div className="flex-column w-[1280px]">
      {mypageInfoArray.map((mypageInfo) => {
        return (
          <Fragment key={mypageInfo.title}>
            {isAdmin && mypageInfo.title === "문의&신고" ? (
              <></>
            ) : (
              <div className="flex-column">
                <div className="flex items-center justify-between border-b border-black pb-[24px] mt-[80px]">
                  <p className="text-[18px] font-normal leading-[150%]">{mypageInfo.title}</p>
                  <Link to={mypageInfo.link} className="flex contents-center gap-[12px] body-4 text-gray02">
                    VIEW MORE
                    <img src={viewMore} className="w-[24px] h-[24px]" />
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
