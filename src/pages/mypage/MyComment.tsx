import { type ChangeEvent, useState } from "react";
import { FaRegSquareCheck } from "react-icons/fa6";

import arrowIcon from "assets/arrowIcon.svg";
import { DateConvertor, MypageSubTitle, MypageTitle, SearchBar, EmptyData } from "components";
import { useMypage, usePagination } from "hooks";

export const MyComment = () => {
  const [isOpenComment, setIsOpenComment] = useState<string>();
  const [commentIdsToDelete, setCommentIdsToDelete] = useState<string[]>([]);

  const openCommentHandler = (commentId: string) => {
    setIsOpenComment(commentId);
  };

  const filteredCommentIdsHandler = (selectId: string) => {
    return commentIdsToDelete.filter((id) => id !== selectId);
  };

  const { userCommentsResponse, deleteUserCommentMutation } = useMypage();
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

  if (userCommentData === undefined) return <p>에러페이지</p>;

  const { pageData, showPageComponent } = usePagination({
    data: userCommentData,
    dataLength: userCommentData.length,
    postPerPage: 8,
  });

  return (
    <div className="flex-column items-center mt-[80px] w-[1280px] mx-auto">
      <MypageTitle />
      <MypageSubTitle type="comment" />
      {/* 글 목록 */}
      {userCommentData.length === 0 ? <EmptyData type="comment" /> : (
        <ul className="w-full">
          {/* 항목 */}
          {pageData.map((comment, index) => {
            const { POSTS: post } = comment
            return (
              <li key={comment.id} className="flex-column contents-center border-y border-gray06">
                {/* 포스트 */}
                <div className="flex contents-center w-full border-y border-gray06 gap-[24px] h-[64px] px-[24px]">
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
                    {commentIdsToDelete.find((id) => id === comment.id) !== undefined ? (
                      <FaRegSquareCheck className="text-black" />
                    ) : (
                      <FaRegSquareCheck className="text-gray05" />
                    )}
                  </label>
                  <div className="flex contents-center gap-[24px] w-full h-full cursor-pointer" onClick={() => {
                    isOpenComment === comment.id ? openCommentHandler("") : openCommentHandler(comment.id)
                  }}>
                    <p className="w-[80px]">{index + 1}</p>
                    <p className="w-[1040px]">{post.title}</p>
                    <DateConvertor datetime={post.created_at} type={"dotDate"} />

                    <button className="flex contents-center w-[16px] h-[16px]">
                      {isOpenComment === comment.id ? (
                        <img className="rotate-180" src={arrowIcon}
                          onClick={() => { openCommentHandler("") }}
                        />
                      ) : (
                        <img src={arrowIcon}
                          onClick={() => { openCommentHandler(comment.id) }}
                        />
                      )}
                    </button>
                  </div>
                </div>
                {/* 댓글 */}
                {isOpenComment === comment.id && (
                  <div className="flex items-center justify-between w-full h-[120px] p-[24px]">
                    <p className="flex self-start">{comment.content}</p>
                    <div className="flex contents-center gap-[12px]">
                      <DateConvertor datetime={comment.created_at} type={"dotDate"} />
                      <button className="w-[80px] h-[32px] border border-gray05 text-gray05 rounded-[8px] hover:border-black hover:text-black">수정</button>
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
