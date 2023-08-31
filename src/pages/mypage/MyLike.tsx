import { useState, type ChangeEvent } from "react";
import { FaRegSquareCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { DateConvertor, MypageSubTitle, MypageTitle, SearchBar } from "components";
import { useMypage, usePagination } from "hooks";

export const MyLike = () => {
  const [likeIdsToDelete, setLikeIdsToDelete] = useState<string[]>([]);

  const filteredLikeIdsHandler = (selectId: string) => {
    return likeIdsToDelete.filter((id) => id !== selectId);
  };

  const { userLikesResponse, deleteUserLikeMutation } = useMypage();
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

  if (userLikeData === undefined) return <p>에러페이지</p>;

  const { pageData, showPageComponent } = usePagination({
    data: userLikeData,
    dataLength: userLikeData.length,
    postPerPage: 8,
  });

  return (
    <div className="flex-column items-center mt-[80px] w-[1280px] mx-auto">
      <MypageTitle />
      <MypageSubTitle type="like" />

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
                {likeIdsToDelete.find((id) => id === likedPost.id) !== undefined ? (
                  <FaRegSquareCheck className="text-black" />
                ) : (
                  <FaRegSquareCheck className="text-gray05" />
                )}
              </label>
              <p className="w-[80px]">{pageData.length - index}</p>
              <Link to={`/detail/${likedPost.id as string}`} className="w-[830px]">
                {post.title}
              </Link>
              <DateConvertor className={"w-[100px]"} datetime={post.created_at} type={"dotDate"} />
              <button className="w-[80px] h-[32px] border border-gray05 rounded-[8px] px-[24px]">수정</button>
            </li>
          );
        })}
      </ul>

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
