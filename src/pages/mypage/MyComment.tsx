import { type ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

import { DateConvertor, EmptyData, CheckBoxIcon } from "components";
import { ArrowButton, SubTitle, Title } from "components/common";
import { useMypageQuery } from "hooks/useMypageQuery";
import { usePagination } from "hooks/usePagination";
import { useSearchBar } from "hooks/useSearchBar";

import { MYPAGE_LAYOUT_STYLE } from "./Mypage";

export const MyComment = () => {
  const [isOpenComment, setIsOpenComment] = useState<string>();
  const [commentIdsToDelete, setCommentIdsToDelete] = useState<string[]>([]);

  const openCommentHandler = (commentId: string) => {
    setIsOpenComment(commentId);
  };

  const filteredCommentIdsHandler = (selectId: string) => {
    return commentIdsToDelete.filter((id) => id !== selectId);
  };

  const { userCommentsResponse, deleteUserCommentMutation } = useMypageQuery();
  const { data: userCommentData } = userCommentsResponse;

  const deleteComments = () => {
    deleteUserCommentMutation.mutate(commentIdsToDelete);
  };

  const onChangeCheckHandler = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const filteredCommentIds = filteredCommentIdsHandler(id);
    if (event.target.checked) {
      setCommentIdsToDelete([...commentIdsToDelete, id]);
      return;
    }
    if (!event.target.checked) {
      setCommentIdsToDelete(filteredCommentIds);
    }
  };

  const { SearchBar, filteredData } = useSearchBar({ dataList: userCommentData, type: "comment", isUseMypage: true });

  const { pageData, showPageComponent } = usePagination({
    data: filteredData,
    dataLength: filteredData === undefined ? 0 : filteredData.length,
    postPerPage: 8,
  });

  return (
    <div className={`${MYPAGE_LAYOUT_STYLE}`}>
      <Title title="마이페이지" isBorder={false} />
      <SubTitle type="myComment" />

      {pageData.length === 0 ? (
        <EmptyData type="myComment" />
      ) : (
        <ul className="w-full">
          {pageData.map((comment, index) => {
            const { POSTS: post } = comment;
            return (
              <li key={comment.id} className="flex-column contents-center border-y border-gray06">
                <div className="flex w-full h-16 gap-6 px-6 sm:h-auto contents-center border-y border-gray06">
                  <input
                    id={comment.id}
                    type="checkbox"
                    className="hidden"
                    onChange={(event) => {
                      onChangeCheckHandler(event, comment.id);
                    }}
                  />

                  <label htmlFor={comment.id}>
                    <CheckBoxIcon
                      type="pointColor"
                      isCheck={commentIdsToDelete.find((id) => id === comment.id) !== undefined}
                    />
                  </label>
                  <div
                    className="flex w-full h-full gap-6 cursor-pointer sm:py-4 contents-center"
                    onClick={() => {
                      isOpenComment === comment.id ? openCommentHandler("") : openCommentHandler(comment.id);
                    }}
                  >
                    <p className="flex w-[6%] h-full contents-center">{index + 1}</p>
                    <div className="flex items-center w-3/4 h-full gap-6 sm:flex-column sm:gap-2">
                      <p className="w-[87%] body-3 h-full flex items-center sm:w-full sm:justify-start">{post.title}</p>
                      <DateConvertor
                        className="w-[13%] h-full flex body-3 contents-center text-gray03 sm:w-full sm:justify-start sm:body-4"
                        datetime={post.created_at}
                        type={"dotDate"}
                      />
                    </div>

                    <div className="flex w-4 h-4 contents-center">
                      <ArrowButton
                        isOpen={isOpenComment === comment.id}
                        openHandler={openCommentHandler}
                        statusToClose={""}
                        statusToOpen={comment.id}
                        className="flex w-4 h-4 contents-center"
                      />
                    </div>
                  </div>
                </div>
                {isOpenComment === comment.id && (
                  <div className="flex items-center justify-between w-full min-h-[120px] p-6 bg-gray08">
                    <p className="flex self-start">{comment.content}</p>
                    <div className="gap-3 flex-column contents-center">
                      <Link
                        to={`/detail/${post.id as string}`}
                        className="flex w-20 h-8 rounded-lg contents-center gray-outline-button sm:hidden"
                      >
                        이동하기
                      </Link>
                      <DateConvertor
                        datetime={comment.created_at}
                        type={"dotDate"}
                        className="flex h-full contents-center body-3 text-gray03 sm:w-full sm:items-end sm:justify-end sm:body-4"
                      />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex items-center justify-between w-full mt-16 sm:flex-col sm:gap-10">
        <button onClick={deleteComments} className="w-24 h-12 rounded-lg gray-outline-button body-3 sm:w-full">
          선택삭제
        </button>
        <SearchBar />
      </div>
      <div className="mt-[120px] sm:mt-16">{showPageComponent}</div>
    </div>
  );
};
