import { type ChangeEvent, useState } from "react";
import { FaRegSquareCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

import arrowIcon from "assets/arrowIcon.svg";
import { DateConvertor } from "components";
import { useMypage, usePagination } from "hooks";

export const MyComment = () => {
  const [isOpenComment, setIsOpenComment] = useState<string>();
  const [commentIdsToDelete, setCommentIdsToDelete] = useState<string[]>([]);

  const openCommnetHandler = (commentId: string) => {
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

  if (userCommentData.length === 0) {
    return (
      <div className="flex-column items-center mt-[80px] w-[1280px] mx-auto">
        <div className="w-full  text-center pb-[24px]">
          <h3 className="text-[32px] font-normal leading-[130%]">마이페이지</h3>
        </div>
        <div className="w-full border-b border-b-black pb-[24px]">
          <p>내가 쓴 글</p>
        </div>
        <p className="text-[24px] my-[30px]">현재 작성된 댓글이 없습니다.</p>
        <div className="flex gap-[24px]">
          <Link to="/community" className="flex contents-center w-[130px] h-[48px] rounded-full bg-point">
            게시물 보러가기
          </Link>
          <Link to="/mypage" className="flex contents-center w-[130px] h-[48px] rounded-full bg-gray07 border">
            마이페이지
          </Link>
        </div>
      </div>
    );
  }

  // commentImg: string | null;
  // content: string;
  // created_at: string;
  // id: string;
  // postId: string;
  // writtenId: string;
  return (
    <div className="flex-column items-center mt-[80px] w-[1280px] mx-auto">
      <div className="w-full  text-center pb-[24px]">
        <h3 className="text-[32px] font-normal leading-[130%]">마이페이지</h3>
      </div>
      <div className="w-full border-b border-b-black pb-[24px]">
        <p>내가 쓴 글</p>
      </div>
      {/* 글 목록 */}
      <ul className="w-full">
        {/* 항목 */}
        {pageData.map((comment, index) => {
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
                <label htmlFor={comment.id}>
                  {commentIdsToDelete.find((id) => id === comment.id) !== undefined ? (
                    <FaRegSquareCheck className="text-black" />
                  ) : (
                    <FaRegSquareCheck className="text-gray05" />
                  )}
                </label>
                <p className="w-[80px]">{index + 1}</p>
                <p className="w-[1040px]">{comment.content}</p>
                <DateConvertor datetime={comment.created_at} type={"dotDate"} />

                <button
                  onClick={() => {
                    openCommnetHandler(comment.id);
                  }}
                  className="flex contents-center w-[16px] h-[16px]"
                >
                  {isOpenComment === comment.id ? (
                    <img src={arrowIcon} />
                  ) : (
                    <img className="rotate-180" src={arrowIcon} />
                  )}
                </button>
              </div>
              {/* 댓글 */}
              <div className="flex items-center justify-between w-full h-[120px] p-[24px]">
                <p className="flex self-start">우와 정말 식물이랑 잘어울려요!!</p>
                <button className="w-[80px] h-[32px] border border-gray05 rounded-[8px]">수정</button>
              </div>
            </li>
          );
        })}

        {/* <li className="flex-column contents-center border-y border-gray06">
          <div className="flex contents-center w-full border-y border-gray06 gap-[24px] h-[64px] px-[24px]">
            <CheckBoxIcon checkState={stayLoggedInStatus} changeCheckState={setStayLoggedInStatus} size={20} />
            <p className="w-[80px]">00</p>
            <p className="w-[1040px]">글제목글제목글제목글제목글제목글제목글제목</p>
            <p className="w-[100px]">2023.11.11</p>

            <button className="flex contents-center w-[16px] h-[16px]">
              {stayLoggedInStatus ? <img src={arrowIcon} /> : <img className="rotate-180" src={arrowIcon} />}
            </button>
          </div>
          {stayLoggedInStatus && (
            <div className="flex items-center justify-between w-full h-[120px] p-[24px]">
              <p className="flex self-start">우와 정말 식물이랑 잘어울려요!!</p>
              <button className="w-[80px] h-[32px] border border-gray05 rounded-[8px]">수정</button>
            </div>
          )}
        </li> */}
      </ul>
      {/* 버튼 박스 */}
      <div className="flex items-center justify-between w-full mt-[68px]">
        <button onClick={deleteComments} className="w-[100px] h-[48px] border border-gray05 rounded-[8px]">
          선택삭제
        </button>
        <div className="flex gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <select className="w-[80px] h-[32px] px-[10px] border border-gray05 rounded-[8px] text-gray02 text-[12px] font-normal leading-[150%]">
              <option>1개월</option>
              <option>3개월</option>
              <option>6개월</option>
            </select>
            <p className="flex contents-center w-[80px] h-[32px] px-[10px] py-auto border border-gray05 rounded-[8px] text-gray02 text-[12px] font-normal leading-[150%]">
              직접설정
            </p>
            <input
              type="date"
              className="w-[120px] h-[32px] px-[10px] border border-gray05 rounded-[8px] text-gray02 text-[12px] font-normal leading-[150%]"
            />
            <p>-</p>
            <input
              type="date"
              className="w-[120px] h-[32px] px-[10px] border border-gray05 rounded-[8px] text-gray02 text-[12px] font-normal leading-[150%]"
            />
          </div>
          <div className="flex items-center gap-[8px]">
            <select className="w-[100px] h-[32px] px-[10px] border border-gray05 rounded-[8px] text-gray02 text-[12px] font-normal leading-[150%]">
              <option>제목</option>
              <option>작성자</option>
              <option>내용</option>
            </select>
            <input
              type="text"
              className="w-[100px] h-[32px] border border-gray05 rounded-[8px] text-gray02 text-[12px] font-normal leading-[150%]"
            />
            <button className="w-[64px] h-[32px] border border-gray05 rounded-[8px] text-gray02 text-[12px] font-normal leading-[150%]">
              검색
            </button>
          </div>
        </div>
      </div>
      {/* 페이지네이션 */}
      <div className="mt-[120px]">{showPageComponent}</div>
    </div>
  );
};
