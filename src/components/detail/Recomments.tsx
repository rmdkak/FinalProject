import { PiArrowBendDownRightThin } from "react-icons/pi";

import { ADMIN_ID } from "api/supabase/supabaseClient";
import defaultImg from "assets/defaultImg.jpg";
// import defaultImgWebp from "assets/defaultImgWebp.webp";
import { DateConvertor } from "components/common";
import { useComments } from "hooks/useComments";
import { type Tables } from "types/supabase";

import { CommentForm } from "./CommentForm";

interface Props {
  comment: {
    commentImg: string | null;
    content: string;
    created_at: string;
    id: string;
    postId: string;
    userId: string;
    USERS: Tables<"USERS", "Row"> | null;
    RECOMMENTS: Array<{
      commentId: string;
      content: string;
      created_at: string;
      id: string;
      userId: string;
      USERS: Tables<"USERS", "Row"> | null;
    }>;
  };
  detailData: Tables<"POSTS", "Row">;
  currentUserId: string | undefined;
  openReply: string | null;
  setOpenReply: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ReComments = ({ comment, detailData, currentUserId, openReply, setOpenReply }: Props) => {
  const {
    selectedId,
    setSelectedId,
    deleteCommentHandler,
    autoResizeTextArea,
    updateCommentHandler,
    openCommentUpdateForm,
  } = useComments();

  const isAdmin = currentUserId === ADMIN_ID;

  return (
    <div>
      {comment.RECOMMENTS.map((reply) => (
        <div key={reply.id} className="border-b border-[#E5E5E5]">
          <div className="flex py-[15px]">
            <PiArrowBendDownRightThin className="text-[30px] mx-[10px]" />
            <picture>
              <source
                // srcSet={reply.USERS?.avatar_url === "" ? defaultImgWebp : reply.USERS?.avatar_url}
                type="image/webp"
              />
              <img
                src={reply.USERS?.avatar_url === "" ? defaultImg : reply.USERS?.avatar_url}
                alt="프로필이미지"
                className="w-[40px] h-[40px] rounded-full"
              />
            </picture>

            <div className="flex flex-col w-full gap-1 ml-3">
              <div className="flex gap-2">
                <p className="font-semibold">{reply.USERS?.name}</p>
                {reply.userId === ADMIN_ID && (
                  <div className=" bg-point border-none rounded-[4px] w-[50px] h-5 flex justify-center items-center">
                    <p className="text-[12px]">관리자</p>
                  </div>
                )}
                {detailData?.userId === reply.userId && (
                  <div className=" bg-point border-none rounded-[4px] w-[50px] h-5 flex justify-center items-center">
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
                <pre className="w-full text-sm break-words whitespace-pre-wrap ">{reply.content}</pre>
              )}

              <div className="flex gap-2 text-gray02 text-[14px]">
                <DateConvertor datetime={reply.created_at} type="timeAgo" />
                {(currentUserId === reply.userId || isAdmin) && (
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
                            await deleteCommentHandler(reply.id, "reply");
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
                          취소하기
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
        {openReply === comment.id && <CommentForm kind="reply" commentId={comment.id} setOpenReply={setOpenReply} />}
      </div>
    </div>
  );
};
