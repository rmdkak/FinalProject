import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Arrow } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { supabase, storageUrl } from "api/supabase";
import { DateConvertor, PostBookmark } from "components";
import { usePagination } from "hooks";
import { useAuthStore } from "store";
import { type Tables } from "types/supabase";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/react-flicking/dist/flicking.css";

export const POSTS_PER_PAGE = 8;
const plugins = [new Arrow()];

export const Community = () => {
  const navigate = useNavigate();
  const { currentSession } = useAuthStore();
  const [postList, setPostList] = useState<Array<Tables<"POSTS", "Row">>>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    fetchData().catch((error) => error);
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from("POSTS").select("*").order("created_at", { ascending: false });
    if (error != null) {
      console.error("Error fetching data:", error);
      return;
    }
    setPostList(data as Array<Tables<"POSTS", "Row">>);
  };

  const goDetailPage = (postId: string) => {
    navigate(`/detail/${postId}`);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  let filteredPosts;
  switch (selectedOption) {
    case "normal":
      filteredPosts = postList.filter((e) => e.tileId === null && e.leftWallpaperId === null);
      break;
    case "recommendation":
      filteredPosts = postList.filter((e) => e.tileId !== null && e.leftWallpaperId !== null);
      break;
    default:
      filteredPosts = postList;
      break;
  }

  const { pageData, showPageComponent } = usePagination({
    data: filteredPosts,
    dataLength: filteredPosts.length,
    postPerPage: 8,
  });

  const deletePostHandler = async (id: string) => {
    try {
      const checkDelete = window.confirm("정말로 삭제하시겠습니까?");
      if (checkDelete) await supabase.from("POSTS").delete().eq("id", id);
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <div className="w-[1280px] mx-auto mt-[40px]">
      <div className="text-center">
        <p className="font-bold text-[30px]">커뮤니티</p>
        <p className="text-[#888888] mb-10">서브 텍스트입니다. 서브 텍스트입니다. 서브 텍스트입니다.</p>
      </div>
      <div className="mb-[20px]">
        <Flicking align={"prev"} circular={true} panelsPerView={3} plugins={plugins}>
          {postList
            .filter((post) => post.tileId != null && post.leftWallpaperId)
            .map((post) => (
              <div key={post.id} className="flex flex-col items-center">
                <div className="flex">
                  <img
                    src={`${storageUrl}/wallpaper/${post.leftWallpaperId as string}`}
                    alt="벽지"
                    className="w-[150px] h-[150px]"
                  />
                  <img src={`${storageUrl}/tile/${post.tileId as string}`} alt="바닥" className="w-[150px] h-[150px]" />
                </div>
                <div className="w-[300px]">
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
      </div>
      <div className="flex justify-center">
        <div className="w-[1280px] border-t border-[#dddddd]">
          <div className="flex justify-between mt-[30px]">
            <div className="flex gap-3">
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="p-1 border border-[#dddddd] rounded shadow focus:outline-none"
              >
                <option value="whole">전체 게시물</option>
                <option value="normal">일반 게시물</option>
                <option value="recommendation">추천 게시물</option>
              </select>
              <p className="mt-[8px]">총 게시물 개수: {filteredPosts.length}</p>
            </div>
            <Link to="/post" className="px-4 py-2 font-semibold text-white bg-gray-400 rounded hover:bg-gray-500">
              게시물 작성
            </Link>
          </div>
          {pageData.map((post) => {
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
                      <img src={`${storageUrl}${post.postImage as string}`} className="mt-1 h-[100px] w-[100px] mr-5" />
                    )}
                    <div>
                      <p className="text-lg font-medium truncate w-[500px]">{post.title}</p>
                      <p className="mt-1 h-[50px] w-[800px] overflow-hidden">{post.content}</p>
                    </div>
                  </div>
                  {post.leftWallpaperId !== null && post.tileId !== null && (
                    <>
                      <span>벽지</span>
                      <img
                        src={`${storageUrl}/wallpaper/${post.leftWallpaperId as string}`}
                        alt="벽지"
                        className="w-[100px] h-[100px]"
                      />
                      <span>바닥</span>
                      <img
                        src={`${storageUrl}/tile/${post.tileId as string}`}
                        alt="바닥"
                        className="w-[100px] h-[100px]"
                      />
                    </>
                  )}
                </div>
                <div className="text-[#888888] flex gap-5 mt-5">
                  {post.nickname}
                  <p>
                    <DateConvertor datetime={post.created_at} type="dotDate" />
                  </p>
                  {currentSession?.user.id === post.userId && (
                    <div className="text-red-500">
                      <button className="mr-2">수정</button>
                      <button
                        onClick={() => {
                          void deletePostHandler(post.id);
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
      <div className="flex justify-center">{showPageComponent}</div>
    </div>
  );
};
