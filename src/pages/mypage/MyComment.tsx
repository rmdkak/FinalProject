import { type ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

import { DateConvertor, MypageSubTitle, MypageTitle, EmptyData, CheckBoxIcon } from "components";
import { ArrowButton } from "components/common";
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

  // 선택 된 아이디 배열 삭제
  const deleteComments = () => {
    deleteUserCommentMutation.mutate(commentIdsToDelete);
  };

  // 체크 상태 변경
  const onChange = (event: ChangeEvent<HTMLInputElement>, id: string) => {
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
      <MypageTitle title="마이페이지" isBorder={false} />
      <MypageSubTitle type="comment" />

      {pageData.length === 0 ? (
        <EmptyData type="comment" />
      ) : (
        <ul className="w-full">
          {pageData.map((comment, index) => {
            const { POSTS: post } = comment;
            return (
              <li key={comment.id} className="flex-column contents-center border-y border-gray06">
                <div className="flex contents-center w-full border-y border-gray06 gap-[24px] h-[72px] px-[24px]">
                  <input
                    id={comment.id}
                    type="checkbox"
                    className="hidden"
                    onChange={(event) => {
                      onChange(event, comment.id);
                    }}
                  />

                  <label htmlFor={comment.id}>
                    <CheckBoxIcon
                      type="pointColor"
                      isCheck={commentIdsToDelete.find((id) => id === comment.id) !== undefined}
                    />
                  </label>
                  <div
                    className="flex contents-center gap-[24px] w-full h-full cursor-pointer"
                    onClick={() => {
                      isOpenComment === comment.id ? openCommentHandler("") : openCommentHandler(comment.id);
                    }}
                  >
                    <p className="flex contents-center w-20 p-[10px] ">{index + 1}</p>
                    <div className="w-[1044px] flex justify-between">
                      <p className="body-3">{post.title}</p>
                      <DateConvertor datetime={post.created_at} type={"dotDate"} className="body-3" />
                    </div>

                    <div className="flex w-4 h-4 contents-center">
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
                {isOpenComment === comment.id && (
                  <div className="flex items-center justify-between w-full h-[120px] p-[24px]">
                    <p className="flex self-start">{comment.content}</p>
                    <div className="flex contents-center gap-[12px]">
                      <DateConvertor datetime={comment.created_at} type={"dotDate"} />
                      <Link
                        to={`/detail/${post.id as string}`}
                        className="flex contents-center w-[80px] h-8 gray-outline-button rounded-lg"
                      >
                        수정
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex items-center justify-between w-full mt-16 sm:flex-col sm:gap-10">
        <button onClick={deleteComments} className="w-[100px] h-12 gray-outline-button rounded-lg body-3 sm:w-full">
          선택삭제
        </button>
        <SearchBar />
      </div>
      <div className="mt-[120px] sm:mt-16">{showPageComponent}</div>
    </div>
  );
};
