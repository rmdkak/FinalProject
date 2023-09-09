import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";

import { STORAGE_URL } from "api/supabase";
import { DateConvertor } from "components";
import { ShowRoom } from "components/service/ShowRoom";
import { type Tables } from "types/supabase";

interface PostProps {
  postData: Tables<"POSTS", "Row">;
}

export const PostData = ({ postData }: PostProps) => {
  const [previewModal, setPreviewModal] = useState<boolean>(false);

  return (
    <>
      <div className="items-center flex-column">
        <p className="font-medium text-[32px]">커뮤니티</p>
        <div className="w-full border-b border-black mt-[40px]"></div>
      </div>

      <div className="contents-between border-b border-gray06 my-[10px] py-[20px] items-center">
        <div className="w-[1000px] my-[10px]">
          <label htmlFor="title" className="text-[18px] font-semibold">
            {postData?.title}
          </label>
          <div className="flex my-[15px] gap-[10px] text-gray02 text-[14px]">
            <a>{postData?.nickname}</a>
            <DateConvertor datetime={postData?.created_at} type="dotDate" />
            <DateConvertor datetime={postData?.created_at} type="hourMinute" />
            <div className="flex items-center gap-1">
              <FaRegHeart />
              <p>좋아요 {postData?.bookmark}</p>
            </div>
          </div>
        </div>
        {postData?.leftWallpaperId !== null && postData?.leftWallpaperId !== undefined && (
          <div
            className="flex gap-4"
            onMouseEnter={() => {
              setPreviewModal(true);
            }}
            onMouseLeave={() => {
              setPreviewModal(false);
            }}
          >
            <div>
              <img
                className="w-16 h-16 border rounded-full bg-gray06 border-gray05"
                src={`${STORAGE_URL}/wallpaper/${postData?.leftWallpaperId}`}
                alt="왼쪽 벽지"
              />
              <p className="text-[14px] text-center">좌측벽지</p>
            </div>
            <div>
              <img
                className="w-16 h-16 border rounded-full bg-gray06 border-gray05"
                src={`${STORAGE_URL}/wallpaper/${postData.rightWallpaperId as string}`}
                alt="오른쪽 벽지"
              />
              <p className="text-[14px] text-center">우측벽지</p>
            </div>
            <div>
              <img
                className="w-16 h-16 border rounded-full bg-gray06 border-gray05"
                src={`${STORAGE_URL}/tile/${postData.tileId as string}`}
                alt="바닥재"
              />
              <p className="text-[14px] text-center">바닥재</p>
            </div>
          </div>
        )}
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
                  src={`${STORAGE_URL}/tile/${postData.tileId as string}`}
                  alt="바닥재"
                />
                <p className="text-[14px] text-center">바닥재</p>
              </div>
            </div>
          )}
      </div>

      <div className="flex-column gap-5 mt-[15px] mb-[50px]">
        {postData?.postImage !== null && postData?.postImage !== undefined && (
          <img src={`${STORAGE_URL}${postData?.postImage}`} alt="postImg" className="w-[640px]" />
        )}
        <pre className="w-full break-words whitespace-pre-wrap ">{postData?.content}</pre>
      </div>
    </>
  );
};
