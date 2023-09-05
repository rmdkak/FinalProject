/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useNavigate, useParams } from "react-router-dom";

import { storageUrl } from "api/supabase";
import fillHeart from "assets/svgs/Heart.svg";
import lineHeart from "assets/svgs/lineheart.svg";
import share from "assets/svgs/share.svg";
import { Comments, DateConvertor, useDialog } from "components";
import { usePosts, usePostsLike } from "hooks";
import { useAuthStore, useLikeStore } from "store";

export const Detail = () => {
  const { id: paramsId } = useParams();
  const navigate = useNavigate();
  const { resetDetailPostId, setDetailPostId } = useLikeStore();
  const { currentSession } = useAuthStore();
  const { Confirm } = useDialog();
  const [isHaveBookmark, setIsHaveBookmark] = useState(false);
  const { postLikeResponse, addLikeMutation, deleteLikeMutation } = usePostsLike();
  const { data: currentBookmarkData } = postLikeResponse;
  const { fetchPostsMutation, fetchDetailMutation, deletePostMutation, wholeChangePostLikeMutation } = usePosts();
  const { data: postData } = fetchDetailMutation;
  const { data: postList } = fetchPostsMutation;
  const findCurrentIdx: number | undefined = postList?.findIndex((item) => item.id === paramsId);
  let prevPage = "";
  let nextPage = "";
  if (postList !== undefined) {
    prevPage = postList[(findCurrentIdx as number) - 1]?.id;
    nextPage = postList[(findCurrentIdx as number) + 1]?.id;
  }

  useEffect(() => {
    setDetailPostId(paramsId);
    return () => {
      resetDetailPostId();
    };
  }, [paramsId]);

  useEffect(() => {
    if (currentSession !== null && currentBookmarkData !== undefined) {
      const userId = currentSession?.user.id;
      const bookmarkUserId = currentBookmarkData.userId;

      if (userId !== undefined && bookmarkUserId !== undefined) {
        setIsHaveBookmark(bookmarkUserId.includes(userId));
      }
    }
  }, [currentSession, currentBookmarkData]);

  const addBookmark = async () => {
    if (currentSession === null) {
      const goToLogin = await Confirm(
        <>
          <p>북마크 기능은 로그인 후 이용가능합니다.</p>
          <p>로그인 하시겠습니까?</p>
        </>,
      );
      if (goToLogin) {
        navigate("/login");
      }
      return;
    }
    if (paramsId === undefined || currentBookmarkData === undefined || postData?.bookmark === undefined) return;
    const addIds = [...currentBookmarkData.userId, currentSession.user.id];
    addLikeMutation.mutate({ postId: paramsId, userId: addIds });
    wholeChangePostLikeMutation.mutate({ id: paramsId, likeState: "add", bookmark: postData?.bookmark });
  };

  const deleteBookmark = async () => {
    if (currentSession === null) {
      const goToLogin = await Confirm(
        <>
          <p>북마크 기능은 로그인 후 이용가능합니다.</p>
          <p>로그인 하시겠습니까?</p>
        </>,
      );
      if (goToLogin) {
        navigate("/login");
      }
      return;
    }
    if (paramsId === undefined || currentBookmarkData === undefined || postData?.bookmark === undefined) return;
    const deletedIds = currentBookmarkData.userId.filter((id) => id !== currentSession.user.id);
    deleteLikeMutation.mutate({ postId: paramsId, userId: deletedIds });
    wholeChangePostLikeMutation.mutate({ id: paramsId, likeState: "delete", bookmark: postData?.bookmark });
  };

  const movePageHandler = (moveEvent: "back" | "community" | "update") => {
    switch (moveEvent) {
      case "back":
        navigate(-1);
        break;
      case "community":
        navigate("/community");
        break;
      case "update":
        navigate(`/updatepost/${postData?.id}`);
        break;
    }
  };
  const movePostPageHandler = async () => {
    if (currentSession === null) {
      const confirmCheck = await Confirm(
        <div>
          <div className="flex text-[18px] justify-center mb-[10px]">
            <p className="font-medium mr-[10px]">STILE</p>
            <p>회원 이신가요?</p>
          </div>
          <div className="text-[14px] text-gray02">
            <p>해당 서비스는 로그인 후 진행 가능합니다.</p>
            <p>로그인 혹은 회원가입 해주세요.</p>
          </div>
        </div>,
      );
      if (confirmCheck) navigate("/login");
      return;
    }
    navigate("/post");
  };

  const deleteHandler = async (id: string) => {
    try {
      const checkDelete = await Confirm("정말로 삭제하시겠습니까?");

      if (checkDelete) {
        deletePostMutation.mutate(id);
        navigate("/community");
      }
    } catch (error) {
      console.error("error :", error);
    }
  };

  return (
    // 상위 배너 영역
    <div className="w-[1280px] mx-auto mt-[30px]">
      <div className="items-center flex-column">
        <p
          className="font-medium text-[32px]"
          onClick={() => {
            navigate("/community");
          }}
        >
          커뮤니티
        </p>
        <div className="w-full border-b border-black mt-[40px]"></div>
      </div>
      {/* 게시물 헤더 영역 */}
      <div className="contents-between border-b border-gray06 my-[10px] py-[20px] items-center">
        <div className="w-[1000px] my-[10px]">
          <label htmlFor="title" className="text-[18px] font-semibold">
            {postData?.title}
          </label>
          <div className="flex my-[15px] gap-[10px] text-gray02 text-[14px]">
            <a>{postData?.nickname}</a>
            <DateConvertor datetime={postData?.created_at as string} type="dotDate" />
            <DateConvertor datetime={postData?.created_at as string} type="hourMinute" />
            <div className="flex items-center gap-1">
              <FaRegHeart />
              <p>좋아요: {postData?.bookmark}</p>
            </div>
          </div>
        </div>
        {postData?.leftWallpaperId !== null && postData?.leftWallpaperId !== undefined && (
          <div className="flex gap-4">
            <div>
              <img
                className="w-16 h-16 border rounded-full bg-gray06 border-gray05"
                src={`${storageUrl}/wallpaper/${postData?.leftWallpaperId}`}
                alt="왼쪽 벽지"
              />
              <p className="text-[14px] text-center">좌측벽지</p>
            </div>
            <div>
              <img
                className="w-16 h-16 border rounded-full bg-gray06 border-gray05"
                src={`${storageUrl}/wallpaper/${postData?.rightWallpaperId}`}
                alt="오른쪽 벽지"
              />
              <p className="text-[14px] text-center">우측벽지</p>
            </div>
            <div>
              <img
                className="w-16 h-16 border rounded-full bg-gray06 border-gray05"
                src={`${storageUrl}/tile/${postData?.tileId}`}
                alt="바닥재"
              />
              <p className="text-[14px] text-center">바닥재</p>
            </div>
          </div>
        )}
        {postData?.leftColorCode !== null &&
          postData?.leftColorCode !== undefined &&
          postData?.rightColorCode !== null &&
          postData?.rightColorCode !== undefined && (
            <div className="flex gap-4">
              <div>
                <div
                  className="w-16 h-16 rounded-full bg-gray06"
                  style={{
                    backgroundColor: postData.leftColorCode,
                  }}
                />
                <p className="text-[14px] text-center">좌측벽지</p>
              </div>
              <div>
                <div
                  className="w-16 h-16 rounded-full bg-gray06"
                  style={{
                    backgroundColor: postData.rightColorCode,
                  }}
                />
                <p className="text-[14px] text-center">우측벽지</p>
              </div>
              <div>
                <img
                  className="w-16 h-16 rounded-full bg-gray06"
                  src={`${storageUrl}/tile/${postData?.tileId}`}
                  alt="바닥재"
                />
                <p className="text-[14px] text-center">바닥재</p>
              </div>
            </div>
          )}
      </div>
      {/* 컨텐츠 영역 */}
      <div className="flex-column gap-5 my-[60px]">
        {postData?.postImage !== null && postData?.postImage !== undefined && (
          <img src={`${storageUrl}${postData?.postImage}`} alt="postImg" className="w-[640px]" />
        )}
        <p>{postData?.content}</p>
      </div>
      {/* 댓글 컴포넌트 */}
      <Comments />

      <div className="flex justify-between mt-[40px]">
        <button
          className="h-[48px] px-[30px] rounded-lg border border-gray05"
          onClick={() => {
            movePageHandler("community");
          }}
        >
          커뮤니티 목록
        </button>
        {currentSession?.user.id === postData?.userId && postData !== undefined && (
          <div>
            <button
              onClick={async () => {
                await deleteHandler(postData.id);
              }}
              className="w-[160px] h-[48px] border border-gray-300 mr-[20px] rounded-[8px]"
            >
              삭제
            </button>
            <button
              onClick={() => {
                movePageHandler("update");
              }}
              type="button"
              className="mr-2 bg-point w-[160px] h-[48px] rounded-[8px]"
            >
              수정
            </button>
          </div>
        )}
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
            <span className="h-[8px] border border-gray08"></span>
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
            <span className="h-[8px] border border-gray08"></span>
            <p>{postList !== undefined ? postList[(findCurrentIdx as number) + 1].title : ""}</p>
          </div>
        )}
      </div>
      <div className="sticky gap-4 bottom-[50%] translate-x-[1350px] inline-flex flex-col">
        <button className="w-12 h-12 rounded-full bg-point" onClick={movePostPageHandler}>
          <BsPencilSquare className="w-5 h-5 mx-auto fill-gray01" />
        </button>
        {isHaveBookmark ? (
          <button onClick={deleteBookmark} className="w-12 h-12 border rounded-full border-gray06">
            <img src={fillHeart} className="mx-auto text-point" />
          </button>
        ) : (
          <button onClick={addBookmark} className="w-12 h-12 border rounded-full border-gray06">
            <img src={lineHeart} className="mx-auto text-gray01 " />
          </button>
        )}
        <button className="w-12 h-12 border rounded-full border-gray06">
          <img src={share} className="mx-auto fill-gray01" />
        </button>
      </div>
    </div>
  );
};
