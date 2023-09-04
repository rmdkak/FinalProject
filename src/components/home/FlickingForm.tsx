import React from "react";

import { storageUrl } from "api/supabase";
import noImage from "assets/no_image.png";
import { type Tables } from "types/supabase";

interface props {
  post: Tables<"POSTS", "Row">;
}
export const FlickingForm = ({ post }: props) => {
  const isExistCombination = (post: Tables<"POSTS", "Row">) => {
    return post.tileId !== null && post.leftWallpaperId !== null && post.rightWallpaperId !== null;
  };

  return (
    <div className="w-[400px] flex-column ">
      <div className="">
        <img
          src={post.postImage != null ? `${storageUrl}${post.postImage}` : noImage}
          alt="postImg"
          className={"rounded-[8px] w-full h-[400px] object-cover"}
        />
      </div>
      <div className="w-full gap-2 mt-3 flex-column">
        <div className="flex h-12">
          <p className="text-[20px] my-auto font-semibold truncate w-1/2">{post.title}</p>
          {isExistCombination(post) && (
            <div className="inline-flex w-1/2">
              <img
                src={`${storageUrl}/wallpaper/${post.leftWallpaperId as string}`}
                alt="벽지"
                className="relative w-[48px] h-[48px] left-[76px] rounded-full"
              />
              <img
                src={`${storageUrl}/wallpaper/${post.rightWallpaperId as string}`}
                alt="벽지"
                className="relative w-[48px] h-[48px] left-[66px] rounded-full"
              />
              <img
                src={`${storageUrl}/tile/${post.tileId as string}`}
                alt="바닥"
                className="relative w-[48px] h-[48px] left-[56px] rounded-full"
              />
            </div>
          )}
        </div>
        <p className="text-[16px] text-gray02 line-clamp-2 h-[46px]">{post.content}</p>
      </div>
    </div>
  );
};
