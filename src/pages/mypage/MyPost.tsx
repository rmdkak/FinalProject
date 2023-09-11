import { type ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostsData } from "api/supabase";
import { CheckBoxIcon, DateConvertor, EmptyData, MypageSubTitle, MypageTitle } from "components";
import { useMypageQuery, usePagination, useSearchBar } from "hooks";

import { MYPAGE_LAYOUT_STYLE } from "./Mypage";

export const MyPost = () => {
  const [postIdsToDelete, setPostIdsToDelete] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const filteredPostIdsHandler = (selectId: string) => {
    return postIdsToDelete.filter((id) => id !== selectId);
  };

  const { userPostsResponse } = useMypageQuery();

  const { data: userPostData } = userPostsResponse;

  const deleteUserPostsMutation = useMutation({
    mutationFn: deletePostsData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mypagePost"] });
    },
  });

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

  const { SearchBar, filteredData } = useSearchBar({ dataList: userPostData, type: "post", isUseMypage: true });

  const { pageData, showPageComponent } = usePagination({
    data: filteredData,
    dataLength: filteredData === undefined ? 0 : filteredData.length,
    postPerPage: 8,
  });

  return (
    <div className={`${MYPAGE_LAYOUT_STYLE}`}>
      <MypageTitle title="마이페이지" isBorder={false} />
      <MypageSubTitle type="post" />
      {/* 글 목록 */}
      {pageData.length === 0 ? (
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
                  <CheckBoxIcon isCheck={postIdsToDelete.find((id) => id === post.id) !== undefined} />
                </label>
                <p className="w-[80px]">{index + 1}</p>
                <Link to={`/detail/${post.id as string}`} className="w-[830px]">
                  {post.title}
                </Link>
                <DateConvertor className={"w-[100px]"} datetime={post.created_at} type={"dotDate"} />
                <Link
                  to={`/updatepost/${post.id as string}`}
                  className="flex contents-center w-[80px] h-8 gray-outline-button rounded-lg"
                >
                  수정
                </Link>
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
