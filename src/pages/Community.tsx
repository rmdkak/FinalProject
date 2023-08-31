/* eslint-disable no-case-declarations */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AutoPlay } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import { storageUrl } from "api/supabase";
import noImage from "assets/no_image.png";
import { DateConvertor, PostBookmark } from "components";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";
import { usePagination, usePosts } from "hooks";
import { useAuthStore } from "store";
import "@egjs/react-flicking/dist/flicking.css";
import { type Tables } from "types/supabase";

const plugins = [new AutoPlay({ animationDuration: 3000, direction: "NEXT", stopOnHover: true })];

export const Community = () => {
  const [selectedOption, setSelectedOption] = useState<string>("whole");
  const navigate = useNavigate();

  const { currentSession } = useAuthStore();
  const { Confirm } = useDialog();
  const { fetchPostsMutation, deletePostMutation } = usePosts();
  const { data: postList } = fetchPostsMutation;
  const [filteredPosts, setFilteredPosts] = useState<Array<Tables<"POSTS", "Row">>>([]);

  const isExistCombination = (post: Tables<"POSTS", "Row">) => {
    return post.tileId !== null && post.leftWallpaperId !== null && post.rightWallpaperId !== null;
  };

  useEffect(() => {
    if (postList !== undefined) {
      switch (selectedOption) {
        case "whole":
          setFilteredPosts(postList);
          break;
        case "normal":
          const filterd = postList?.filter((post) => !isExistCombination(post));
          setFilteredPosts(filterd);
          break;
        case "recommendation":
          const filterdRecommendation = postList?.filter((post) => isExistCombination(post));
          setFilteredPosts(filterdRecommendation);
          break;
      }
    }
  }, [selectedOption, postList]);

  const goDetailPage = (postId: string) => {
    navigate(`/detail/${postId}`);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const deleteHandler = async (id: string) => {
    try {
      const checkDelete = await Confirm("정말로 삭제하시겠습니까?");
      if (checkDelete) deletePostMutation.mutate(id);
    } catch (error) {
      console.log("error :", error);
    }
  };

  if (filteredPosts === undefined) {
    return (
      <>
        <p>에러 페이지</p>
      </>
    );
  }

  const { pageData, showPageComponent } = usePagination({
    data: filteredPosts,
    dataLength: filteredPosts.length,
    postPerPage: 8,
  });
  
  const createPostHandler = async () => {
    if (currentSession === null) {
      const sessionCheck = await Confirm("게시물 작성은 로그인 후 이용 가능합니다. 로그인 페이지로 이동하시겠습니까?");
      if (sessionCheck) navigate("/login");
      return;
    }
    navigate("/post");
  };

  return (
    <div className="w-[1280px] mx-auto mt-[40px]">
      <div className="text-center border-b border-gray-400 drop-shadow-xl">
        <p className="text-[32px] py-[10px]">커뮤니티</p>
      </div>
      <div className="my-[30px]">
        {/* 슬라이더 영역 */}
        <Flicking align={"prev"} circular={true} panelsPerView={3} plugins={plugins}>
          {postList
            ?.sort((a, b) => b.bookmark - a.bookmark)
            .map((post) => (
              <div key={post.id} className="flex flex-col w-[400px] h-[349px] mx-[10px] ">
                <div className="flex gap-[15px]">
                  <img
                    src={post.postImage != null ? `${storageUrl}${post.postImage}` : noImage}
                    alt="postImg"
                    className={`rounded-[8px] ${isExistCombination(post) ? "w-[322px]" : "w-[400px]"} h-[196px]`}
                  />
                  {isExistCombination(post) && (
                    <div className="flex flex-col items-center gap-[5px] mt-[5px]">
                      <p>벽지</p>
                      <div className="flex rounded-[12px]">
                        <img
                          src={`${storageUrl}/wallpaper/${post.leftWallpaperId as string}`}
                          alt="벽지"
                          className="w-[31px] h-[55px] rounded-l-[8px]"
                        />
                        <img
                          src={`${storageUrl}/wallpaper/${post.rightWallpaperId as string}`}
                          alt="벽지"
                          className="w-[31px] h-[55px] rounded-r-[8px]"
                        />
                      </div>
                      <p>바닥재</p>
                      <img
                        src={`${storageUrl}/tile/${post.tileId as string}`}
                        alt="바닥"
                        className="w-[62px] h-[55px] rounded-[8px]"
                      />
                    </div>
                  )}
                </div>
                <div className="w-[300px]">
                  <p className="mt-[16px] text-[18px] font-semibold truncate">{post.title}</p>
                  <p className="my-[10px] text-[16px] text-[#888888] line-clamp-2 h-[46px]">{post.content}</p>
                  <div className="flex gap-[10px] text-[#888888] text-[14px]">
                    <p>{post.nickname}</p>
                    <DateConvertor datetime={post.created_at} type="dotDate" />
                    <p>좋아요 {post.bookmark}</p>
                  </div>
                </div>
              </div>
            ))}
        </Flicking>
      </div>
      {/* 게시물 영역 */}
      <div className="flex justify-center">
        <div className="w-[1280px] mx-auto">
          <div className="contents-between mt-[10px] border-y border-gray-200 pb-[15px] pt-[50px]">
            <div className="flex gap-3 text-[16px] items-center">
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="p-1 text-[#888888] border shadow focus:outline-none"
              >
                <option value="whole">전체 게시글</option>
                <option value="normal">일반 게시글</option>
                <option value="recommendation">조합 추천</option>
              </select>
              <p className="text-[#888888]">
                총 <span className="font-semibold text-[#1A1A1A]">{filteredPosts?.length}</span>개의 게시물이 있습니다.
              </p>
            </div>
            <button
              type="button"
              className="px-4 py-2 font-semibold text-white bg-[#888888] rounded hover:bg-gray-500"
              onClick={createPostHandler}
            >
              게시물 작성
            </button>
          </div>
          {pageData.map((post) => {
            return (
              <div key={post.id} className="py-[30px] border-b border-gray-200">
                <div
                  onClick={() => {
                    goDetailPage(post.id);
                  }}
                  className="flex justify-between gap-5 cursor-pointer"
                >
                  <div className="flex">
                    <div className="w-[1000px]">
                      <p className="text-[18px] font-semibold truncate">{post.title}</p>
                      <p className="text-[16px] mt-1 h-[45px] overflow-hidden text-[#888888]">{post.content}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {post.postImage != null && (
                      <img
                        src={`${storageUrl}${post.postImage as string}`}
                        className="h-[80px] w-[132px] rounded-[8px] mr-[20px]"
                      />
                    )}
                    {isExistCombination(post) && (
                      <div className="relative flex mr-[40px]">
                        <div className="flex rounded-[12px]">
                          <img
                            src={`${storageUrl}/wallpaper/${post.leftWallpaperId as string}`}
                            alt="벽지"
                            className="w-[31px] h-[55px] rounded-l-[8px]"
                          />
                          <img
                            src={`${storageUrl}/wallpaper/${post.rightWallpaperId as string}`}
                            alt="벽지"
                            className="w-[31px] h-[55px] rounded-r-[8px]"
                          />
                        </div>
                        <img
                          src={`${storageUrl}/tile/${post.tileId as string}`}
                          alt="바닥"
                          className="w-[62px] h-[55px] rounded-[8px] absolute top-[20px] left-[40px]"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex mt-5 text-[#888888] text-[14px] gap-5">
                  <p>{post.nickname}</p>
                  <DateConvertor datetime={post.created_at} type="dotDate" />
                  <p>좋아요 {post.bookmark}</p>
                  {currentSession?.user.id === post.userId && (
                    <div className="text-red-500">
                      <button className="mr-2">수정</button>
                      <button
                        onClick={async () => {
                          await deleteHandler(post.id);
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                  <PostBookmark postId={post.id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-[16px] py-[30px] justify-end">
        <div className="flex items-center gap-[8px]">
          <select className="w-[80px] h-[32px] px-[10px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]">
            <option>1개월</option>
            <option>3개월</option>
            <option>6개월</option>
          </select>
          <p className="flex contents-center w-[80px] h-[32px] px-[10px] py-auto border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]">
            직접설정
          </p>
          <input
            type="date"
            className="w-[120px] h-[32px] px-[10px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]"
          />
          <p>-</p>
          <input
            type="date"
            className="w-[120px] h-[32px] px-[10px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]"
          />
        </div>
        <div className="flex items-center gap-[8px]">
          <select className="w-[100px] h-[32px] px-[10px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]">
            <option>제목</option>
            <option>작성자</option>
            <option>내용</option>
          </select>
          <input
            type="text"
            className="w-[100px] h-[32px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]"
          />
          <button className="w-[64px] h-[32px] border border-gray05 rounded-[4px] text-gray02 text-[12px] font-normal leading-[150%]">
            검색
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-[20px]">{showPageComponent}</div>
    </div>
  );
};
