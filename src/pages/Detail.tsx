/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { supabase, storageUrl } from "api/supabase";
import { Comments, DateConvertor } from "components";
import { type Tables } from "types/supabase";

export const Detail = () => {
  const { id: paramsId } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<Tables<"POSTS", "Row">>();
  
  useEffect(() => {
    const fetchData = async () => {
      const { data: postData } = await supabase.from("POSTS").select("*").eq("id", paramsId).single();
      if (postData !== null) setPostData(postData);
    };
    fetchData().catch((error) => {
      console.error("Error fetching data:", error.message);
    });
  }, []);

  const movePageHandler = (moveEvent: string) => {
    switch (moveEvent) {
      case "back":
        navigate(-1);
        break;
      case "community":
        navigate("/community");
        break;
    }
  };

  return (
    // 상위 배너 영역
    <div className="w-[1280px] mx-auto mt-[30px]">
      <div className="items-center flex-column">
        <p className="font-bold text-[30px]">커뮤니티</p>
        <p className="text-gray02">서브 텍스트입니다. 서브 텍스트입니다.</p>
        <div className="w-full border-b-2 border-[#1A1A1A] mt-[40px]"></div>
      </div>
      {/* 게시물 헤더 영역 */}
      <div className="contents-between border-b-2 border-gray06 my-[10px] p-[10px]">
        <div className="w-[1000px]">
          <label htmlFor="title" className="text-[18px] font-semibold">
            {postData?.title}
          </label>
          <div className="flex my-[15px] gap-[10px] text-gray02">
            <a>{postData?.nickname}</a>
            <DateConvertor datetime={postData?.created_at as string} type="dotDate" />
            <DateConvertor datetime={postData?.created_at as string} type="hourMinute" />
            <p>북마크: {postData?.bookmark}</p>
          </div>
        </div>
        <button className="bg-[#5D5D5D] h-[48px] px-[24px] text-white">북마크 버튼</button>
      </div>
      {/* 컨텐츠 영역 */}
      <div className="flex-column gap-5 my-[60px]">
        {postData?.postImage !== null && (
          <img src={`${storageUrl}${postData?.postImage}`} alt="postImg" className="w-full" />
        )}
        {postData?.leftWallpaperId !== null && postData?.tileId !== null && (
          <div className="flex">
            <img
              src={`${storageUrl}/wallpaper/${postData?.leftWallpaperId}`}
              alt="벽지"
              className="w-[150px] h-[150px]"
            />
            <img src={`${storageUrl}/tile/${postData?.tileId}`} alt="바닥" className="w-[150px] h-[150px]" />
          </div>
        )}
        <p>{postData?.content}</p>
      </div>

      <Comments />

      <div className="contents-between mt-[40px]">

        <button
          type="button"
          className="bg-[#DDDDDD] h-[48px] px-[24px] text-gray-500 mr-5"
          onClick={() => {
            movePageHandler("back");
          }}
        >
          이전으로
        </button>
        <button
          className="bg-[#5D5D5D] h-[48px] px-[24px] text-white"
          onClick={() => {
            movePageHandler("community");
          }}
        >
          커뮤니티 목록
        </button>
      </div>
    </div>
  );
};
