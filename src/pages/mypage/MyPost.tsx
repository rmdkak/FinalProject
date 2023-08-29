import { type ChangeEvent, useState } from "react";
import { FaRegSquareCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { DateConvertor } from "components";
import { useMypage, usePagination } from "hooks";

export const MyPost = () => {
  const [postIdsToDelete, setPostIdsToDelete] = useState<string[]>([]);

  const filteredPostIdsHandler = (selectId: string) => {
    return postIdsToDelete.filter((id) => id !== selectId);
  };

  const { userPostsResponse, deleteUserPostsMutation } = useMypage();
  const { data: userPostData } = userPostsResponse;

  // 선택 된 아이디 배열 삭제
  const deletePosts = () => {
    deleteUserPostsMutation.mutate(postIdsToDelete);
  };

  // 체크 상태 변경
  const onChange = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const filteredPostIds = filteredPostIdsHandler(id);
    if (event.target.checked) {
      setPostIdsToDelete([...postIdsToDelete, id]);
      return;
    }
    if (!event.target.checked) {
      setPostIdsToDelete(filteredPostIds);
    }
  };

  if (userPostData === undefined) return <p>에러페이지</p>;

  const { pageData, showPageComponent } = usePagination({
    data: userPostData,
    dataLength: userPostData.length,
    postPerPage: 8,
  });

  if (userPostData.length === 0) {
    return (
      <div className="flex-column items-center mt-[80px] w-[1280px] mx-auto">
        <div className="w-full  text-center pb-[24px]">
          <h3 className="text-[32px] font-normal leading-[130%]">마이페이지</h3>
        </div>
        <div className="w-full border-b border-b-black pb-[24px]">
          <p>내가 쓴 글</p>
        </div>
        <p className="text-[24px] my-[30px]">현재 작성된 글이 없습니다.</p>
        <div className="flex gap-[24px]">
          <Link to="/post" className="flex contents-center w-[130px] h-[48px] rounded-full bg-point">
            글 작성하기
          </Link>
          <Link to="/mypage" className="flex contents-center w-[130px] h-[48px] rounded-full bg-gray07 border">
            마이페이지
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-column items-center mt-[80px] w-[1280px] mx-auto">
      <div className="w-full  text-center pb-[24px]">
        <h3 className="text-[32px] font-normal leading-[130%]">마이페이지</h3>
      </div>
      <div className="w-full border-b border-b-black pb-[24px]">
        <p>내가 쓴 글</p>
      </div>
      {/* 글 목록 map */}
      <ul className="w-full">
        {pageData?.map((post, index) => {
          return (
            <li key={post.id} className="flex contents-center border-y border-gray06 gap-[24px] h-[64px] px-[24px]">
              <input
                id={post.id}
                type="checkbox"
                className="hidden"
                onChange={(event) => {
                  onChange(event, post.id);
                }}
              />
              <label htmlFor={post.id}>
                {postIdsToDelete.find((id) => id === post.id) !== undefined ? (
                  <FaRegSquareCheck className="text-black" />
                ) : (
                  <FaRegSquareCheck className="text-gray05" />
                )}
              </label>
              <p className="w-[80px]">{index + 1}</p>
              <p className="w-[830px]">{post.title}</p>
              <DateConvertor className={"w-[100px]"} datetime={post.created_at} type={"dotDate"} />
              <button className="w-[80px] h-[32px] border border-gray05 rounded-[8px] px-[24px]">수정</button>
            </li>
          );
        })}
      </ul>
      {/* 버튼 박스 */}
      <div className="flex items-center justify-between w-full mt-[68px]">
        <button onClick={deletePosts} className="w-[100px] h-[48px] border border-gray05 rounded-[8px]">
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
