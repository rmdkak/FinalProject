import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { PiArrowBendDownRightThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

import { ADMIN_ID, deleteCommentImageHandler, saveCommentImageHandler, STORAGE_URL } from "api/supabase";
import comment_no_img from "assets/comment_no_img.png";
import defaultImg from "assets/defaultImg.jpg";
import { useDialog, DateConvertor } from "components";
import { useCommentsQuery, usePostsQuery } from "hooks";
import { useAuthStore } from "store";
import { type Tables } from "types/supabase";

import { CommentForm } from "./CommentForm";

interface CommentProps {
  postData: Tables<"POSTS", "Row">;
}

export const Comments = ({ postData }: CommentProps) => {
  const navigate = useNavigate();
  const { currentSession } = useAuthStore();
  const sessionId = currentSession?.user.id;
  const [openReply, setOpenReply] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [currentImg, setCurrentImg] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [selectedCommentImgFile, setSelectedCommentImgFile] = useState<File | null>(null);

  const { Confirm, Alert } = useDialog();

  const { fetchCommentsMutation } = useCommentsQuery();
  const { data: commentsData } = fetchCommentsMutation;

  const { fetchDetailMutation, deletePostMutation } = usePostsQuery();
  const { data: detailData } = fetchDetailMutation;

  const { deleteCommentMutation, deleteReplyMutation, updateCommentMutation, updateReplyMutation } = useCommentsQuery();

  const handleReplyClick = (commentId: string) => {
    if (openReply === commentId) {
      setOpenReply(null);
    } else {
      setOpenReply(commentId);
    }
  };

  const deleteCommentHandler = async (id: string, type: "comment" | "reply") => {
    try {
      const checkDelete = await Confirm("정말로 삭제하시겠습니까?");
      if (checkDelete) type === "comment" ? deleteCommentMutation.mutate(id) : deleteReplyMutation.mutate(id);
    } catch (error) {
      console.error("error :", error);
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
      const allowedExtensions = ["png", "jpeg", "jpg", "gif"];
      const fileExtension = selectedCommentImgFile.name.split(".").pop()?.toLowerCase();
      if (fileExtension === undefined) return;
      if (!allowedExtensions.includes(fileExtension)) {
        await Alert("이미지 파일(.png, .jpeg, .jpg, .gif)만 업로드 가능합니다.");
        return;
      }

      await saveCommentImageHandler({ id: UUID, commentImgFile: selectedCommentImgFile });
      await deleteCommentImageHandler(currentImg as string);
    }

    if (type === "comment") updateCommentMutation.mutate({ commentId: id, newComment, newCommentImg });
    if (type === "reply") updateReplyMutation.mutate({ replyId: id, newReply: newComment });
    setSelectedId("");
  };

  const openCommentUpdateForm = (id: string, content: string, commentImg?: string | null | undefined) => {
    setSelectedId(id);
    setNewComment(content);
    if (commentImg !== null && commentImg !== undefined) setCurrentImg(commentImg);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file != null) {
      setSelectedCommentImgFile(file);
    }
  };

  const deletePostHandler = async (id: string) => {
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
  const isAdmin = currentSession?.user.id === ADMIN_ID;
  return (
    <>
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
                  {comment.USERS?.avatar_url === "" ? (
                    <img src={defaultImg} alt="프로필이미지" className="w-[40px] h-[40px] rounded-full" />
                  ) : (
                    <img
                      src={comment.USERS?.avatar_url}
                      alt="프로필이미지"
                      className="w-[40px] h-[40px] rounded-full"
                    />
                  )}
                  <div className="flex flex-col justify-between w-full gap-2 ml-3">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{comment.USERS?.name}</p>
                      {comment.userId === "86ed428f-d8d2-4403-af3e-dfd0b3144969" && (
                        <div className=" bg-point border-none rounded-[4px] w-[50px] h-[20px] flex justify-center items-center">
                          <p className="text-[12px]">관리자</p>
                        </div>
                      )}
                      {detailData?.userId === comment.userId && (
                        <div className=" bg-point border-none rounded-[4px] w-[50px] h-[20px] flex justify-center items-center">
                          <p className="text-[12px]">글쓴이</p>
                        </div>
                      )}
                    </div>
                    {selectedId === comment.id ? (
                      <>
                        <textarea
                          autoFocus={selectedId === comment.id}
                          rows={3}
                          maxLength={500}
                          defaultValue={comment.content}
                          onChange={(e) => {
                            autoResizeTextArea(e.target);
                          }}
                          className="p-1 rounded-[4px] border border-black text-[14px] outline-none resize-none"
                        />
                        <div className="relative">
                          <label htmlFor="inputImg">
                            <AiOutlineCamera className="text-gray02 cursor-pointer text-[40px] absolute top-[245px] left-[305px]" />
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/gif"
                              id="inputImg"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      </>
                    ) : (
                      <p className="text-[14px]">{comment.content}</p>
                    )}
                    {comment.commentImg === null ? (
                      selectedId === comment.id ? (
                        <img
                          src={
                            selectedCommentImgFile === null
                              ? comment_no_img
                              : URL.createObjectURL(selectedCommentImgFile)
                          }
                          alt="미리보기"
                          className="my-[20px] w-[300px] h-[250px]"
                        />
                      ) : (
                        <></>
                      )
                    ) : selectedId === comment.id ? (
                      <img
                        alt="미리보기"
                        src={
                          selectedCommentImgFile === null
                            ? `${STORAGE_URL}${comment.commentImg}`
                            : selectedId === comment.id
                            ? URL.createObjectURL(selectedCommentImgFile)
                            : `${STORAGE_URL}${comment.commentImg}`
                        }
                        className="my-[20px] w-[300px] h-[250px]"
                      />
                    ) : (
                      <img src={`${STORAGE_URL}${comment.commentImg}`} className="my-[20px] w-[300px] h-[250px]" />
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
                      {(sessionId === comment.userId || isAdmin) && (
                        <>
                          {selectedId !== comment.id || isAdmin ? (
                            <>
                              {!isAdmin && (
                                <>
                                  <div className="relative">
                                    <div className="absolute w-[1px] h-[10px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]"></div>
                                  </div>
                                  <button
                                    type="button"
                                    className="text-red-500"
                                    onClick={() => {
                                      openCommentUpdateForm(comment.id, comment.content, comment.commentImg);
                                    }}
                                  >
                                    수정
                                  </button>
                                </>
                              )}
                              <div className="relative">
                                <div className="absolute w-[1px] h-[10px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]"></div>
                              </div>
                              <button
                                className="text-red-500"
                                onClick={async () => {
                                  await deleteCommentHandler(comment.id, "comment");
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
                                onClick={() => {
                                  setSelectedId("");
                                  setSelectedCommentImgFile(null);
                                }}
                              >
                                취소
                              </button>
                              <div className="relative">
                                <div className="absolute w-[1px] h-[10px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]"></div>
                              </div>
                              <button
                                type="button"
                                className="text-black"
                                onClick={async () => {
                                  await updateCommentHandler(comment.id, "comment");
                                }}
                              >
                                완료
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
                        {reply.USERS?.avatar_url === "" ? (
                          <img src={defaultImg} alt="프로필이미지" className="w-[40px] h-[40px] rounded-full" />
                        ) : (
                          <img
                            src={reply.USERS?.avatar_url}
                            alt="프로필이미지"
                            className="w-[40px] h-[40px] rounded-full"
                          />
                        )}
                        <div className="flex flex-col w-full gap-1 ml-3">
                          <div className="flex gap-2">
                            <p className="font-semibold">{reply.USERS?.name}</p>
                            {reply.userId === "86ed428f-d8d2-4403-af3e-dfd0b3144969" && (
                              <div className=" bg-point border-none rounded-[4px] w-[50px] h-[20px] flex justify-center items-center">
                                <p className="text-[12px]">관리자</p>
                              </div>
                            )}
                            {detailData?.userId === reply.userId && (
                              <div className=" bg-point border-none rounded-[4px] w-[50px] h-[20px] flex justify-center items-center">
                                <p className="text-[12px]">글쓴이</p>
                              </div>
                            )}
                          </div>
                          {selectedId === reply.id ? (
                            <textarea
                              autoFocus={selectedId === reply.id}
                              rows={3}
                              maxLength={500}
                              defaultValue={reply.content}
                              onChange={(e) => {
                                autoResizeTextArea(e.target);
                              }}
                              className="p-1 rounded-[4px] border border-black text-[14px] outline-none resize-none"
                            />
                          ) : (
                            <p className="text-[14px]">{reply.content}</p>
                          )}

                          <div className="flex gap-2 text-gray02 text-[14px]">
                            <DateConvertor datetime={reply.created_at} type="timeAgo" />
                            {(sessionId === reply.userId || isAdmin) && (
                              <>
                                {selectedId !== reply.id || isAdmin ? (
                                  <>
                                    {!isAdmin && (
                                      <>
                                        <div className="relative">
                                          <div className="absolute w-[1px] h-[10px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]"></div>
                                        </div>
                                        <button
                                          type="button"
                                          className="text-red-500"
                                          onClick={() => {
                                            openCommentUpdateForm(reply.id, reply.content);
                                          }}
                                        >
                                          수정
                                        </button>
                                      </>
                                    )}
                                    <div className="relative">
                                      <div className="absolute w-[1px] h-[10px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]"></div>
                                    </div>
                                    <button
                                      className="text-red-500"
                                      onClick={async () => {
                                        await deleteCommentHandler(reply.id, "reply");
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
      <div className="flex justify-between mt-[40px]">
        <button
          className="h-[48px] px-[30px] rounded-lg border border-gray05"
          onClick={() => {
            movePageHandler("community");
          }}
        >
          커뮤니티 목록
        </button>
        {((currentSession?.user.id === postData?.userId && postData !== undefined) || isAdmin) && (
          <div>
            <button
              onClick={async () => {
                await deletePostHandler(postData.id);
              }}
              className="w-[160px] h-[48px] border border-gray-300 mr-[20px] rounded-[8px]"
            >
              삭제
            </button>
            {!isAdmin && (
              <button
                onClick={() => {
                  movePageHandler("update");
                }}
                type="button"
                className="mr-2 bg-point w-[160px] h-[48px] rounded-[8px]"
              >
                수정
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};
