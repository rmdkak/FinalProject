import { RxPencil2 } from "react-icons/rx";
import { Link } from "react-router-dom";

import { DateConvertor, PostBookmark } from "components";
import { type Tables } from "types/supabase";

import { BUTTON_STYLE } from "./MyInfo";

const STORAGE_URL = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;

interface Props {
  userMyPostsData: Array<Tables<"POSTS", "Row">>;
}

export const MyPosts = ({ userMyPostsData }: Props) => {
  if (userMyPostsData === undefined || userMyPostsData.length === 0) {
    return (
      <div className="border-b border-[#dddddd] py-5 my-5">
        <div>
          <p className="flex gap-1 text-lg font-medium truncate w-[500px]">
            현재 작성한 <RxPencil2 className="self-center text-center" />
            글이 없습니다.
          </p>
          <p className="mt-1 h-[50px] w-[800px] overflow-hidden">새로운 글을 작성해보세요.</p>
          <Link to="/post" className={BUTTON_STYLE}>
            임시_글 작성 페이지 이동
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {userMyPostsData.map((post) => {
        return (
          <div key={post.id} className="border-b border-[#dddddd] py-5 my-5">
            <Link to={`detail/${post.id}`} className="flex justify-between gap-5 cursor-pointer">
              <div>
                <p className="text-lg font-medium truncate w-[500px]">{post.title}</p>
                <p className="mt-1 h-[50px] w-[800px] overflow-hidden">{post.content}</p>
              </div>
              {post.leftWallpaperId !== null && post.tileId !== null && (
                <>
                  <span>벽지</span>
                  <img
                    src={`${STORAGE_URL}/wallpaper/${post.leftWallpaperId}`}
                    alt="벽지"
                    className="w-[80px] h-[80px]"
                  />
                  <span>바닥</span>
                  <img src={`${STORAGE_URL}/tile/${post.tileId}`} alt="바닥" className="w-[80px] h-[80px]" />
                </>
              )}
            </Link>
            <div className="text-[#888888] flex gap-5">
              <p>{post.nickname}</p>
              <p>
                <DateConvertor datetime={post.created_at} type="dotDate" />
              </p>
              <PostBookmark postId={post.id} />
            </div>
          </div>
        );
      })}
    </>
  );
};
