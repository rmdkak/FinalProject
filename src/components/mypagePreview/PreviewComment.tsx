import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { ArrowButton, DateConvertor } from "components/common";
import { useDynamicImport } from "hooks/useDynamicImport";
import { type Tables } from "types/supabase";

import { dateStyle, linkStyle, OUTER_BOX_STYLE } from "./preview.style";
import { PreviewEmpty } from "./PreviewEmpty";

interface Props {
  commentData: Array<Tables<"COMMENTS", "Row"> & { POSTS: Tables<"POSTS", "Row"> | null }> | undefined;
}

export const PreviewComment = ({ commentData }: Props) => {
  if (commentData === undefined) return <PreviewEmpty />;

  const [isOpenComment, setIsOpenComment] = useState<string>();
  const { preFetchPageBeforeEnter } = useDynamicImport();

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
                <div className="flex w-full h-16 gap-6 px-6 contents-center border-y border-gray06">
                  <div
                    className="flex items-center justify-between w-full h-full gap-6 cursor-pointer"
                    onClick={() => {
                      isOpenComment === comment.id ? openCommentHandler("") : openCommentHandler(comment.id);
                    }}
                  >
                    <Link
                      to={`/detail/${post.id}`}
                      className={linkStyle}
                      onMouseEnter={async () => {
                        await preFetchPageBeforeEnter("detail");
                      }}
                    >
                      {post.title}
                    </Link>
                    <div className="flex">
                      <DateConvertor datetime={post.created_at} type={"dotDate"} className={dateStyle} />
                      <div className="flex w-4 h-4 ml-4 contents-center">
                        <ArrowButton
                          isOpen={isOpenComment === comment.id}
                          openHandler={openCommentHandler}
                          statusToClose={""}
                          statusToOpen={comment.id}
                          className={"flex w-4 h-4 contents-center"}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {isOpenComment === comment.id && (
                  <div className="flex items-center justify-between w-full h-[120px] p-6">
                    <p className="flex self-start">{comment.content}</p>
                    <div className="flex gap-3 contents-center">
                      <DateConvertor datetime={comment.created_at} type={"dotDate"} />
                      <Link
                        to={`/detail/${post.id}`}
                        className="flex w-20 h-8 rounded-lg contents-center gray-outline-button"
                      >
                        이동하기
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
