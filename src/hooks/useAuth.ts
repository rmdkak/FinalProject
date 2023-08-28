import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser, patchUser } from "api/supabase";
import { useAuthStore } from "store";

const queryKey = ["auth"];

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { currentSession } = useAuthStore()
  const currentUserResponse = useQuery({
    queryKey: [queryKey[0]],
    queryFn: async () => {
      if (currentSession === null) return
      return await fetchUser(currentSession?.user.id)
    }
  })

  const patchUserMutation = useMutation({
    mutationFn: patchUser,
    onMutate: async (newBookmark) => {
      await queryClient.cancelQueries({ queryKey })
      const previousBookmark = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, newBookmark)
      return { previousBookmark }
    },
    onError: (err, _, context) => {
      if (context === undefined) return
      if (err !== null) {
        return queryClient.setQueryData(queryKey, context.previousBookmark)
      }
    },
    onSettled: async () => { await queryClient.invalidateQueries({ queryKey }) },
  });

  return { currentUserResponse, patchUserMutation }
}