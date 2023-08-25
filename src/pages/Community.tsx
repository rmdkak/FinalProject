import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Arrow } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { supabase, storageUrl } from "api/supabase";
import { DateConvertor } from "components/date";
import { PostPagination } from "components/pagination";
import { PostBookmark } from "components/postBookmark";
import { type Tables } from "types/supabase";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/react-flicking/dist/flicking.css";

export const POSTS_PER_PAGE = 8;
const plugins = [new Arrow()];

export const Community = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState<Array<Tables<"POSTS", "Row">>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>("");

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

  const goDetailPage = (postId: string) => {
    navigate(`/detail/${postId}`);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setCurrentPage(1);
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
      <p>총 게시물 개수: {filteredPosts.length}</p>
      <div className="flex justify-center">
        <div className="w-[1200px] border-t border-[#dddddd] pt-[100px]">
          <Link
            to="/post"
            className="px-4 py-2 font-semibold text-white bg-gray-400 rounded hover:bg-gray-500 md:relative left-[1100px] bottom-[20px]"
          >
            게시물 작성
          </Link>
          {currentFilteredPosts.map((post) => {
            return (
              <div key={post.id} className="border-b border-[#dddddd] py-5 my-5">
                <div
                  onClick={() => {
                    goDetailPage(post.id);
                  }}
                  className="flex gap-5 cursor-pointer"
                >
                  <div className="flex">
                    {post.postImage != null && (
                      <img src={`${storageUrl}${post.postImage}`} className="mt-1 h-[100px] w-[100px] mr-5" />
                    )}
                    <div>
                      <p className="text-lg font-medium truncate w-[500px]">{post.title}</p>
                      <p className="mt-1 h-[50px] w-[800px] overflow-hidden">{post.content}</p>
                    </div>
                  </div>
                  {post.wallpaperId !== null && post.tileId !== null && (
                    <>
                      <span>벽지</span>
                      <img
                        src={`${storageUrl}/wallpaper/${post.wallpaperId}`}
                        alt="벽지"
                        className="w-[100px] h-[100px]"
                      />
                      <span>바닥</span>
                      <img src={`${storageUrl}/tile/${post.tileId}`} alt="바닥" className="w-[100px] h-[100px]" />
                    </>
                  )}
                </div>
                <div className="text-[#888888] flex gap-5 mt-5">
                  {post.nickname}
                  <p>
                    <DateConvertor datetime={post.created_at} type="dotDate" />
                  </p>
                  <PostBookmark postId={post.id} />
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
