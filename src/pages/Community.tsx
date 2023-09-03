/* eslint-disable no-case-declarations */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AutoPlay } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import { storageUrl } from "api/supabase";
import noImage from "assets/no_image.png";
import { DateConvertor } from "components";
import { Toolbar } from "components/sidebar";
import { usePagination, usePosts, useSearchBar } from "hooks";
import "@egjs/react-flicking/dist/flicking.css";
import { type Tables } from "types/supabase";

const plugins = [new AutoPlay({ animationDuration: 3000, direction: "NEXT", stopOnHover: true })];

export const Community = () => {
  const [selectedOption, setSelectedOption] = useState<string>("whole");
  const navigate = useNavigate();

  const { fetchPostsMutation } = usePosts();
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

  if (filteredPosts === undefined) return <p>에러 페이지</p>;

  const { SearchBar, filteredData } = useSearchBar({ dataList: filteredPosts, type: "post" });

  if (filteredData === undefined) return <p>에러 페이지</p>;

  const { pageData, showPageComponent } = usePagination({
    data: filteredData,
    dataLength: filteredData.length,
    postPerPage: 8,
  });

  return (
    <div className="w-[1600px] mx-auto mt-[40px]">
      <div className="text-center border-b border-gray-400 drop-shadow-xl">
        <p className="text-[32px] py-[10px]">커뮤니티</p>
      </div>
      <div className="my-[40px]">
        <div className="flex items-center gap-3 mb-[20px]">
          <p className="text-[20px] font-medium">BEST CONTENTS</p>
          <p className="text-gray01">현재 가장 인기있는 글을 먼저 만나보세요!</p>
        </div>
        {/* 슬라이더 영역 */}
        <Flicking align={"prev"} circular={true} panelsPerView={4} plugins={plugins}>
          {postList
            ?.sort((a, b) => b.bookmark - a.bookmark)
            .map((post) => (
              <div key={post.id} className="flex flex-col w-[376px] h-[486px] mx-[10px] ">
                <div className="">
                  <img
                    src={post.postImage != null ? `${storageUrl}${post.postImage}` : noImage}
                    alt="postImg"
                    className={"rounded-[8px] h-[376px] object-cover"}
                  />
                </div>
                <div className="flex justify-between mt-[20px]">
                  <div className="w-[260px]">
                    <p className="text-[18px] font-semibold truncate">{post.title}</p>
                    <p className="my-[10px] text-[16px] text-[#888888] line-clamp-2 h-[46px]">{post.content}</p>
                  </div>
                  {isExistCombination(post) && (
                    <div className="relative flex w-[116px]">
                      <img
                        src={`${storageUrl}/wallpaper/${post.leftWallpaperId as string}`}
                        alt="벽지"
                        className="absolute w-[40px] h-[40px] left-[10px] rounded-full"
                      />
                      <img
                        src={`${storageUrl}/wallpaper/${post.rightWallpaperId as string}`}
                        alt="벽지"
                        className="absolute w-[40px] h-[40px] left-[40px] rounded-full"
                      />
                      <img
                        src={`${storageUrl}/tile/${post.tileId as string}`}
                        alt="바닥"
                        className="absolute w-[40px] h-[40px] left-[70px] rounded-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
        </Flicking>
      </div>
      {/* 게시물 영역 */}
      <div className="flex justify-center">
        <div className="w-[1600px] mx-auto">
          <div className="mt-[10px] border-y border-gray-200 pb-[15px] pt-[50px]">
            <div className="flex gap-3 text-[16px] items-center">
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="p-1 w-[140px] text-[#888888] border shadow focus:outline-none"
              >
                <option value="whole">전체 게시글</option>
                <option value="normal">일반 게시글</option>
                <option value="recommendation">조합추천 게시글</option>
              </select>
              <p className="text-[#888888]">
                총 <span className="font-semibold text-[#1A1A1A]">{filteredPosts?.length}</span>개의 게시물이 있습니다.
              </p>
            </div>
          </div>
          {pageData.map((post) => {
            const bookmarkLength = post.POSTLIKES[0].userId.length;
            return (
              <div
                key={post.id}
                className="border-b border-gray-200 cursor-pointer h-[192px] py-[20px] flex"
                onClick={() => {
                  goDetailPage(post.id);
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-column w-[1278px]">
                    <div>
                      <p className="text-[18px] font-semibold truncate">{post.title}</p>
                      <p className="mt-[10px] text-[16px] h-[45px] overflow-hidden text-[#888888]">{post.content}</p>
                    </div>
                    <div className="flex text-[#888888] text-[14px] gap-[10px] mt-[30px]">
                      <p>{post.nickname}</p>
                      <DateConvertor datetime={post.created_at} type="dotDate" />
                      <DateConvertor datetime={post.created_at} type={"hourMinute"} />
                      <p>좋아요 {bookmarkLength}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 w-[234px] justify-end items-center">
                    {post.postImage != null && (
                      <img
                        src={`${storageUrl}${post.postImage as string}`}
                        className="h-[154px] w-[154px] rounded-[8px] object-cover"
                      />
                    )}
                    {isExistCombination(post) && (
                      <div className="">
                        <img
                          src={`${storageUrl}/wallpaper/${post.leftWallpaperId as string}`}
                          alt="벽지"
                          className="w-[64px] h-[64px] rounded-full relative top-[20px]"
                        />
                        <img
                          src={`${storageUrl}/wallpaper/${post.rightWallpaperId as string}`}
                          alt="벽지"
                          className="w-[64px] h-[64px] rounded-full relative"
                        />
                        <img
                          src={`${storageUrl}/tile/${post.tileId as string}`}
                          alt="바닥"
                          className="w-[64px] h-[64px] rounded-full relative bottom-[20px]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Toolbar />
      <div className="flex justify-end py-[30px] w-full">
        <SearchBar />
      </div>

      <div className="flex justify-center mt-[20px]">{showPageComponent}</div>
    </div>
  );
};
