/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from "react";
import { BsShare, BsPencilSquare, BsSuitHeartFill } from "react-icons/bs";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useNavigate, useParams } from "react-router-dom";

import { supabase, storageUrl } from "api/supabase";
import { Comments, DateConvertor } from "components";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";
import { usePosts } from "hooks";
import { useAuthStore } from "store";
import { type Tables } from "types/supabase";

export const Detail = () => {
  const { id: paramsId } = useParams();
  const { currentSession } = useAuthStore();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<Tables<"POSTS", "Row">>();
  const { Confirm } = useDialog();
  const { fetchPostsMutation } = usePosts();
  const { data: postList } = fetchPostsMutation;
  const findCurrentIdx: number | undefined = postList?.findIndex((item) => item.id === paramsId);
  let prevPage = "";
  let nextPage = "";
  if (postList !== undefined) {
    prevPage = postList[(findCurrentIdx as number) - 1]?.id;
    nextPage = postList[(findCurrentIdx as number) + 1]?.id;
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data: postData } = await supabase.from("POSTS").select("*").eq("id", paramsId).single();
      if (postData !== null) setPostData(postData);
    };
    fetchData().catch((error) => {
      console.error("Error fetching data:", error.message);
    });
  }, [paramsId]);

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
  const movePostPageHandler = async () => {
    if (currentSession === null) {
      const confirmCheck = await Confirm("게시글 작성은 로그인 후 이용 가능합니다. 로그인 페이지로 이동하시겠습니까?");
      if (confirmCheck) navigate("/login");
      return;
    }
    navigate("/post");
  };
  return (
    // 상위 배너 영역
    <div className="w-[1280px] mx-auto mt-[30px]">
      <div className="items-center flex-column">
        <p className="font-bold text-[30px]">커뮤니티</p>
        <div className="w-full border-b border-black mt-[40px]"></div>
      </div>
      {/* 게시물 헤더 영역 */}
      <div className="contents-between border-b border-gray06 my-[10px] p-[10px]">
        <div className="w-[1000px] my-[10px]">
          <label htmlFor="title" className="text-[18px] font-semibold">
            {postData?.title}
          </label>
          <div className="flex my-[15px] gap-[10px] text-gray02">
            <a>{postData?.nickname}</a>
            <DateConvertor datetime={postData?.created_at as string} type="dotDate" />
            <DateConvertor datetime={postData?.created_at as string} type="hourMinute" />
            <p>좋아요: {postData?.bookmark}</p>
          </div>
        </div>
        {postData?.tileId !== null && postData?.leftWallpaperId !== null && postData?.rightWallpaperId !== null && (
          <div className="flex gap-4">
            <div className="flex-column">
              <p className="text-center">벽지</p>
              <div className="flex">
                <img
                  className="w-8 h-16 rounded-l-lg bg-gray06"
                  src={`${storageUrl}/wallpaper/${postData?.leftWallpaperId}`}
                  alt="왼쪽 벽지"
                />
                <img
                  className="w-8 h-16 rounded-r-lg bg-gray06"
                  src={`${storageUrl}/wallpaper/${postData?.rightWallpaperId}`}
                  alt="오른쪽 벽지"
                />
              </div>
            </div>
            <div className="flex-column">
              <p className="text-center">바닥재</p>
              <img
                className="w-16 h-16 rounded-lg bg-gray06"
                src={`${storageUrl}/tile/${postData?.tileId}`}
                alt="바닥재"
              />
            </div>
          </div>
        )}
      </div>
      {/* 컨텐츠 영역 */}
      <div className="flex-column gap-5 my-[60px]">
        {postData?.postImage !== null && (
          <img src={`${storageUrl}${postData?.postImage}`} alt="postImg" className="w-[640px]" />
        )}
        <p>{postData?.content}</p>
      </div>
      {/* 댓글 컴포넌트 */}
      <Comments />

      <div className=" mt-[40px]">
        <button
          className="h-[48px] px-[67px] rounded-lg border-[1px] border-gray05"
          onClick={() => {
            movePageHandler("community");
          }}
        >
          목록
        </button>
      </div>
      <div className="mt-20 flex-column border-t-[1px] border-gray06">
        {prevPage !== undefined && (
          <div
            className="flex gap-[10px] items-center py-6 border-b-[1px] border-gray06 hover:cursor-pointer"
            onClick={() => {
              navigate(`/detail/${prevPage}`);
            }}
          >
            <SlArrowUp className="fill-gray02" />
            <label className="text-gray02">이전글 보기</label>
            <span className="h-[8px] border-[1px] border-gray08"></span>
            <p>{postList !== undefined ? postList[(findCurrentIdx as number) - 1].title : ""}</p>
          </div>
        )}
        {nextPage !== undefined && (
          <div
            className="flex gap-[10px] items-center py-6 border-b-[1px] border-gray06 hover:cursor-pointer"
            onClick={() => {
              navigate(`/detail/${nextPage}`);
            }}
          >
            <SlArrowDown className="fill-gray02" />
            <label className="text-gray02">다음글 보기</label>
            <span className="h-[8px] border-[1px] border-gray08"></span>
            <p>{postList !== undefined ? postList[(findCurrentIdx as number) + 1].title : ""}</p>
          </div>
        )}
      </div>
      <div className="sticky gap-4 bottom-[35%] translate-x-[1350px] inline-flex flex-col">
        <button className="w-12 h-12 rounded-full bg-point" onClick={movePostPageHandler}>
          <BsPencilSquare className="w-6 h-6 mx-auto fill-gray01" />
        </button>
        <button className="w-12 h-12 rounded-full border-[1px] border-gray06">
          <BsSuitHeartFill className="w-6 h-6 mx-auto fill-gray01" />
        </button>
        <button className="w-12 h-12 rounded-full border-[1px] border-gray06">
          <BsShare className="w-6 h-6 mx-auto fill-gray01" />
        </button>
      </div>
    </div>
  );
};
