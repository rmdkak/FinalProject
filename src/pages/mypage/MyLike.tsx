import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { CheckBoxIcon, DateConvertor, EmptyData, MypageSubTitle, MypageTitle } from "components";
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
      <MypageTitle title="마이페이지" isBorder={false} />
      <MypageSubTitle type="like" />
      {pageData.length === 0 ? (
        <EmptyData type="like" />
      ) : (
        <ul>
          {pageData.map((likedPost, index) => {
            const { POSTS: post } = likedPost;
            return (
              <li
                key={likedPost.id}
                className="flex contents-center border-y border-gray06 gap-[24px] h-[64px] px-[24px]"
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
                <p className="w-[80px]">{pageData.length - index}</p>
                <Link to={`/detail/${post.id as string}`} className="w-[830px]">
                  {post.title}
                </Link>
                <DateConvertor className={"w-[100px]"} datetime={post.created_at} type={"dotDate"} />
                <Link
                  to={`/detail/${post.id as string}`}
                  className="flex contents-center w-[80px] h-8 gray-outline-button rounded-lg"
                >
                  수정
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex items-center justify-between w-full mt-[68px]">
        <button onClick={deleteLikes} className="w-[100px] h-[48px] border border-gray05 rounded-[8px]">
          선택삭제
        </button>
        <SearchBar />
      </div>
      <div className="mt-[120px]">{showPageComponent}</div>
    </div>
  );
};
