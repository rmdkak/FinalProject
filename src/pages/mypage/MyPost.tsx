import { type ChangeEvent, useState } from "react";
import { FaRegSquareCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { DateConvertor, EmptyData, MypageSubTitle, MypageTitle, SearchBar } from "components";
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

  return (
    <div className="flex-column items-center mt-[80px] w-[1280px] mx-auto">
      <MypageTitle />
      <MypageSubTitle type="post" />
      {/* 글 목록 */}
      {userPostData.length === 0 ? (
        <EmptyData type="post" />
      ) : (
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
                <Link to={`/detail/${post.id as string}`} className="w-[830px]">
                  {post.title}
                </Link>
                <DateConvertor className={"w-[100px]"} datetime={post.created_at} type={"dotDate"} />
                <button className="w-[80px] h-[32px] border border-gray05 rounded-[8px] px-[24px]">수정</button>
              </li>
            );
          })}
        </ul>
      )}

      {/* 버튼 박스 */}
      <div className="flex items-center justify-between w-full mt-[68px]">
        <button onClick={deletePosts} className="w-[100px] h-[48px] border border-gray05 rounded-[8px]">
          선택삭제
        </button>
        <SearchBar />
      </div>
      {/* 페이지네이션 */}
      <div className="mt-[120px]">{showPageComponent}</div>
    </div>
  );
};
