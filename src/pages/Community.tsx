/* eslint-disable no-case-declarations */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AutoPlay, Pagination } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { storageUrl } from "api/supabase";
import noImage from "assets/no_image.png";
import { DateConvertor } from "components";
import { Toolbar } from "components/sidebar";
import { usePagination, usePosts, useSearchBar } from "hooks";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import { type Tables } from "types/supabase";

const plugins = [
  new AutoPlay({ animationDuration: 3000, direction: "NEXT", stopOnHover: true }),
  new Pagination({ type: "bullet" }),
];

export const Community = () => {
  const [selectedOption, setSelectedOption] = useState<string>("whole");
  const navigate = useNavigate();

  const { fetchPostsMutation } = usePosts();
  const { data: postList } = fetchPostsMutation;
  const [filteredPosts, setFilteredPosts] = useState<Array<Tables<"POSTS", "Row">>>([]);

  const isExistCombination = (post: Tables<"POSTS", "Row">, type: "all" | "interior" | "paint") => {
    switch (type) {
      case "all":
        return (
          post.tileId !== null &&
          post.leftWallpaperId !== null &&
          post.rightWallpaperId !== null &&
          post.leftColorCode !== null &&
          post.rightColorCode !== null
        );
      case "interior":
        return post.tileId !== null && post.leftWallpaperId !== null && post.rightWallpaperId !== null;
      case "paint":
        return post.leftColorCode !== null && post.rightColorCode !== null;
    }
  };

  useEffect(() => {
    if (postList !== undefined) {
      switch (selectedOption) {
        case "whole":
          setFilteredPosts(postList);
          break;
        case "normal":
          const filterd = postList?.filter((post) => !isExistCombination(post, "all"));
          setFilteredPosts(filterd);
          break;
        case "recommendation":
          const filterdRecommendation = postList?.filter((post) => isExistCombination(post, "all"));
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

  if (postList === undefined) return <p>에러 페이지</p>;

  const newPostList = [...postList];
  const flickingPostList = newPostList?.sort((a, b) => b.bookmark - a.bookmark).filter((_, idx) => idx < 5);

  return (
    <div className="flex-column w-[1280px] mx-auto mt-20 gap-10">
      <div className="text-center border-b border-gray-400 drop-shadow-xl">
        <p className="text-[32px] pb-6">커뮤니티</p>
      </div>
      <div className="gap-4 flex-column">
        <div className="flex items-center gap-3">
          <p className="text-[20px] font-medium">BEST CONTENTS</p>
          <p className="text-gray01">현재 가장 인기있는 글을 먼저 만나보세요!</p>
        </div>
        {/* 슬라이더 영역 */}
        <Flicking align={"prev"} circular={true} panelsPerView={3} plugins={plugins}>
          {flickingPostList?.map((post) => (
            <div
              key={post.id}
              className="w-[400px] flex-column mr-10 cursor-pointer"
              onClick={() => {
                navigate(`/detail/${post.id}`);
              }}
            >
              <div>
                <img
                  src={post.postImage !== null ? `${storageUrl}${post.postImage}` : noImage}
                  alt="postImg"
                  className={"rounded-[8px] w-full h-[400px] object-cover"}
                />
              </div>

              <div className="w-full gap-2 mt-3 flex-column">
                <div className="flex h-12">
                  <p className="text-[20px] my-auto font-semibold truncate w-1/2">{post.title}</p>

                  {isExistCombination(post, "interior") && (
                    <div className="inline-flex w-1/2">
                      <img
                        src={`${storageUrl}/wallpaper/${post.leftWallpaperId as string}`}
                        alt="벽지"
                        className="relative w-[48px] h-[48px] left-[76px] rounded-full"
                      />
                      <img
                        src={`${storageUrl}/wallpaper/${post.rightWallpaperId as string}`}
                        alt="벽지"
                        className="relative w-[48px] h-[48px] left-[66px] rounded-full"
                      />
                      <img
                        src={`${storageUrl}/tile/${post.tileId as string}`}
                        alt="바닥"
                        className="relative w-[48px] h-[48px] left-[56px] rounded-full"
                      />
                    </div>
                  )}
                  {isExistCombination(post, "paint") && post.leftColorCode !== null && post.rightColorCode !== null && (
                    <div className="inline-flex w-1/2">
                      <div
                        className="relative w-[48px] h-[48px] left-[76px] rounded-full"
                        style={{
                          backgroundColor: post.leftColorCode,
                        }}
                      />
                      <div
                        className="relative w-[48px] h-[48px] left-[66px] rounded-full"
                        style={{
                          backgroundColor: post.rightColorCode,
                        }}
                      />
                      <img
                        src={`${storageUrl}/tile/${post.tileId as string}`}
                        alt="바닥"
                        className="relative w-[48px] h-[48px] left-[56px] rounded-full"
                      />
                    </div>
                  )}
                </div>
                <p className="text-[16px] text-gray02 line-clamp-2 h-[46px]">{post.content}</p>
              </div>
            </div>
          ))}
          <ViewportSlot>
            <div className="flicking-pagination"></div>
          </ViewportSlot>
        </Flicking>
      </div>
      {/* 게시물 영역 */}
      <div className="flex justify-center">
        <div className="w-[1280px] mt-20">
          <div className="flex gap-3 text-[16px] items-center pb-3 border-b-[1px] border-gray02">
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
              총 <span className="font-semibold text-black">{filteredData?.length}</span>개의 게시물이 있습니다.
            </p>
          </div>

          {pageData.map((post) => {
            return (
              <div
                key={post.id}
                className="flex justify-between gap-4 py-8 ml-3 border-b border-gray-200 cursor-pointer"
                onClick={() => {
                  goDetailPage(post.id);
                }}
              >
                <div className="flex-column w-[1028px] gap-8">
                  <div className="gap-4 flex-column">
                    <p className="text-[18px] font-semibold truncate">{post.title}</p>
                    <p className="text-[16px] h-[52px] overflow-hidden text-[#888888]">{post.content}</p>
                  </div>
                  <div className="flex text-[#888888] text-[12px] gap-2">
                    <p>{post.nickname}</p>
                    <DateConvertor datetime={post.created_at} type="dotDate" />
                    <DateConvertor datetime={post.created_at} type={"hourMinute"} />
                    <p>좋아요 {post.bookmark}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4">
                  {post.postImage !== null && (
                    <img
                      src={`${storageUrl}${post.postImage as string}`}
                      className="h-[124px] w-[124px] rounded-[8px] object-cover mr-auto"
                    />
                  )}
                  {isExistCombination(post, "interior") && (
                    <div>
                      <img
                        src={`${storageUrl}/wallpaper/${post.leftWallpaperId as string}`}
                        alt="벽지"
                        className="w-12 h-12 rounded-full relative top-[10px]"
                      />
                      <img
                        src={`${storageUrl}/wallpaper/${post.rightWallpaperId as string}`}
                        alt="벽지"
                        className="relative w-12 h-12 rounded-full"
                      />
                      <img
                        src={`${storageUrl}/tile/${post.tileId as string}`}
                        alt="바닥"
                        className="w-12 h-12 rounded-full relative bottom-[10px]"
                      />
                    </div>
                  )}
                  {isExistCombination(post, "paint") && (
                    <div>
                      <div
                        className="w-12 h-12 rounded-full relative top-[10px]"
                        style={{
                          backgroundColor: post.leftColorCode,
                        }}
                      />
                      <div
                        className="relative w-12 h-12 rounded-full"
                        style={{
                          backgroundColor: post.rightColorCode,
                        }}
                      />
                      <img
                        src={`${storageUrl}/tile/${post.tileId as string}`}
                        alt="바닥"
                        className="w-12 h-12 rounded-full relative bottom-[10px]"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end py-[30px] w-full">
        <SearchBar />
      </div>
      <div className="flex justify-center">{showPageComponent}</div>
      <Toolbar />
    </div>
  );
};
