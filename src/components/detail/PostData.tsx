import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { STORAGE_URL } from "api/supabase";
import defaultImg from "assets/defaultImg.jpg";
import { DateConvertor, Modal, ReportForm } from "components";
import { ShowRoom } from "components/service/ShowRoom";
import { useAuthStore, useModalStore } from "store";

export interface PostDataChain {
  content: string;
  created_at: string;
  id: string;
  leftColorCode: string | null;
  leftWallpaperId: string | null;
  postImage: string | null;
  rightColorCode: string | null;
  rightWallpaperId: string | null;
  tileId: string | null;
  title: string;
  userId: string | null;
  POSTLIKES: Array<{
    created_at: string;
    id: string;
    postId: string;
    userId: string[];
  }>;
  USERS: {
    avatar_url: string;
    created_at: string | null;
    email: string;
    id: string;
    idAnswer: string | null;
    idQuestion: string | null;
    name: string;
  } | null;
}

interface Props {
  postData: PostDataChain;
}

export const PostData = ({ postData }: Props) => {
  const navigate = useNavigate();
  const { onOpenModal } = useModalStore((state) => state);
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const { currentSession } = useAuthStore();

  return (
    <>
      <div className="items-center flex-column">
        <p
          className="font-medium text-[32px] hover:cursor-pointer"
          onClick={() => {
            navigate("/community");
          }}
        >
          커뮤니티
        </p>
        <div className="w-full border-b border-black mt-[40px]"></div>
      </div>
      <div className="xs:flex-column xs:items-start xs:gap-8 contents-between border-b border-gray06 py-[20px] items-center px-3">
        <div>
          <label htmlFor="title" className="text-[18px] font-semibold xs:text-[16px]">
            {postData?.title}
          </label>
          <div className="flex items-center mt-[14px] gap-2 text-gray02 text-[14px] xs:text-[12px]">
            <img
              src={postData?.USERS?.avatar_url === "" ? defaultImg : postData?.USERS?.avatar_url}
              alt="userImg"
              className="w-8 h-8 border rounded-full xs:w-6 xs:h-6 border-gray05 object"
            />
            <p>{postData?.USERS !== null ? postData?.USERS.name : null}</p>
            <DateConvertor datetime={postData?.created_at} type="dotDate" />
            <div className="flex items-center gap-1">
              <FaRegHeart />
              <p>좋아요 {postData?.POSTLIKES[0]?.userId?.length}</p>
            </div>
            {currentSession !== null ? (
              <button onClick={onOpenModal} className="leading-[1px] hover:border-b border-gray02">
                신고하기
              </button>
            ) : (
              <></>
            )}
            {
              <Modal title="신고하기">
                <ReportForm currentSession={currentSession} postData={postData} />
              </Modal>
            }
          </div>
        </div>
        {postData?.leftWallpaperId !== null && postData?.leftWallpaperId !== undefined && (
          <div
            className="flex gap-3"
            onMouseEnter={() => {
              setPreviewModal(true);
            }}
            onMouseLeave={() => {
              setPreviewModal(false);
            }}
          >
            <div className="items-center gap-2 flex-column">
              <img
                className="w-16 h-16 border rounded-full sm:w-8 sm:h-8 border-gray05"
                src={`${STORAGE_URL}/wallpaper/${postData?.leftWallpaperId}`}
                alt="왼쪽 벽지"
              />
              <p className="sm:text-[12px] text-[14px] text-center">좌측벽지</p>
            </div>
            <div className="items-center gap-2 flex-column">
              <img
                className="w-16 h-16 border rounded-full sm:w-8 sm:h-8 border-gray05"
                src={`${STORAGE_URL}/wallpaper/${postData.rightWallpaperId as string}`}
                alt="오른쪽 벽지"
              />
              <p className="sm:text-[12px] text-[14px] text-center">우측벽지</p>
            </div>
            <div className="items-center gap-2 flex-column">
              <img
                className="w-16 h-16 border rounded-full sm:w-8 sm:h-8 border-gray05"
                src={`${STORAGE_URL}/tile/${postData.tileId as string}`}
                alt="바닥재"
              />
              <p className="sm:text-[12px] text-[14px] text-center">바닥재</p>
            </div>
          </div>
        )}
        {postData?.leftColorCode !== null &&
          postData?.leftColorCode !== undefined &&
          postData?.rightColorCode !== null &&
          postData?.rightColorCode !== undefined && (
            <div
              className="flex gap-3"
              onMouseEnter={() => {
                setPreviewModal(true);
              }}
              onMouseLeave={() => {
                setPreviewModal(false);
              }}
            >
              <div className="items-center gap-2 flex-column">
                <div
                  className="w-16 h-16 border rounded-full border-gray05 sm:w-8 sm:h-8"
                  style={{
                    backgroundColor: postData.leftColorCode,
                  }}
                />
                <p className="sm:text-[12px] text-[14px] text-center">좌측벽지</p>
              </div>
              <div className="items-center gap-2 flex-column">
                <div
                  className="w-16 h-16 border rounded-full border-gray05 sm:w-8 sm:h-8"
                  style={{
                    backgroundColor: postData.rightColorCode,
                  }}
                />
                <p className="sm:text-[12px] text-[14px] text-center">우측벽지</p>
              </div>
              <div className="items-center gap-2 flex-column">
                <img
                  className="w-16 h-16 border rounded-full border-gray05 sm:w-8 sm:h-8"
                  src={`${STORAGE_URL}/tile/${postData.tileId as string}`}
                  alt="바닥재"
                />
                <p className="sm:text-[12px] text-[14px] text-center">바닥재</p>
              </div>
            </div>
          )}
      </div>
      {previewModal && (
        <div className="absolute top-[380px] translate-x-[780px]">
          <ShowRoom
            leftWallpaperBg={postData.leftWallpaperId}
            rightWallpaperBg={postData.rightWallpaperId}
            leftWallpaperPaintBg={postData.leftColorCode}
            rightWallpaperPaintBg={postData.rightColorCode}
            tileBg={postData.tileId}
            page={"detail"}
          />
        </div>
      )}
      <div className="flex-column gap-5 mt-[15px] mb-[50px] px-3">
        {postData?.postImage !== null && postData?.postImage !== undefined && (
          <img src={`${STORAGE_URL}${postData?.postImage}`} alt="postImg" className="w-[640px]" />
        )}
        <pre className="w-full break-words whitespace-pre-wrap ">{postData?.content}</pre>
      </div>
    </>
  );
};
