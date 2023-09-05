import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import arrowIcon from "assets/svgs/arrowIcon.svg";
import { DateConvertor } from "components/common";
import { type Tables } from "types/supabase";

import { dateStyle, linkStyle } from "./preview.style";
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
    <ul className="flex-column h-[255px]">
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
                        {isOpenComment === comment.id ? (
                          <img
                            className="rotate-180"
                            src={arrowIcon}
                            onClick={() => {
                              openCommentHandler("");
                            }}
                          />
                        ) : (
                          <img
                            src={arrowIcon}
                            onClick={() => {
                              openCommentHandler(comment.id);
                            }}
                          />
                        )}
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
                      <button className="w-[80px] h-[32px] border border-gray05 text-gray05 rounded-[8px] hover:border-black hover:text-black">
                        수정
                      </button>
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
