import { useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPostHandler,
  deletePostHandler,
  fetchDetailData,
  fetchPostData,
  patchPostHandler,
  wholeChangePostLike,
} from "api/supabase";

export const usePosts = () => {
  const { id: postId } = useParams();
  const queryClient = useQueryClient();

  // get
  const fetchDetailMutation = useQuery({
    queryKey: ["POSTS", postId],
    queryFn: async () => {
      return await fetchDetailData(postId as string);
    },
    enabled: postId !== undefined,
  });

  // get
  const fetchPostsMutation = useQuery({
    queryKey: ["POSTS"],
    queryFn: async () => {
      return await fetchPostData();
    },
  });

  // post
  const createPostMutation = useMutation({
    mutationFn: createPostHandler,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["POSTS"]);
    },
  });

  // patch
  const updatePostMutation = useMutation({
    mutationFn: patchPostHandler,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["POSTS"]);
    },
  });

  // delete
  const deletePostMutation = useMutation({
    mutationFn: deletePostHandler,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["POSTS"]);
    },
  });

  const wholeChangePostLikeMutation = useMutation({
    mutationFn: wholeChangePostLike,
    onMutate: async (newLike) => {
      await queryClient.cancelQueries({ queryKey: ["POSTS", postId] });
      const previousLike = queryClient.getQueryData(["POSTS", postId]);
      queryClient.setQueryData(["POSTS", postId], newLike);
      return { previousLike };
    },

    onError: (err, _, context) => {
      if (context === undefined) return;
      if (err !== null) {
        return queryClient.setQueryData(["POSTS", postId], context.previousLike);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["POSTS", postId] });
    },
  });

  return {
    fetchPostsMutation,
    createPostMutation,
    updatePostMutation,
    deletePostMutation,
    fetchDetailMutation,
    wholeChangePostLikeMutation,
  };
};
