/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from "react";
import { BsShare, BsPencilSquare, BsSuitHeartFill } from "react-icons/bs";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useNavigate, useParams } from "react-router-dom";

import { supabase, storageUrl } from "api/supabase";
import { Comments, DateConvertor, useDialog } from "components";
import { usePosts, usePostsLike } from "hooks";
import { useAuthStore, useLikeStore } from "store";
import { type Tables } from "types/supabase";

export const Detail = () => {
  const { id: paramsId } = useParams();
  const navigate = useNavigate();
  const { resetDetailPostId, setDetailPostId } = useLikeStore();
  const { currentSession } = useAuthStore();
  const { Confirm } = useDialog();
  const [postData, setPostData] = useState<Tables<"POSTS", "Row">>();
  const { postLikeResponse, addLikeMutation, deleteLikeMutation } = usePostsLike();
  const { data: currentBookmarkData } = postLikeResponse;
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

    // useQuery에서 북마크 조회 할 아이디 값
    setDetailPostId(paramsId);
    return () => {
      // 조회 아이디 리셋
      resetDetailPostId();
    };
  }, [paramsId]);

  const addBookmark = async () => {
    console.log("추가 작동");
    if (currentSession === null) {
      const goToLogin = await Confirm(`북마크 기능은 로그인 후 이용가능합니다.
      로그인 하시겠습니까?`);
      if (goToLogin) {
        navigate("/login");
      }
      return;
    }
    if (paramsId === undefined) return;
    if (currentBookmarkData === undefined) return;
    const addIds = [...currentBookmarkData.userId, currentSession.user.id];
    addLikeMutation.mutate({ postId: paramsId, userId: addIds });
  };

  const deleteBookmark = async () => {
    if (currentSession === null) {
      await Confirm(`북마크 기능은 로그인 후 이용가능합니다.
      로그인 하시겠습니까?`);
      return;
    }
    if (paramsId === undefined) return;
    if (currentBookmarkData === undefined) return;
    const deletedIds = currentBookmarkData.userId.filter((id) => id !== currentSession.user.id);
    deleteLikeMutation.mutate({ postId: paramsId, userId: deletedIds });
  };

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
        <div className="w-full border-b-[1px] border-black mt-[40px]"></div>
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
            <p>좋아요: {postData?.bookmark}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-column">
            <p className="text-center">바닥재</p>
            <img
              className="w-16 h-16 rounded-lg bg-gray06"
              src={`${storageUrl}/tile/${postData?.tileId}`}
              alt="바닥재"
            />
          </div>
          <div className="flex-column">
            <p className="text-center">벽지</p>
            <div className="flex">
              <img
                className="w-8 h-16 rounded-l-lg bg-gray06"
                src={`${storageUrl}/wallpaper/${postData?.leftWallpaperId}`}
                alt="왼쪽 벽지"
              />
              <img className="w-8 h-16 rounded-r-lg bg-gray06" src="" alt="오른쪽 벽지" />
            </div>
          </div>
        </div>
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
        <button
          className="w-12 h-12 rounded-full bg-point"
          onClick={() => {
            navigate("/post");
          }}
        >
          <BsPencilSquare className="w-6 h-6 mx-auto fill-gray01" />
        </button>
        {currentBookmarkData?.userId.includes(currentSession?.user.id as string) ?? false ? (
          <button onClick={deleteBookmark} className="w-12 h-12 border rounded-full border-gray06">
            <BsSuitHeartFill className="w-[24px] h-[24px] mx-auto  text-point" />
          </button>
        ) : (
          <button onClick={addBookmark} className="w-12 h-12 border rounded-full border-gray06">
            <BsSuitHeartFill className="w-[24px] h-[24px] mx-auto text-gray01 " />
          </button>
        )}
        <button className="w-12 h-12 rounded-full border-[1px] border-gray06">
          <BsShare className="w-6 h-6 mx-auto fill-gray01" />
        </button>
      </div>
    </div>
  );
};
