import { useState } from "react";
import { AiOutlineCamera, AiFillCloseCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";

import { supabase } from "api/supabase";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";
import { useComments } from "hooks/useComments";
import { useAuthStore } from "store";

const textAreaMaxLength = 500;
interface CommentFormProps {
  kind: "reply" | "comment";
  commentId: string;
  setOpenReply: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CommentForm = ({ kind, commentId, setOpenReply }: CommentFormProps) => {
  // const {register,handleSubmit,reset,formState:{errors}} = useForm({mode:"all"})
  const navigate = useNavigate();
  const { currentSession } = useAuthStore();
  const { createCommentMutation, createReplyMutation } = useComments();
  const [content, setContent] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { id: postId } = useParams();
  const commentStatus = kind === "comment";
  const replyStatus = kind === "reply";
  const placeHolder = commentStatus ? "댓글을 남겨보세요." : "답글을 남겨보세요.";
  const { Confirm, Alert } = useDialog();

  const loginValidHandler = async () => {
    if (currentSession == null) {
      const confirmCheck = await Confirm("댓글 기능은 로그인 후 이용 가능합니다. 로그인 페이지로 이동하시겠습니까?");
      if (confirmCheck) navigate("/login");
    }
  };

  const handleTextAreaChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;

    if (value.length <= textAreaMaxLength) {
      setContent(value);
    } else {
      await Alert(`글자 수 제한(${textAreaMaxLength}자)을 초과했습니다.`);
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
    element.style.height = `${element.scrollHeight}px`;
  };

  const createCommentHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const writtenId = currentSession?.user.id;
    const id = uuid();
    const commentImg = selectedImage == null ? null : `/commentImg/${id}`;

    if (postId == null) return;
    if (writtenId == null) return;

    try {
      if (selectedImage != null) {
        await supabase.storage.from("Images").upload(`/commentImg/${id}`, selectedImage, {
          cacheControl: "3600",
          upsert: false,
        });
      }

      if (commentStatus) createCommentMutation.mutate({ id, writtenId, content, postId, commentImg });
      if (replyStatus) createReplyMutation.mutate({ writtenId, content, commentId });
    } catch (error) {
      console.log("error", error);
    }
    setContent("");
  };

  return (
    <div className="w-full p-5 mb-20 border-2 rounded-lg border-gray06">
      <div className="contents-between">
        <p className="font-semibold text-[20px]">
          {currentSession != null
            ? currentSession?.user.user_metadata.name
            : "댓글 기능을 이용하시려면 로그인 해주세요."}
        </p>
        <div className="flex justify-end text-gray-400">
          {content.length}/{textAreaMaxLength}자
        </div>
      </div>
      <form onSubmit={createCommentHandler} className="contents-between">
        <textarea
          value={content}
          onClick={loginValidHandler}
          onChange={async (e) => {
            await handleTextAreaChange(e);
            autoResizeTextArea(e.target);
          }}
          placeholder={placeHolder}
          className={
            selectedImage != null
              ? "w-[984px] text-[20px] py-[12px] focus:outline-none resize-none"
              : "w-[1100px] text-[20px] py-[12px] focus:outline-none resize-none"
          }
        />
        <div className="flex-column">
          {replyStatus && (
            <button
              onClick={() => {
                setOpenReply(null);
              }}
              type="button"
              className="h-[48px] w-[120px] text-gray03 rounded-lg border-[1px] border-gray05"
            >
              취소
            </button>
          )}
          <button type="submit" className="h-[48px] w-[120px] text-gray03 rounded-lg border-[1px] border-gray05">
            등록하기
          </button>
          {selectedImage == null && commentStatus && (
            <label htmlFor="imageInput" className="">
              <AiOutlineCamera className="text-gray-400 cursor-pointer text-[40px] mx-auto mt-[60px]" />
              <input type="file" id="imageInput" className="hidden" onChange={handleImageChange} />
            </label>
          )}
          {selectedImage != null && commentStatus && (
            <div className="relative right-[96%] bottom-[32%]">
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
        </div>
      </form>
    </div>
  );
};
