import { useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCommentsHandler, createReplyHandler, fetchComments, fetchReplyData } from "api/supabase/commentData";

export const useComments = () => {
  const queryClient = useQueryClient();
  const { id: paramsId } = useParams();

  // get(comments)
  const fetchCommentsMutation = useQuery({
    queryKey: ["COMMENTS", paramsId],
    queryFn: async () => {
      return await fetchComments(paramsId as string);
    },
  });

  // post(comments)
  const createCommentMutation = useMutation({
    mutationFn: createCommentsHandler,
    onSuccess: () => {
      void queryClient.invalidateQueries(["COMMENTS"]);
    },
  });
  // get(reply)
  const fetchReplyMutation = useQuery({
    queryKey: ["RE-COMMENTS", paramsId],
    queryFn: async () => {
      return await fetchReplyData(paramsId as string);
    },
  });

  // post(reply)
  const createReplyMutation = useMutation({
    mutationFn: createReplyHandler,
    onSuccess: () => {
      void queryClient.invalidateQueries(["RE-COMMENTS"]);
    },
  });

  return { createCommentMutation, fetchCommentsMutation,fetchReplyMutation,createReplyMutation };
};
