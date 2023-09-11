import { type ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentsData } from "api/supabase";
import { DateConvertor, MypageSubTitle, MypageTitle, EmptyData, CheckBoxIcon } from "components";
import { ArrowButton } from "components/common";
import { useMypageQuery, usePagination, useSearchBar } from "hooks";

import { MYPAGE_LAYOUT_STYLE } from "./Mypage";

export const MyComment = () => {
  const [isOpenComment, setIsOpenComment] = useState<string>();
  const [commentIdsToDelete, setCommentIdsToDelete] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const openCommentHandler = (commentId: string) => {
    setIsOpenComment(commentId);
  };

  const filteredCommentIdsHandler = (selectId: string) => {
    return commentIdsToDelete.filter((id) => id !== selectId);
  };

  const { userCommentsResponse } = useMypageQuery();
  const { data: userCommentData } = userCommentsResponse;

  const deleteUserCommentMutation = useMutation({
    mutationFn: deleteCommentsData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mypageComment"] });
    },
  });

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
      {/* 글 목록 */}
      {pageData.length === 0 ? (
        <EmptyData type="comment" />
      ) : (
        <ul className="w-full">
          {/* 항목 */}
          {pageData.map((comment, index) => {
            const { POSTS: post } = comment;
            return (
              <li key={comment.id} className="flex-column contents-center border-y border-gray06">
                {/* 포스트 */}
                <div className="flex contents-center w-full border-y border-gray06 gap-[24px] h-[72px] px-[24px]">
                  <input
                    id={comment.id}
                    type="checkbox"
                    className="hidden"
                    onChange={(event) => {
                      onChange(event, comment.id);
                    }}
                  />

                  {/* 체크 박스 */}
                  <label htmlFor={comment.id}>
                    <CheckBoxIcon isCheck={commentIdsToDelete.find((id) => id === comment.id) !== undefined} />
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
                {/* 댓글 */}
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

      {/* 버튼 박스 */}
      <div className="flex items-center justify-between w-full mt-[68px]">
        <button onClick={deleteComments} className="w-[100px] h-[48px] border border-gray05 rounded-[8px]">
          선택삭제
        </button>
        <SearchBar />
      </div>
      {/* 페이지네이션 */}
      <div className="mt-[120px]">{showPageComponent}</div>
    </div>
  );
};
