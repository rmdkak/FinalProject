import { useEffect, useState } from "react";
import { RxBookmarkFilled, RxBookmark } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

import { Arrow } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { supabase } from "api/supabase";
import { DateConvertor } from "components/date";
import { PostPagination } from "components/pagination";
import { usePostsBookmark } from "hooks";
import { useAuthStore } from "store";
import { type Tables } from "types/supabase";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/react-flicking/dist/flicking.css";

export const POSTS_PER_PAGE = 4;
export const storageUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;
const plugins = [new Arrow()];

interface FetchPostBookmark {
  postId: string;
  userId: string;
}

export const Community = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState<Array<Tables<"POSTS", "Row">>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isPostBookmarkedData, setIsPostBookmarkedData] = useState<FetchPostBookmark[]>();

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchData().catch((error) => error);
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from("POSTS").select("*");
    if (error != null) {
      console.error("Error fetching data:", error);
      return;
    }
    setPostList(data as Array<Tables<"POSTS", "Row">>);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goDetailPage = () => {
    navigate("/detail");
  };

  let filteredPosts;
  switch (selectedOption) {
    case "normal":
      filteredPosts = postList.filter((e) => e.tileId === null && e.wallpaperId === null);
      break;
    case "recommendation":
      filteredPosts = postList.filter((e) => e.tileId !== null && e.wallpaperId !== null);
      break;
    default:
      filteredPosts = postList;
      break;
  }

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentFilteredPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const { currentSession } = useAuthStore();

  const { postBookmarkResponse, addBookmarkMutation, deleteBookmarkMutation } = usePostsBookmark();
  const { data: currentBookmarkData } = postBookmarkResponse;

  useEffect(() => {
    if (currentBookmarkData == null) return;
    setIsPostBookmarkedData(currentBookmarkData);
  }, [currentBookmarkData, currentSession]);

  return (
    <div className="w-[1200px] mx-auto">
      <div className="text-center">
        <p className="font-bold text-[30px] mt-[70px]">커뮤니티</p>
        <p className="text-[#888888] mb-10">서브 텍스트입니다. 서브 텍스트입니다. 서브 텍스트입니다.</p>
      </div>

      <Flicking align={"prev"} circular={true} panelsPerView={3} plugins={plugins}>
        <div className="w-[520px] h-[254px] bg-gray-200 mx-5">1</div>
        <div className="w-[520px] h-[254px] bg-gray-200 mx-5">2</div>
        <div className="w-[520px] h-[254px] bg-gray-200 mx-5">3</div>
        {postList
          .filter((post) => post.tileId != null && post.wallpaperId)
          .map((post) => (
            <div key={post.id}>
              <div className="flex">
                <img
                  src={`${storageUrl}/wallpaper/${post.wallpaperId as string}`}
                  alt="벽지"
                  className="w-[150px] h-[150px]"
                />
                <img src={`${storageUrl}/tile/${post.tileId as string}`} alt="바닥" className="w-[150px] h-[150px]" />
              </div>
              <div className="flex flex-col w-[300px]">
                <p className="mt-8 text-lg font-medium truncate">{post.title}</p>
                <p className="mt-1 text-[#888888] line-clamp-2 h-[50px]">{post.content}</p>
                <div className="text-[#888888] flex gap-5">
                  {post.nickname}
                  <p>
                    <DateConvertor datetime={post.created_at} type="dotDate" />
                  </p>
                </div>
              </div>
            </div>
          ))}
        <ViewportSlot>
          <span className="flicking-arrow-prev is-thin"></span>
          <span className="flicking-arrow-next is-thin"></span>
        </ViewportSlot>
      </Flicking>
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="relative p-1 border border-[#dddddd] rounded shadow top-[100px] focus:outline-none"
      >
        <option value="whole">전체 게시물</option>
        <option value="normal">일반 게시물</option>
        <option value="recommendation">추천 게시물</option>
      </select>
      <div className="flex justify-center">
        <div className="w-[1200px] border-t border-[#dddddd] pt-[100px]">
          <Link
            to="/post"
            className="px-4 py-2 font-semibold text-white bg-gray-400 rounded hover:bg-gray-500 md:relative left-[1100px] bottom-[20px]"
          >
            게시물 작성
          </Link>
          {currentFilteredPosts.map((post) => {
            let isPostBookmark: FetchPostBookmark | null | undefined = null;
            if (isPostBookmarkedData !== undefined) {
              isPostBookmark = isPostBookmarkedData.find((bookmarkItem) => bookmarkItem.postId === post.id);
            }
            return (
              <div key={post.id} className="border-b border-[#dddddd] py-5 my-5">
                <div onClick={goDetailPage} className="flex justify-between gap-5 cursor-pointer">
                  <div>
                    <p className="text-lg font-medium truncate w-[500px]">{post.title}</p>
                    <p className="mt-1 h-[50px] w-[800px] overflow-hidden">{post.content}</p>
                  </div>
                  {post.wallpaperId !== null && post.tileId !== null && (
                    <>
                      <span>벽지</span>
                      <img
                        src={`${storageUrl}/wallpaper/${post.wallpaperId}`}
                        alt="벽지"
                        className="w-[80px] h-[80px]"
                      />
                      <span>바닥</span>
                      <img src={`${storageUrl}/tile/${post.tileId}`} alt="바닥" className="w-[80px] h-[80px]" />
                    </>
                  )}
                </div>
                <div className="text-[#888888] flex gap-5">
                  {post.nickname}
                  <p>
                    <DateConvertor datetime={post.created_at} type="dotDate" />
                  </p>
                  {isPostBookmark !== undefined ? (
                    <RxBookmarkFilled
                      className="text-[25px] cursor-pointer"
                      onClick={async () => {
                        if (currentSession === null) {
                          alert("북마크 기능은 로그인 후 이용가능합니다.");
                          return;
                        }
                        if (isPostBookmark == null) return;
                        deleteBookmarkMutation.mutate({
                          postId: isPostBookmark.postId,
                          userId: currentSession.user.id,
                        });
                      }}
                    />
                  ) : (
                    <RxBookmark
                      className="text-[25px] cursor-pointer"
                      onClick={async () => {
                        if (currentSession === null) {
                          alert("북마크 기능은 로그인 후 이용가능합니다.");
                          return;
                        }
                        addBookmarkMutation.mutate({ postId: post.id, userId: currentSession.user.id });
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <PostPagination totalPosts={filteredPosts.length} paginate={paginate} />
      </div>
    </div>
  );
};
