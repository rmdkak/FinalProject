import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { STORAGE_URL } from "api/supabase/supabaseClient";
import noImage from "assets/no_image.jpg";
import noImage_webp from "assets/no_image_webp.webp";
import { DateConvertor, CommunitySkeleton, type PostDataChain } from "components";

import { useDynamicImport } from "./useDynamicImport";
import { usePagination } from "./usePagination";
import { usePostsQuery } from "./usePostsQuery";
import { useSearchBar } from "./useSearchBar";

interface Props {
  dataLength: number;
}
/**
 * PostsData를 사용한 element, flicking 라이브러리에 적용시킬 반복되는 element 요소를 반환힙니다.
 * @returns ShowBestPostElements: Home,community 화면에 보여지는 BEST CONTENTS 요소들을 반환합니다.
 * ShowBestRankingElements: Home화면에 보여지는 베스트 조합 랭킹 요소들을 반환합니다.
 */
export const usePostsData = () => {
  const [selectedOption, setSelectedOption] = useState<string>("whole");
  const [filteredPosts, setFilteredPosts] = useState<PostDataChain[]>([]);

  const { preFetchPageBeforeEnter } = useDynamicImport();
  const { SearchBar, filteredData } = useSearchBar({ dataList: filteredPosts, type: "post" });
  const { postListSkeleton, flickingSkeleton } = CommunitySkeleton();
  const { fetchPostsMutation } = usePostsQuery();
  const { data: postList } = fetchPostsMutation;
  const newPostList = postList === undefined ? [] : [...postList];

  const navigate = useNavigate();

  const isExistCombination = (post: PostDataChain, type: "all" | "interior" | "paint") => {
    switch (type) {
      case "all":
        return (
          (post.tileId !== null && post.leftWallpaperId !== null && post.rightWallpaperId !== null) ||
          (post.tileId !== null && post.leftColorCode !== null && post.rightColorCode !== null)
        );
      case "interior":
        return post.tileId !== null && post.leftWallpaperId !== null && post.rightWallpaperId !== null;
      case "paint":
        return post.leftColorCode !== null && post.rightColorCode !== null && post.tileId !== null;
    }
  };

  useEffect(() => {
    let filterd;
    let filterdRecommendation;
    if (postList !== undefined) {
      switch (selectedOption) {
        case "whole":
          setFilteredPosts(postList);
          break;
        case "normal":
          filterd = postList?.filter((post) => !isExistCombination(post, "all"));
          setFilteredPosts(filterd);
          break;
        case "recommendation":
          filterdRecommendation = postList?.filter((post) => isExistCombination(post, "all"));
          setFilteredPosts(filterdRecommendation);
          break;
      }
    }
  }, [selectedOption, postList]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const flickingPostList = newPostList
    ?.sort((a, b) => b.POSTLIKES[0]?.userId?.length - a.POSTLIKES[0]?.userId?.length)
    .filter((_, idx) => idx < 5);
  /**
   * flicking 라이브러리에 적용할 수 있도록, 반복되는 element 컴포넌트를 대신합니다.
   * @params dataLength:number 원하는 길이의 PostData 배열을 가져옵니다.
   * @returns Home,community 화면에 보여지는 BEST CONTENTS 요소들을 반환합니다.
   */
  const ShowBestPostElements = ({ dataLength }: Props) => {
    return (
      <>
        {flickingPostList?.length === 0 && flickingSkeleton}
        {flickingPostList?.slice(0, dataLength).map((post) => (
          <div
            key={post.id}
            className="w-[400px] cursor-pointer mr-7 flex-column md:!w-[260px] sm:!w-[260px]"
            onMouseEnter={async () => {
              await preFetchPageBeforeEnter("detail");
            }}
            onClick={() => {
              navigate(`/detail/${post.id}`);
            }}
          >
            <picture>
              <source
                srcSet={post.postImage !== null ? `${STORAGE_URL}${post.postImage}` : noImage_webp}
                type="image/webp"
              />
              <img
                src={post.postImage !== null ? `${STORAGE_URL}${post.postImage}` : noImage}
                alt="postImg"
                className="w-[400px] h-[400px] rounded-lg object-cover md:w-[260px] md:h-[260px] sm:w-[260px] sm:h-[260px] lg:h-[300px]"
              />
            </picture>

            <div className="flex items-center justify-between h-12 my-3">
              <p className="text-[20px] font-semibold line-clamp-2 sm:text-[16px] sm:w-[118px] md:text-[16px] md:w-[118px] w-[240px]">
                {post.title}
              </p>
              {isExistCombination(post, "interior") && (
                <div className="inline-flex">
                  <img
                    src={`${STORAGE_URL}/wallpaper/${post.leftWallpaperId as string}`}
                    alt="벽지"
                    className="relative w-[48px] left-[24px] h-[48px] md:w-8 md:h-8 sm:w-8 sm:h-8  rounded-full border border-gray05"
                  />
                  <img
                    src={`${STORAGE_URL}/wallpaper/${post.rightWallpaperId as string}`}
                    alt="벽지"
                    className="relative w-[48px] left-[12px] h-[48px] sm:w-8 sm:h-8 md:w-8 md:h-8 rounded-full border border-gray05"
                  />
                  <img
                    src={`${STORAGE_URL}/tile/${post.tileId as string}`}
                    alt="바닥"
                    className="relative w-[48px] h-[48px] md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full border border-gray05"
                  />
                </div>
              )}
              {isExistCombination(post, "paint") && post.leftColorCode !== null && post.rightColorCode !== null && (
                <div className="inline-flex w-1/2">
                  <div
                    className="relative w-[48px] h-[48px] left-[76px] md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full border-gray05"
                    style={{
                      backgroundColor: post.leftColorCode,
                    }}
                  />
                  <div
                    className="relative w-[48px] h-[48px] left-[66px] md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full border-gray05"
                    style={{
                      backgroundColor: post.rightColorCode,
                    }}
                  />
                  <img
                    src={`${STORAGE_URL}/tile/${post.tileId as string}`}
                    alt="바닥"
                    className="relative w-[48px] h-[48px] left-[56px] md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full border-gray05"
                  />
                </div>
              )}
            </div>
            <p className="text-[16px] text-gray02 line-clamp-2 h-[46px] sm:text-[14px] md:text-[14px]">
              {post.content}
            </p>
          </div>
        ))}
      </>
    );
  };

  const { pageData, showPageComponent } = usePagination({
    data: filteredData,
    dataLength: filteredData.length,
    postPerPage: 8,
  });

  const CommunityPostsForm = () => {
    return (
      <>
        <div className="w-full max-w-[1280px] min-w-[312px] mt-20 ">
          <div className="flex gap-3 text-[16px] items-center pb-3 border-b border-gray02">
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="p-1 w-[130px] text-[#888888] border shadow focus:outline-none"
            >
              <option value="whole">전체 게시글</option>
              <option value="normal">일반 게시글</option>
              <option value="recommendation">조합추천 게시글</option>
            </select>
            <p className="text-[#888888] sm: text-[14px] ">
              총 <span className="font-semibold text-black">{filteredData?.length}</span>개의 게시물이 있습니다.
            </p>
          </div>
          {pageData.length === 0 && postListSkeleton}
          {pageData.map((post) => {
            return (
              <div
                key={post.id}
                className="flex justify-between py-8 border-b border-gray-200 cursor-pointer"
                onMouseEnter={async () => {
                  await preFetchPageBeforeEnter("detail");
                }}
                onClick={() => {
                  navigate(`/detail/${post.id as string}`);
                }}
              >
                <div className="max-w-[550px] min-w-0 w-full flex-column justify-between whitespace-nowrap">
                  <div className="gap-4 flex-column">
                    <p className="sm:w-[80%] text-[18px] font-semibold truncate">{post.title}</p>
                    <p className="sm:w-[80%] text-[16px] h-[52px] truncate text-gray02">{post.content}</p>
                  </div>
                  <div className="flex text-gray02 text-[12px] gap-2">
                    <p className="truncate">{post.USERS?.name}</p>
                    <DateConvertor datetime={post.created_at} type="dotDate" />
                    <p>좋아요 {post.POSTLIKES[0]?.userId?.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:flex-col md:flex-col">
                  {post.postImage !== null && (
                    <img
                      src={`${STORAGE_URL}${post.postImage as string}`}
                      className="h-[124px] w-[124px] rounded-lg object-cover sm:w-[80px] sm:min-w-[80px] sm:h-[80px] mr-auto"
                    />
                  )}
                  {isExistCombination(post, "interior") && (
                    <div className="w-[46px] sm:w-8">
                      <img
                        src={`${STORAGE_URL}/wallpaper/${post.leftWallpaperId as string}`}
                        alt="벽지"
                        className="w-12 h-12 sm:w-8 sm:h-8 rounded-full relative top-[10px] border border-gray05"
                      />
                      <img
                        src={`${STORAGE_URL}/wallpaper/${post.rightWallpaperId as string}`}
                        alt="벽지"
                        className="relative w-12 h-12 border rounded-full sm:w-8 sm:h-8 border-gray05"
                      />
                      <img
                        src={`${STORAGE_URL}/tile/${post.tileId as string}`}
                        alt="바닥"
                        className="w-12 h-12 sm:w-8 sm:h-8 rounded-full relative bottom-[10px] border border-gray05"
                      />
                    </div>
                  )}
                  {isExistCombination(post, "paint") && (
                    <div>
                      <div
                        className="w-12 h-12 sm:w-8 sm:h-8 rounded-full relative top-[10px]"
                        style={{
                          backgroundColor: post.leftColorCode,
                        }}
                      />
                      <div
                        className="relative w-12 h-12 rounded-full sm:w-8 sm:h-8"
                        style={{
                          backgroundColor: post.rightColorCode,
                        }}
                      />
                      <img
                        src={`${STORAGE_URL}/tile/${post.tileId as string}`}
                        alt="바닥"
                        className="w-12 h-12 sm:w-8 sm:h-8 rounded-full relative bottom-[10px]"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const rankingList = newPostList
    ?.sort((a, b) => b.POSTLIKES[0]?.userId?.length - a.POSTLIKES[0]?.userId?.length)
    .filter((post, idx) => isExistCombination(post, "all") && idx < 10);
  /**
   * flicking 라이브러리에 적용할 수 있도록, 반복되는 element 컴포넌트를 대신합니다.
   * @returns Home화면에 보여지는 베스트 조합 랭킹 요소들을 반환합니다.
   */
  const ShowBestRankingElements = () => {
    return (
      <>
        {rankingList?.map((post, idx) => (
          <div key={post.id} className="mr-10 sm:mr-4 flicking-panel thumb has-background-primary">
            <div className="items-center gap-4 flex-column w-[125px] h-[90px] hover:cursor-pointer sm:w-[95px] sm:h-[68px] sm:gap-3">
              <p className="relative w-6 h-6 text-center selected-ranking-point">{idx + 1}</p>
              {isExistCombination(post, "interior") && (
                <div className="relative inline-flex">
                  <img
                    src={`${STORAGE_URL}/wallpaper/${post.leftWallpaperId as string}`}
                    alt="좌측 벽지"
                    className="absolute top-0 right-[13px] min-w-[48px] min-h-[48px] rounded-full border border-gray05 sm:min-w-[32px] sm:min-h-[32px] sm:right-[7px]"
                  ></img>
                  <img
                    src={`${STORAGE_URL}/wallpaper/${post.rightWallpaperId as string}`}
                    alt="우측 벽지"
                    className="absolute top-0 left-[-22.5px] min-w-[48px] min-h-[48px] rounded-full border border-gray05 sm:min-w-[32px] sm:min-h-[32px] sm:left-[-16px]"
                  ></img>
                  <img
                    src={`${STORAGE_URL}/tile/${post.tileId as string}`}
                    alt="바닥"
                    className="absolute min-w-[48px] min-h-[48px] top-0 left-[15px] rounded-full border border-gray05 sm:min-w-[32px] sm:min-h-[32px] sm:left-[8px]"
                  ></img>
                </div>
              )}
              {isExistCombination(post, "paint") &&
                post.leftColorCode !== null &&
                post.rightColorCode !== null &&
                post.tileId !== null && (
                  <div className="relative inline-flex">
                    <div
                      style={{
                        backgroundColor: post.leftColorCode,
                      }}
                      className="absolute top-0 right-[13px] min-w-[48px] min-h-[48px] rounded-full border border-gray05 sm:min-w-[32px] sm:min-h-[32px] sm:right-[7px]"
                    ></div>
                    <div
                      style={{
                        backgroundColor: post.rightColorCode,
                      }}
                      className="absolute top-0 left-[-22.5px] min-w-[48px] min-h-[48px] rounded-full border border-gray05 sm:min-w-[32px] sm:min-h-[32px] sm:left-[-16px]"
                    ></div>
                    <img
                      src={`${STORAGE_URL}/tile/${post.tileId}`}
                      alt="바닥"
                      className="absolute top-0 left-[15px] min-w-[48px] min-h-[48px] rounded-full border border-gray05 sm:min-w-[32px] sm:min-h-[32px] sm:left-[8px]"
                    ></img>
                  </div>
                )}
            </div>
          </div>
        ))}
      </>
    );
  };

  const createUrl = (type: "tile" | "wallpaper", interiorId: string) => {
    return `${STORAGE_URL}/${type}/${interiorId}`;
  };

  const ShowBestRankingPreview = () => {
    return (
      <>
        {rankingList?.map((post) => (
          <div key={post.id} className="flicking-panel full has-background-primary">
            <div className="flex contents-center overflow-hidden rounded-xl w-[1280px] h-[574px] mt-10 sm:mt-6 sm:w-[312px] sm:h-[220px] sm:mr-6 md:w-full lg:w-full">
              {isExistCombination(post, "interior") &&
                post.leftWallpaperId !== null &&
                post.rightWallpaperId !== null &&
                post.tileId !== null && (
                  <div className="cube">
                    <div
                      style={{
                        backgroundImage: `url(${createUrl("wallpaper", post.leftWallpaperId)})`,
                        backgroundSize: "100px, 100px",
                      }}
                      className="home-preview-left-wall"
                    ></div>
                    <div
                      style={{
                        backgroundImage: `url(${createUrl("wallpaper", post.rightWallpaperId)})`,
                        backgroundSize: "100px, 100px",
                      }}
                      className="home-preview-right-wall"
                    ></div>
                    <div
                      style={{
                        backgroundImage: `url(${createUrl("tile", post.tileId)})`,
                        backgroundSize: "100px, 100px",
                      }}
                      className="home-preview-floor"
                    ></div>
                  </div>
                )}
              {isExistCombination(post, "paint") &&
                post.leftColorCode !== null &&
                post.rightColorCode !== null &&
                post.tileId !== null && (
                  <div className="cube">
                    <div style={{ backgroundColor: `${post.leftColorCode}` }} className="home-preview-left-wall"></div>
                    <div
                      style={{ backgroundColor: `${post.rightColorCode}` }}
                      className="home-preview-right-wall"
                    ></div>
                    <div
                      style={{
                        backgroundImage: `url(${createUrl("tile", post.tileId)})`,
                        backgroundSize: "100px, 100px",
                      }}
                      className="home-preview-floor"
                    ></div>
                  </div>
                )}
            </div>
          </div>
        ))}
      </>
    );
  };

  return {
    SearchBar,
    showPageComponent,
    ShowBestPostElements,
    CommunityPostsForm,
    ShowBestRankingElements,
    ShowBestRankingPreview,
  };
};
