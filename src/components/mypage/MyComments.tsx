import { AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";

import { type Tables } from "types/supabase";

import { BUTTON_STYLE } from "./MyInfo";

interface Props {
  userMyCommentsData: Array<Tables<"COMMENTS", "Row">>;
}

export const MyComments = ({ userMyCommentsData }: Props) => {
  if (userMyCommentsData === undefined || userMyCommentsData.length === 0) {
    return (
      <div className="border-b border-[#dddddd] py-5 my-5">
        <div>
          <p className="flex gap-1 text-lg font-medium truncate w-[500px]">
            현재 작성한 <AiOutlineComment className="self-center text-center" />
            댓글이 없습니다.
          </p>
          <p className="mt-1 h-[50px] w-[800px] overflow-hidden">새로운 댓글을 작성해보세요.</p>
          <Link to="/community" className={BUTTON_STYLE}>
            임시_커뮤니티 페이지로 이동
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {userMyCommentsData.map((comment) => {
        return (
          <>
            <p>id : {comment.id}</p>
            <p>postId : {comment.postId}</p>
            <p>userId : {comment.writtenId}</p>
            <p>content : {comment.content}</p>
            <p>created_at : {comment.created_at}</p>
          </>
        );
      })}
    </>
  );
};
