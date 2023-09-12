import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePostLike, fetchPostLike } from "api/supabase/postLike";
import { useAuthStore, useLikeStore } from "store";
import { type Tables } from "types/supabase";

type Like = Tables<"POSTLIKES", "Insert"> | undefined;

export const usePostsLikeQuery = () => {
  const queryClient = useQueryClient();

  const { currentUserId } = useAuthStore();
  const { detailPostId } = useLikeStore();

  const queryKey = ["postLike", detailPostId];

  const postLikeResponse = useQuery({
    queryKey,
    queryFn: async () => {
      if (detailPostId === undefined) return;
      return await fetchPostLike(detailPostId);
    },
    enabled: detailPostId !== undefined,
  });

  const addLikeMutation = useMutation({
    mutationFn: changePostLike,
    onMutate: async (newLike) => {
      await queryClient.cancelQueries({ queryKey });
      const previousLike: Like = queryClient.getQueryData(queryKey);

      if (previousLike === undefined || previousLike === null) return;
      const backupLike = {
        postId: previousLike.postId,
        userId: previousLike.userId.filter((id) => id !== currentUserId),
      };

      queryClient.setQueryData(queryKey, newLike);

      return { backupLike };
    },

    onError: (err, _, context) => {
      if (context === undefined) return;
      if (err !== null) {
        return queryClient.setQueryData(queryKey, context.backupLike);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: changePostLike,
    onMutate: async (deleteLike) => {
      await queryClient.cancelQueries({ queryKey });
      const previousLike: Like = queryClient.getQueryData(queryKey);
      if (previousLike === undefined || previousLike === null) return;
      if (currentUserId === undefined) return;
      const backupLike = {
        postId: previousLike.postId,
        userId: [...previousLike.userId, currentUserId],
      };

      queryClient.setQueryData(queryKey, deleteLike);

      return { backupLike };
    },

    onError: (err, _, context) => {
      if (context === undefined) return;
      if (err !== null) {
        console.error("err :", err);
        return queryClient.setQueryData(queryKey, context.backupLike);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  return { postLikeResponse, addLikeMutation, deleteLikeMutation };
};
