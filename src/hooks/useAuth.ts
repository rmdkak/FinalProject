import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser, patchUser } from "api/supabase";
import { useAuthStore } from "store";

const queryKey = ["auth"];

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { currentSession } = useAuthStore();

  const currentUserResponse = useQuery({
    queryKey: [queryKey[0]],
    queryFn: async () => {
      if (currentSession === null) return;
      return await fetchUser(currentSession.user.id);
    },
    enabled: currentSession !== null,
  });

  const patchUserMutation = useMutation({
    mutationFn: patchUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  return { currentUserResponse, patchUserMutation };
};
