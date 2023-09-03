import { useRef, useState } from "react";
import { AiFillCloseCircle, AiOutlineCamera } from "react-icons/ai";
import { PiArrowBendDownRightThin } from "react-icons/pi";
import uuid from "react-uuid";

import { deleteCommentImageHandler, saveCommentImageHandler, storageUrl } from "api/supabase";
import { useDialog, DateConvertor } from "components";
import { useComments } from "hooks";
import { usePosts } from "hooks/usePosts";
import { useAuthStore } from "store";

import { CommentForm } from "./CommentForm";

export const Comments = () => {
  const { currentSession } = useAuthStore();
  const sessionId = currentSession?.user.id;
  const [openReply, setOpenReply] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [currentImg, setCurrentImg] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");
  const [selectedCommentImgFile, setSelectedCommentImgFile] = useState<File | null>(null);

  const { Confirm, Alert } = useDialog();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { fetchCommentsMutation } = useComments();
  const { data: commentsData } = fetchCommentsMutation;

  const { fetchDetailMutation } = usePosts();
  const { data: detailData } = fetchDetailMutation;

  const { deleteCommentMutation, deleteReplyMutation, updateCommentMutation, updateReplyMutation } = useComments();

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

  const autoResizeTextArea = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
    setNewComment(element.value);
  };

  const updateCommentHandler = async (id: string, type: "comment" | "reply") => {
    if (newComment === "") {
      await Alert("댓글은 1글자 이상 입력해주세요.");
      return;
    }
    const UUID = uuid();
    const newCommentImg = selectedCommentImgFile === null ? currentImg : `/commentImg/${UUID}`;
    if (selectedCommentImgFile !== null) {
      await saveCommentImageHandler({ id: UUID, commentImgFile: selectedCommentImgFile });
      await deleteCommentImageHandler(currentImg);
    }
    if (type === "comment") updateCommentMutation.mutate({ commentId: id, newComment, newCommentImg });
    if (type === "reply") updateReplyMutation.mutate({ replyId: id, newReply: newComment });
    setSelectedId("");
  };

  const openCommentUpdateForm = (id: string, content: string, commentImg?: string | null | undefined) => {
    setSelectedId(id);
    setNewComment(content);
    if (commentImg !== null && commentImg !== undefined) setCurrentImg(commentImg);
    if (textareaRef.current !== null) {
      textareaRef.current.focus();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file != null) {
      setSelectedCommentImgFile(file);
    }
  };

  return (
    <div className="border-t border-gray06">
      <p className="mt-[70px] font-normal text-gray02">
        댓글 <span className="text-black">{commentsData?.length}</span>개
      </p>
      <CommentForm kind="comment" commentId="" setOpenReply={setOpenReply} />
      <div className="border-t flex-column border-gray05">
        {/* 댓글 영역 */}
        {commentsData?.map((comment) => {
          return (
            <div key={comment.id}>
              <div className="flex py-5 border-b border-gray06 ">
                <img src={comment.USERS?.avatar_url} alt="profileImg" className="w-[40px] h-[40px]" />
                <div className="flex flex-col justify-between w-full gap-2 ml-3">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{comment.USERS?.name}</p>
                    {detailData?.userId === comment.userId && (
                      <div className=" bg-point border-none rounded-[4px] w-[50px] h-[20px] flex justify-center items-center">
                        <p className="text-[12px]">글쓴이</p>
                      </div>
                    )}
                  </div>
                  {selectedId === comment.id ? (
                    <textarea
                      autoFocus={selectedId === comment.id}
                      ref={textareaRef}
                      rows={3}
                      maxLength={500}
                      defaultValue={comment.content}
                      onChange={(e) => {
                        autoResizeTextArea(e.target);
                      }}
                      className="p-1 rounded-[4px] border border-black text-[14px] outline-none"
                    />
                  ) : (
                    <p className="text-[14px]">{comment.content}</p>
                  )}
                  {comment.commentImg !== null && (
                    <>
                      <img
                        src={
                          selectedCommentImgFile === null
                            ? `${storageUrl}${comment.commentImg}`
                            : selectedId === comment.id
                            ? URL.createObjectURL(selectedCommentImgFile)
                            : `${storageUrl}${comment.commentImg}`
                        }
                        className={`my-[20px] w-[300px] h-[250px] ${
                          selectedId === comment.id ? "border border-black" : ""
                        }`}
                      />
                      {selectedId === comment.id && (
                        <>
                          <div className="relative">
                            <AiFillCloseCircle className="absolute bottom-[260px] left-[285px] z-10 text-[25px] bg-gray03 text-white cursor-pointer rounded-full" />
                            <label htmlFor="inputImg">
                              <AiOutlineCamera className="text-gray02 cursor-pointer text-[40px] absolute bottom-[20px] left-[305px]" />
                              <input type="file" id="inputImg" className="hidden" onChange={handleImageChange} />
                            </label>
                          </div>
                        </>
                      )}
                    </>
                  )}
                  <div className="flex gap-2 text-gray02 text-[14px]">
                    <DateConvertor datetime={comment.created_at} type="timeAgo" />
                    <div className="relative">
                      <div className="absolute w-[1px] h-[10px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]"></div>
                    </div>
                    <button
                      onClick={() => {
                        handleReplyClick(comment.id);
                      }}
                    >
                      {openReply === comment.id ? "닫기" : "답글 쓰기"}
                    </button>
                    {sessionId === comment.userId && (
                      <>
                        <div className="relative">
                          <div className="absolute w-[1px] h-[10px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]"></div>
                        </div>
                        {selectedId !== comment.id ? (
                          <>
                            <button
                              type="button"
                              className="text-red-500"
                              onClick={() => {
                                openCommentUpdateForm(comment.id, comment.content, comment.commentImg);
                              }}
                            >
                              수정
                            </button>
                            <div className="relative">
                              <div className="absolute w-[1px] h-[10px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]"></div>
                            </div>
                            <button
                              className="text-red-500"
                              onClick={async () => {
                                await deleteHandler(comment.id, "comment");
                              }}
                            >
                              삭제
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="text-black"
                              onClick={async () => {
                                await updateCommentHandler(comment.id, "comment");
                              }}
                            >
                              완료
                            </button>
                            <div className="relative">
                              <div className="absolute w-[1px] h-[10px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]"></div>
                            </div>
                            <button
                              type="button"
                              className="text-black"
                              onClick={() => {
                                setSelectedId("");
                              }}
                            >
                              취소
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* 대댓글 영역 */}
              <div>
                {comment.RECOMMENTS.map((reply) => (
                  <div key={reply.id} className="border-b border-[#E5E5E5]">
                    <div className="flex py-[15px]">
                      <PiArrowBendDownRightThin className="text-[30px] mx-[10px]" />
                      <img src={reply.USERS?.avatar_url} alt="profileImg" className="w-[40px] h-[40px]" />
                      <div className="flex flex-col w-full gap-1 ml-3">
                        <div className="flex gap-2">
                          <p className="font-semibold">{reply.USERS?.name}</p>
                          {detailData?.userId === reply.userId && (
                            <div className=" bg-point border-none rounded-[4px] w-[50px] h-[20px] flex justify-center items-center">
                              <p className="text-[12px]">글쓴이</p>
                            </div>
                          )}
                        </div>
                        {selectedId === reply.id ? (
                          <textarea
                            autoFocus={selectedId === reply.id}
                            ref={textareaRef}
                            rows={3}
                            maxLength={500}
                            defaultValue={reply.content}
                            onChange={(e) => {
                              autoResizeTextArea(e.target);
                            }}
                            className="p-1 rounded-[4px] border border-black text-[14px] outline-none"
                          />
                        ) : (
                          <p className="text-[14px]">{reply.content}</p>
                        )}

                        <div className="flex gap-2 text-gray02 text-[14px]">
                          <DateConvertor datetime={reply.created_at} type="timeAgo" />
                          {sessionId === reply.userId && (
                            <>
                              <div className="relative">
                                <div className="absolute w-[1px] h-[10px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]"></div>
                              </div>
                              {selectedId !== reply.id ? (
                                <>
                                  <button
                                    type="button"
                                    className="text-red-500"
                                    onClick={() => {
                                      openCommentUpdateForm(reply.id, reply.content);
                                    }}
                                  >
                                    수정
                                  </button>
                                  <div className="relative">
                                    <div className="absolute w-[1px] h-[10px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]"></div>
                                  </div>
                                  <button
                                    className="text-red-500"
                                    onClick={async () => {
                                      await deleteHandler(reply.id, "reply");
                                    }}
                                  >
                                    삭제
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    className="text-black"
                                    onClick={async () => {
                                      await updateCommentHandler(reply.id, "reply");
                                    }}
                                  >
                                    완료
                                  </button>
                                  <div className="relative">
                                    <div className="absolute w-[1px] h-[10px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]"></div>
                                  </div>
                                  <button
                                    type="button"
                                    className="text-black"
                                    onClick={() => {
                                      setSelectedId("");
                                    }}
                                  >
                                    취소
                                  </button>
                                </>
                              )}
                            </>
                          )}
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
    </div>
  );
};
