import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPostBookmark, onBookmarkDeleteHandler, onBookmarkPostHandler } from "api/supabase";
import { useAuthStore } from "store";

const queryKey = ["postBookmark"];

export const usePostsBookmark = () => {
  const queryClient = useQueryClient();

  const { currentSession } = useAuthStore()
  const userId = currentSession?.user.id

  const postBookmarkResponse = useQuery({
    queryKey: [queryKey[0], userId],
    queryFn: async () => {
      if (userId === undefined) return
      return await fetchPostBookmark({ userId })
    },
    enabled: userId !== undefined
  });

  const addBookmarkMutation = useMutation({
    mutationFn: onBookmarkPostHandler,
    onMutate: async (newBookmark) => {
      await queryClient.cancelQueries({ queryKey })
      const previousBookmark = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, newBookmark)
      return { previousBookmark }
    },

    onError: (err, newBookmark, context) => {
      if (context === undefined) return
      if (err !== null) {
        return queryClient.setQueryData(queryKey, context.previousBookmark)
      }
    },
    onSettled: async () => { await queryClient.invalidateQueries({ queryKey }) },
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: onBookmarkDeleteHandler,
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey }) }
  });

  return { postBookmarkResponse, addBookmarkMutation, deleteBookmarkMutation }
}
