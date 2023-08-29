import { useState } from "react";
import { AiOutlineCamera, AiFillCloseCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";

import { supabase } from "api/supabase";
import { useAuthStore } from "store";

const textAreaMaxLength = 500;
interface CommentFormProps {
  kind: "reply" | "comment";
  commentId: string;
  setOpenReply: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CommentForm = ({ kind, commentId, setOpenReply }: CommentFormProps) => {
  const { currentSession } = useAuthStore();
  const [comment, setComment] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { id: paramsId } = useParams();
  const commentStatus = kind === "comment";
  const replyStatus = kind === "reply";
  const placeHolder = commentStatus ? "댓글을 남겨보세요." : "답글을 남겨보세요.";

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (currentSession == null) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    if (value.length <= textAreaMaxLength) {
      setComment(value);
    } else {
      alert(`글자 수 제한(${textAreaMaxLength}자)을 초과했습니다.`);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file != null) {
      setSelectedImage(file);
    }
  };

  const handleImageCancel = () => {
    setSelectedImage(null);
  };

  const autoResizeTextArea = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    element.style.height = element.scrollHeight + "px";
  };

  const createCommentHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const userId = currentSession?.user.id;
    const UUID = uuid();
    const shortCommentImgUrl = `/commentImg/${UUID}`;
    const hasCommentImgStatus = selectedImage == null ? null : shortCommentImgUrl;
    try {
      if (selectedImage != null) {
        await supabase.storage.from("Images").upload(shortCommentImgUrl, selectedImage, {
          cacheControl: "3600",
          upsert: false,
        });
      }
      if (paramsId == null) return;
      if (userId == null) return;

      const commentData = {
        id: UUID,
        writtenId: userId,
        content: comment,
        postId: paramsId,
        commentImg: hasCommentImgStatus,
      };
      const replyData = {
        writtenId: userId,
        content: comment,
        commentId,
      };
      if (commentStatus) await supabase.from("COMMENTS").insert([commentData]);
      if (replyStatus) await supabase.from("RE-COMMENTS").insert([replyData]);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="w-full p-5 mt-10 border-2 rounded-lg border-gray06">
      <div className="contents-between">
        <p className="font-semibold text-[20px]">
          {currentSession != null
            ? currentSession?.user.user_metadata.name
            : "댓글 기능을 이용하시려면 로그인 해주세요."}
        </p>
        <div className="flex justify-end text-gray-400">
          {comment.length}/{textAreaMaxLength}자
        </div>
      </div>
      <form onSubmit={createCommentHandler}>
        <textarea
          value={comment}
          onChange={(e) => {
            handleTextAreaChange(e);
            autoResizeTextArea(e.target);
          }}
          placeholder={placeHolder}
          className="w-full text-[20px] py-[12px] focus:outline-none"
        />
        <div className="contents-between">
          {selectedImage == null && commentStatus && (
            <label htmlFor="imageInput">
              <AiOutlineCamera className="text-gray-400 cursor-pointer text-[40px]" />
              <input type="file" id="imageInput" className="hidden" onChange={handleImageChange} />
            </label>
          )}
          {selectedImage != null && commentStatus && (
            <div className="relative">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="object-cover cursor-pointer w-[100px] h-[100px]"
                onClick={handleImageCancel}
              />
              <div className="absolute bottom-[70px] left-[70px]">
                <AiFillCloseCircle
                  className="text-[25px] text-[#727272c5] cursor-pointer"
                  onClick={handleImageCancel}
                />
              </div>
            </div>
          )}
          {replyStatus && (
            <button
              onClick={() => {
                setOpenReply(null);
              }}
              type="button"
              className="bg-[#DDDDDD] h-[48px] px-[24px] text-[#7c7c7c] rounded-lg"
            >
              취소
            </button>
          )}
          <button type="submit" className="bg-[#DDDDDD] h-[48px] px-[24px] text-[#7c7c7c] rounded-lg">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};
