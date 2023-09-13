import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { CheckBoxIcon, DateConvertor, EmptyData, SubTitle, Title } from "components";
import { useMypageQuery } from "hooks/useMypageQuery";
import { usePagination } from "hooks/usePagination";
import { useSearchBar } from "hooks/useSearchBar";

import { MYPAGE_LAYOUT_STYLE } from "./Mypage";

export const MyLike = () => {
  const [likeIdsToDelete, setLikeIdsToDelete] = useState<string[]>([]);

  const filteredLikeIdsHandler = (selectId: string) => {
    return likeIdsToDelete.filter((id) => id !== selectId);
  };

  const { userLikesResponse, deleteUserLikeMutation } = useMypageQuery();
  const { data: userLikeData } = userLikesResponse;

  const deleteLikes = () => {
    deleteUserLikeMutation.mutate(likeIdsToDelete);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const filteredLikeIds = filteredLikeIdsHandler(id);
    if (event.target.checked) {
      setLikeIdsToDelete([...likeIdsToDelete, id]);
      return;
    }
    if (!event.target.checked) {
      setLikeIdsToDelete(filteredLikeIds);
    }
  };

  const { SearchBar, filteredData } = useSearchBar({ dataList: userLikeData, type: "like", isUseMypage: true });

  const { pageData, showPageComponent } = usePagination({
    data: filteredData,
    dataLength: filteredData === undefined ? 0 : filteredData.length,
    postPerPage: 8,
  });

  return (
    <div className={MYPAGE_LAYOUT_STYLE}>
      <Title title="마이페이지" isBorder={false} />
      <SubTitle type="myLike" />
      {pageData.length === 0 ? (
        <EmptyData type="myLike" />
      ) : (
        <ul className="w-full">
          {pageData.map((likedPost, index) => {
            const { POSTS: post } = likedPost;
            return (
              <li
                key={likedPost.id}
                className="flex w-full h-16 gap-6 px-6 sm:h-auto sm:px-3 sm:py-4 contents-center border-y border-gray06"
              >
                <input
                  id={likedPost.id}
                  type="checkbox"
                  className="hidden"
                  onChange={(event) => {
                    onChange(event, likedPost.id);
                  }}
                />
                <label htmlFor={likedPost.id}>
                  <CheckBoxIcon
                    type="pointColor"
                    isCheck={likeIdsToDelete.find((id) => id === likedPost.id) !== undefined}
                  />
                </label>
                <p className="flex w-[6%] h-full contents-center">{pageData.length - index}</p>
                <div className="flex w-[75%] h-full gap-6 items-center sm:flex-column sm:gap-2">
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
                  to={`/detail/${post.id as string}`}
                  className="flex w-20 h-8 rounded-lg contents-center gray-outline-button sm:hidden"
                >
                  이동하기
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex items-center justify-between w-full mt-16 sm:flex-col sm:gap-10">
        <button onClick={deleteLikes} className="w-24 h-12 rounded-lg gray-outline-button body-3 sm:w-full">
          선택삭제
        </button>
        <SearchBar />
      </div>
      <div className="mt-[120px] sm:mt-16">{showPageComponent}</div>
    </div>
  );
};
