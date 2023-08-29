import { useState } from "react";

import { storageUrl } from "api/supabase";
import { DateConvertor } from "components/date";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";
import { useComments } from "hooks";
import { usePosts } from "hooks/usePosts";
import { useAuthStore } from "store";

import { CommentForm } from "./CommentForm";

export const Comments = () => {
  const { currentSession } = useAuthStore();
  const sessionId = currentSession?.user.id;
  const [openReply, setOpenReply] = useState<string | null>(null);
  const { Confirm } = useDialog();

  const { fetchCommentsMutation } = useComments();
  const { data: commentsData } = fetchCommentsMutation;

  const { fetchPostsMutation } = usePosts();
  const { data: postData } = fetchPostsMutation;

  const { deleteCommentMutation, deleteReplyMutation } = useComments();

  const handleReplyClick = (commentId: string) => {
    if (openReply === commentId) {
      setOpenReply(null);
    } else {
      setOpenReply(commentId);
    }
  };

  const deleteHandler = async (id: string, type: "comment" | "reply") => {
    try {
      const checkDelete = await Confirm("정말로 삭제하시겠습니까?");
      if (checkDelete) type === "comment" ? deleteCommentMutation.mutate(id) : deleteReplyMutation.mutate(id);
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <div className="border-t-2 border-[#E5E5E5]">
      <p className="font-semibold text-[20px] my-5">댓글</p>
      <div className="flex flex-col gap-5">
        {commentsData?.map((comment) => {
          return (
            <div key={comment.id}>
              <div className="flex border-b-2 border-[#E5E5E5] pb-[15px]">
                <img src={comment.USERS?.avatar_url} alt="profileImg" className="w-[50px] h-[50px]" />
                <div className="flex flex-col justify-between gap-1 ml-3">
                  <div className="flex gap-2">
                    <p className="font-semibold">{comment.USERS?.name}</p>
                    {postData?.userId === comment.writtenId && (
                      <div className="text-[14px] pl-[6px] text-red-500 border border-red-500 rounded-xl w-[50px]">
                        글쓴이
                      </div>
                    )}
                    {sessionId === comment.writtenId && (
                      <div className="text-red-500">
                        <button className="mr-2">수정</button>
                        <button
                          onClick={async () => {
                            await deleteHandler(comment.id, "comment");
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                  <p>{comment.content}</p>
                  {comment.commentImg != null && (
                    <img src={`${storageUrl}${comment.commentImg}`} className="my-[20px] w-[500px]" />
                  )}
                  <div className="flex gap-2 text-[#888888]">
                    <DateConvertor datetime={comment.created_at} type="dotDate" />
                    <DateConvertor datetime={comment.created_at} type="timeAgo" />
                    <button
                      onClick={() => {
                        handleReplyClick(comment.id);
                      }}
                    >
                      {openReply === comment.id ? "닫기" : "답글 쓰기"}
                    </button>
                  </div>
                </div>
              </div>
              {/* 대댓글 영역 */}
              <div>
                {comment.RECOMMENTS.map((reply) => (
                  <div key={reply.id} className="border-b-2 border-[#E5E5E5]">
                    <div className="flex py-[15px] ml-[50px]">
                      <img src={reply.USERS?.avatar_url} alt="profileImg" className="w-[50px] h-[50px]" />
                      <div className="flex flex-col gap-1 ml-3">
                        <div className="flex gap-2">
                          <p className="font-semibold">{reply.USERS?.name}</p>
                          {postData?.userId === reply.writtenId && (
                            <div className="text-[14px] pl-[6px] text-red-500 border border-red-500 rounded-xl w-[50px]">
                              글쓴이
                            </div>
                          )}
                          {sessionId === reply.writtenId && (
                            <div className="text-red-500">
                              <button className="mr-2">수정</button>
                              <button
                                onClick={async () => {
                                  await deleteHandler(reply.id, "reply");
                                }}
                              >
                                삭제
                              </button>
                            </div>
                          )}
                        </div>
                        <p>{reply.content}</p>

                        <div className="flex gap-2 text-[#888888]">
                          <DateConvertor datetime={reply.created_at} type="dotDate" />
                          <DateConvertor datetime={reply.created_at} type="timeAgo" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="ml-[50px]">
                  {openReply === comment.id && (
                    <CommentForm kind="reply" commentId={comment.id} setOpenReply={setOpenReply} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <CommentForm kind="comment" commentId="" setOpenReply={setOpenReply} />
    </div>
  );
};
