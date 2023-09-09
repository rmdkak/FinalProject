import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { ArrowButton, DateConvertor } from "components/common";
import { type Tables } from "types/supabase";

import { dateStyle, linkStyle, OUTER_BOX_STYLE } from "./preview.style";
import { PreviewEmpty } from "./PreviewEmpty";

interface Props {
  commentData: Array<Tables<"COMMENTS", "Row"> & { POSTS: Tables<"POSTS", "Row"> | null }> | undefined;
}

export const PreviewComment = ({ commentData }: Props) => {
  if (commentData === undefined) return <PreviewEmpty />;
  const [isOpenComment, setIsOpenComment] = useState<string>();
  const openCommentHandler = (commentId: string) => {
    setIsOpenComment(commentId);
  };
  return (
    <ul className={OUTER_BOX_STYLE}>
      {commentData.length === 0 ? <PreviewEmpty /> : null}
      {commentData.map((comment) => {
        const { POSTS: post } = comment;
        return (
          <Fragment key={comment.id}>
            {post !== null && (
              <li key={comment.id} className="flex-column contents-center border-y border-gray06">
                {/* 포스트 */}
                <div className="flex contents-center w-full border-y border-gray06 gap-[24px] h-[64px] px-[24px]">
                  {/* 체크 박스 */}
                  <div
                    className="flex items-center justify-between gap-[24px] w-full h-full cursor-pointer"
                    onClick={() => {
                      isOpenComment === comment.id ? openCommentHandler("") : openCommentHandler(comment.id);
                    }}
                  >
                    <Link to={`/detail/${post.id}`} className={linkStyle}>
                      {post.title}
                    </Link>
                    <div className="flex">
                      <DateConvertor datetime={post.created_at} type={"dotDate"} className={dateStyle} />
                      <button className="flex contents-center w-[16px] h-[16px] ml-[12px]">
                        <ArrowButton
                          isOpen={isOpenComment === comment.id}
                          openHandler={openCommentHandler}
                          statusToClose={""}
                          statusToOpen={comment.id}
                          className={"flex w-4 h-4 contents-center"}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                {/* 댓글 */}
                {isOpenComment === comment.id && (
                  <div className="flex items-center justify-between w-full h-[120px] p-[24px]">
                    <p className="flex self-start">{comment.content}</p>
                    <div className="flex contents-center gap-[12px]">
                      <DateConvertor datetime={comment.created_at} type={"dotDate"} />
                      <Link
                        to={`/detail/${post.id}`}
                        className="flex contents-center w-[80px] h-8 gray-outline-button rounded-lg"
                      >
                        수정
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
};
