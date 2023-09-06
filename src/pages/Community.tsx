/* eslint-disable no-case-declarations */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AutoPlay, Pagination } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { STORAGE_URL } from "api/supabase";
import { DateConvertor } from "components";
import { CommunitySkeleton } from "components/common/skeletonUI";
import { Toolbar } from "components/sidebar";
import { usePagination, usePostsQuery, useSearchBar, useFlicking } from "hooks";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import { type Tables } from "types/supabase";

const plugins = [
  new AutoPlay({ animationDuration: 3000, direction: "NEXT", stopOnHover: true }),
  new Pagination({ type: "bullet" }),
];

export const Community = () => {
  const [selectedOption, setSelectedOption] = useState<string>("whole");
  const { bestPostList, isExistCombination } = useFlicking();
  const navigate = useNavigate();
  const { flickingSkeleton, postListSkeleton } = CommunitySkeleton();

  const { fetchPostsMutation } = usePostsQuery();
  const { data: postList } = fetchPostsMutation;

  const [filteredPosts, setFilteredPosts] = useState<Array<Tables<"POSTS", "Row">>>([]);

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

  const { SearchBar, filteredData } = useSearchBar({ dataList: filteredPosts, type: "post" });

  const { pageData, showPageComponent } = usePagination({
    data: filteredData,
    dataLength: filteredData.length,
    postPerPage: 8,
  });

  const newPostList = postList === undefined ? [] : [...postList];
  const flickingPostList = newPostList?.sort((a, b) => b.bookmark - a.bookmark).filter((_, idx) => idx < 5);

  return (
    <div className="flex-column w-[1280px] mx-auto mt-20 gap-10">
      <div className="text-center border-b border-gray-400 drop-shadow-xl">
        <p className="text-[32px] pb-6 font-medium">커뮤니티</p>
      </div>
      <div className="gap-4 flex-column">
        <div className="flex items-center gap-3">
          <p className="text-[20px] font-medium">BEST CONTENTS</p>
          <p className="text-gray01">현재 가장 인기있는 글을 먼저 만나보세요!</p>
        </div>
        {/* 슬라이더 영역 */}
        <Flicking align={"prev"} circular={true} panelsPerView={3} moveType={"strict"} plugins={plugins}>
          {flickingPostList.length === 0 && flickingSkeleton}
          {flickingPostList?.map((post) => bestPostList(post))}
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
          {pageData.length === 0 && postListSkeleton}
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
                    <p>{post.USERS?.name}</p>
                    <DateConvertor datetime={post.created_at} type="dotDate" />
                    <DateConvertor datetime={post.created_at} type={"hourMinute"} />
                    <p>좋아요 {post.bookmark}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4">
                  {post.postImage !== null && (
                    <img
                      src={`${STORAGE_URL}${post.postImage as string}`}
                      className="h-[124px] w-[124px] rounded-[8px] object-cover mr-auto"
                    />
                  )}
                  {isExistCombination(post, "interior") && (
                    <div>
                      <img
                        src={`${STORAGE_URL}/wallpaper/${post.leftWallpaperId as string}`}
                        alt="벽지"
                        className="w-12 h-12 rounded-full relative top-[10px] border border-gray05"
                      />
                      <img
                        src={`${STORAGE_URL}/wallpaper/${post.rightWallpaperId as string}`}
                        alt="벽지"
                        className="relative w-12 h-12 border rounded-full border-gray05"
                      />
                      <img
                        src={`${STORAGE_URL}/tile/${post.tileId as string}`}
                        alt="바닥"
                        className="w-12 h-12 rounded-full relative bottom-[10px] border border-gray05"
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
                        src={`${STORAGE_URL}/tile/${post.tileId as string}`}
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
