/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { supabase, storageUrl } from "api/supabase";
import { DateConvertor } from "components/date";
// import { useComments } from "hooks";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";
import { useComments } from "hooks";
import { usePosts } from "hooks/usePosts";
import { useAuthStore } from "store";
// import { type Tables } from "types/supabase";

import { CommentForm } from "./CommentForm";

// type ReplyType = Tables<"RE-COMMENTS", "Row">;

// interface ReplyWithUser extends ReplyType {
//   user: {
//     avatar_url: string;
//     name: string;
//   };
// }

export const Comments = () => {
  const { currentSession } = useAuthStore();
  // const [replyData, setReplyData] = useState<ReplyWithUser[]>([]);
  const [openReply, setOpenReply] = useState<string | null>(null);
  const sessionId = currentSession?.user.id;
  const { Confirm } = useDialog();
  const { fetchCommentsMutation, fetchReplyMutation } = useComments();

  const { data: commentsData } = fetchCommentsMutation;
  const { data: replyData } = fetchReplyMutation;
  console.log('replyData :', replyData);

  const { fetchPostsMutation } = usePosts();
  const { data: postData } = fetchPostsMutation;

  // const fetchUserById = async (userId: string) => {
  //   const { data, error } = await supabase.from("USERS").select("avatar_url, name").eq("id", userId).single();
  //   if (error != null) {
  //     console.error("Error fetching user data:", error.message);
  //     return null;
  //   }
  //   return data;
  // };

  useEffect(() => {
    // const fetchData = async () => {
    //   const { data: replyData } = await supabase.from("RE-COMMENTS").select("*").order("created_at");
    //   if (replyData !== null) {
    //     const replyWithUserData = await Promise.all(
    //       replyData.map(async (reply) => {
    //         const userData = await fetchUserById(reply.writtenId);
    //         if (userData == null) return;
    //         return { ...reply, user: userData };
    //       }),
    //     );
    //     // setReplyData(replyWithUserData as ReplyWithUser[]);
    //   }
    // };

    // fetchData().catch((error) => {
    //   console.error("Error fetching data:", error.message);
    // });
  }, []);

  const handleReplyClick = (commentId: string) => {
    if (openReply === commentId) {
      setOpenReply(null);
    } else {
      setOpenReply(commentId);
    }
  };

  const deleteCommentHandler = async (commentId: string) => {
    try {
      const checkDelete = await Confirm("정말로 삭제하시겠습니까?");
      if (checkDelete) await supabase.from("COMMENTS").delete().eq("id", commentId);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const deleteReplyHandler = async (replyId: string) => {
    try {
      const checkDelete = await Confirm("정말로 삭제하시겠습니까?");
      if (checkDelete) await supabase.from("RE-COMMENTS").delete().eq("id", replyId);
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
                        작성자
                      </div>
                    )}
                    {sessionId === comment.writtenId && (
                      <div className="text-red-500">
                        <button className="mr-2">수정</button>
                        <button
                          onClick={() => {
                            void deleteCommentHandler(comment.id);
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
                {replyData
                  ?.filter((reply) => reply.commentId === comment.id)
                  .map((reply) => (
                    <div key={reply.id} className="border-b-2 border-[#E5E5E5]">
                      <div className="flex py-[15px] ml-[50px]">
                        <img src={reply.USERS?.avatar_url} alt="profileImg" className="w-[50px] h-[50px]" />
                        <div className="flex flex-col gap-1 ml-3">
                          <div className="flex gap-2">
                            <p className="font-semibold">{reply.USERS?.name}</p>
                            {postData?.userId === comment.writtenId && (
                              <div className="text-[14px] pl-[6px] text-red-500 border border-red-500 rounded-xl w-[50px]">
                                작성자
                              </div>
                            )}
                            {sessionId === reply.writtenId && (
                              <div className="text-red-500">
                                <button className="mr-2">수정</button>
                                <button
                                  onClick={() => {
                                    void deleteReplyHandler(reply.id);
                                  }}
                                >
                                  삭제
                                </button>
                              </div>
                            )}
                          </div>
                          <p>{reply.content}</p>

                          <div className="flex gap-2 text-[#888888]">
                            <DateConvertor datetime={comment.created_at} type="dotDate" />
                            <DateConvertor datetime={comment.created_at} type="timeAgo" />
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
