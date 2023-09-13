import { type ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

import { CheckBoxIcon, DateConvertor, EmptyData, SubTitle, Title } from "components";
import { useMypageQuery } from "hooks/useMypageQuery";
import { usePagination } from "hooks/usePagination";
import { useSearchBar } from "hooks/useSearchBar";

import { MYPAGE_LAYOUT_STYLE } from "./Mypage";

export const MyPost = () => {
  const [postIdsToDelete, setPostIdsToDelete] = useState<string[]>([]);

  const filteredPostIdsHandler = (selectId: string) => {
    return postIdsToDelete.filter((id) => id !== selectId);
  };

  const { userPostsResponse, deleteUserPostsMutation } = useMypageQuery();

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

  const { SearchBar, filteredData } = useSearchBar({ dataList: userPostData, type: "post", isUseMypage: true });

  const { pageData, showPageComponent } = usePagination({
    data: filteredData,
    dataLength: filteredData === undefined ? 0 : filteredData.length,
    postPerPage: 8,
  });

  return (
    <div className={MYPAGE_LAYOUT_STYLE}>
      <Title title="마이페이지" isBorder={false} />
      <SubTitle type="myPost" />

      {pageData.length === 0 ? (
        <EmptyData type="myPost" />
      ) : (
        <ul className="w-full">
          {pageData?.map((post, index) => {
            return (
              <li
                key={post.id}
                className="flex w-full h-16 gap-6 px-6 sm:h-auto sm:px-3 sm:py-4 contents-center border-y border-gray06"
              >
                <input
                  id={post.id}
                  type="checkbox"
                  className="hidden"
                  onChange={(event) => {
                    onChange(event, post.id);
                  }}
                />
                <label htmlFor={post.id}>
                  <CheckBoxIcon
                    type="pointColor"
                    isCheck={postIdsToDelete.find((id) => id === post.id) !== undefined}
                  />
                </label>
                <p className="flex w-[6%] h-full contents-center">{index + 1}</p>
                <div className="flex items-center w-3/4 h-full gap-6 sm:flex-column sm:gap-2">
                  <Link
                    to={`/detail/${post.id as string}`}
                    className="w-[87%] body-3 h-full flex items-center sm:w-full sm:justify-start"
                  >
                    {post.title}
                  </Link>
                  <DateConvertor
                    className="w-[13%] h-full flex body-3 contents-center text-gray03 sm:w-full sm:justify-start sm:body-4"
                    datetime={post.created_at}
                    type={"dotDate"}
                  />
                </div>
                <Link
                  to={`/updatepost/${post.id as string}`}
                  className="flex w-20 h-8 rounded-lg contents-center gray-outline-button sm:hidden"
                >
                  수정
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex items-center justify-between w-full mt-16 sm:flex-col sm:gap-10">
        <button onClick={deletePosts} className="w-24 h-12 rounded-lg gray-outline-button body-3 sm:w-full">
          선택삭제
        </button>
        <SearchBar />
      </div>
      <div className="mt-[120px] sm:mt-16">{showPageComponent}</div>
    </div>
  );
};
