import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import uuid from "react-uuid";

import { deleteCommentImageHandler, saveCommentImageHandler } from "api/supabase/commentData";
import { useDialog } from "components";
import { useDynamicImport } from "hooks/useDynamicImport";

import { useCommentsQuery } from "./useCommentsQuery";
import { usePostsQuery } from "./usePostsQuery";

export const useComments = () => {
  const navigate = useNavigate();
  const [openReply, setOpenReply] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [currentImg, setCurrentImg] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [selectedCommentImgFile, setSelectedCommentImgFile] = useState<File | null>(null);

  const { Confirm, Alert } = useDialog();
  const { deleteCommentMutation, deleteReplyMutation, updateCommentMutation, updateReplyMutation } = useCommentsQuery();
  const { deletePostMutation } = usePostsQuery();
  const { preFetchPageBeforeEnter } = useDynamicImport();

  const UUID = uuid();

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
      toast("댓글은 1글자 이상 입력해주세요.", { theme: "failure", zIndex: 9999 });
      return;
    }

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
    setSelectedCommentImgFile(null);
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
      await preFetchPageBeforeEnter("community");
      if (checkDelete) {
        deletePostMutation.mutate(id);
        navigate("/community");
      }
    } catch (error) {
      console.error("error :", error);
    }
  };

  const movePageHandler = (moveEvent: "back" | "community" | "update", postId: string) => {
    switch (moveEvent) {
      case "back":
        navigate(-1);
        break;
      case "community":
        navigate("/community");
        break;
      case "update":
        navigate(`/updatepost/${postId}`);
        break;
    }
  };

  return {
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
  };
};
