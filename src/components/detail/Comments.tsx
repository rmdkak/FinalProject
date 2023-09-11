import { AiOutlineCamera } from "react-icons/ai";

import { ADMIN_ID, STORAGE_URL } from "api/supabase";
import comment_no_img from "assets/comment_no_img.png";
import defaultImg from "assets/defaultImg.jpg";
import { DateConvertor, type PostDataChain, ReComments } from "components";
import { useCommentsQuery, usePostsQuery, useComments } from "hooks";
import { useAuthStore } from "store";

import { CommentForm } from "./CommentForm";

interface CommentProps {
  postData: PostDataChain;
}

export const Comments = ({ postData }: CommentProps) => {
  const { currentSession } = useAuthStore();
  const sessionId = currentSession?.user.id;

  const { fetchCommentsMutation } = useCommentsQuery();
  const { data: commentsData } = fetchCommentsMutation;

  const { fetchDetailMutation } = usePostsQuery();
  const { data: detailData } = fetchDetailMutation;
  const isAdmin = sessionId === ADMIN_ID;

  const {
    selectedId,
    setSelectedId,
    selectedCommentImgFile,
    setSelectedCommentImgFile,
    openReply,
    setOpenReply,
    handleReplyClick,
    deleteCommentHandler,
    autoResizeTextArea,
    updateCommentHandler,
    openCommentUpdateForm,
    handleImageChange,
    deletePostHandler,
    movePageHandler,
  } = useComments();

  if (detailData === undefined) return;

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
                      {comment.userId === ADMIN_ID && (
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
                      <pre className="w-full text-sm break-words whitespace-pre-wrap ">{comment.content}</pre>
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
                                    수정하기
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
                                삭제하기
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
                <ReComments
                  comment={comment}
                  detailData={detailData}
                  currentSession={currentSession}
                  openReply={openReply}
                  setOpenReply={setOpenReply}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between mt-[40px]">
        <button
          className="h-[48px] px-[30px] rounded-lg border border-gray05"
          onClick={() => {
            movePageHandler("community", postData.id);
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
                  movePageHandler("update", postData.id);
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
