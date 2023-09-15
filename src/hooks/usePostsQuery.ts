import { useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPostHandler,
  deletePostHandler,
  fetchDetailData,
  fetchPostData,
  patchPostHandler,
} from "api/supabase/postData";

export const usePostsQuery = () => {
  const { id: postId } = useParams();
  const queryClient = useQueryClient();

  // fetch detail
  const fetchDetailMutation = useQuery({
    queryKey: ["POSTS", postId],
    queryFn: async () => {
      return await fetchDetailData(postId as string);
    },
    enabled: postId !== undefined,
  });

  // fetch post
  const fetchPostsMutation = useQuery({
    queryKey: ["POSTS"],
    queryFn: async () => {
      return await fetchPostData();
    },
  });

  // prefetch post
  const prefetchPostsMutation = async () => {
    await queryClient.prefetchQuery({
      queryKey: ["POSTS"],
      queryFn: fetchPostData,
    });
  };

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

  return {
    fetchDetailMutation,
    fetchPostsMutation,
    prefetchPostsMutation,
    createPostMutation,
    updatePostMutation,
    deletePostMutation,
  };
};
