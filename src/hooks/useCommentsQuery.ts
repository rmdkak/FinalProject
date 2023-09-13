import { useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCommentsHandler,
  createReplyHandler,
  deleteCommentHandler,
  deleteReplyHandler,
  fetchComments,
  patchCommentsHandler,
  patchReplyHandler,
} from "api/supabase/commentData";

export const useCommentsQuery = () => {
  const queryClient = useQueryClient();
  const { id: postId } = useParams();

  // get(comments)
  const fetchCommentsMutation = useQuery({
    queryKey: ["COMMENTS", postId],
    queryFn: async () => {
      return await fetchComments(postId as string);
    },
    enabled: postId !== undefined,
  });

  // post(comments)
  const createCommentMutation = useMutation({
    mutationFn: createCommentsHandler,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["COMMENTS"]);
    },
  });

  // patch(comments)
  const updateCommentMutation = useMutation({
    mutationFn: patchCommentsHandler,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["COMMENTS"]);
    },
  });

  // delete(comments)
  const deleteCommentMutation = useMutation({
    mutationFn: deleteCommentHandler,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["COMMENTS"]);
    },
  });

  // post(reply)
  const createReplyMutation = useMutation({
    mutationFn: createReplyHandler,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["COMMENTS"]);
    },
  });

  // patch(reply)
  const updateReplyMutation = useMutation({
    mutationFn: patchReplyHandler,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["COMMENTS"]);
    },
  });

  // delete(reply)
  const deleteReplyMutation = useMutation({
    mutationFn: deleteReplyHandler,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["COMMENTS"]);
    },
  });

  return {
    fetchCommentsMutation,
    createCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
    createReplyMutation,
    updateReplyMutation,
    deleteReplyMutation,
  };
};
