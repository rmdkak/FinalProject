import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBookmark, addBookmark, deleteBookmark } from "api/supabase";
import { useAuthStore, useServiceStore } from "store";

const queryKey = ["bookmark"];

export const useBookmark = () => {
  const queryClient = useQueryClient();

  const { currentSession } = useAuthStore();
  const userId = currentSession?.user.id;
  const { wallPaper, tile } = useServiceStore();

  const bookmarkResponse = useQuery({
    queryKey: [queryKey[0], userId, tile.id, wallPaper.left.id, wallPaper.right.id],
    queryFn: async () => {
      if (userId === undefined || tile.id == null || wallPaper.left.id == null || wallPaper.right.id == null) return;
      return await fetchBookmark({
        userId,
        tileId: tile.id,
        leftWallpaperId: wallPaper.left.id,
        rightWallpaperId: wallPaper.right.id,
      });
    },
    enabled: userId !== null && tile.id !== null && wallPaper.left.id !== null && wallPaper.right.id !== null,
  });

  const addBookmarkMutation = useMutation({
    mutationFn: addBookmark,
    onMutate: async (newBookmark) => {
      await queryClient.cancelQueries({ queryKey });
      const previousBookmark = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, newBookmark);
      return { previousBookmark };
    },

    onError: (err, _, context) => {
      if (context === undefined) return;
      if (err !== null) {
        return queryClient.setQueryData(queryKey, context.previousBookmark);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  return { bookmarkResponse, addBookmarkMutation, deleteBookmarkMutation };
};
