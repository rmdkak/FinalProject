import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "api/supabase";
import { DateConvertor } from "components/date/index";
import { Pagination } from "components/pagination/index";
import { type Tables } from "types/supabase";

export const POSTS_PER_PAGE = 5;
export const storageUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;

export const Community = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState<Array<Tables<"POSTS">>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
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
    setPostList(data as Array<Tables<"POSTS">>);
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

  return (
    <>
      <div className="text-center">
        <p className="font-bold text-[30px]">커뮤니티</p>
        <p className="text-[#888888]">서브 텍스트입니다. 서브 텍스트입니다.</p>
      </div>
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="relative p-1 border border-gray-300 rounded shadow left-[18%] focus:outline-none focus:border-blue-500"
      >
        <option value="whole">전체 게시물</option>
        <option value="normal">일반 게시물</option>
        <option value="recommendation">추천 게시물</option>
      </select>
      <div className="flex justify-center">
        <div className="w-full md:w-[1300px] px-4">
          {currentFilteredPosts.map((post) => {
            return (
              <div
                key={post.id}
                className="flex flex-col md:flex-row bg-[#c2c2c2] gap-5 p-5 m-5 rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={goDetailPage}
              >
                <div className="md:w-3/4">
                  <div className="text-lg font-semibold">{post.title}</div>
                  <div className="mt-1 text-gray-600">{post.content}</div>
                </div>

                {post.wallpaperId !== null && post.tileId !== null && (
                  <>
                    <span>벽지</span>
                    <img src={`${storageUrl}/wallpaper/${post.wallpaperId}`} alt="벽지" className="w-[80px] h-[80px]" />
                    <span>바닥</span>
                    <img src={`${storageUrl}/tile/${post.tileId}`} alt="바닥" className="w-[80px] h-[80px]" />
                  </>
                )}

                <div className="text-right md:w-1/4">
                  <div className="text-gray-600">작성자:{post.nickname}</div>
                  <div className="mt-2 text-gray-500">
                    <DateConvertor datetime={post.created_at} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination totalPosts={filteredPosts.length} paginate={paginate} />
      </div>
    </>
  );
};
