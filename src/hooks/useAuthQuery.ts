import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser, patchUser } from "api/supabase/auth";
import { useAuthStore } from "store";

const queryKey = ["auth"];

export const useAuthQuery = () => {
  const queryClient = useQueryClient();
  const { currentUserId } = useAuthStore();

  const currentUserResponse = useQuery({
    queryKey: ["auth", currentUserId],
    queryFn: async () => {
      if (currentUserId === undefined) return;
      return await fetchUser(currentUserId);
    },
    enabled: currentUserId !== undefined,
  });

  const patchUserMutation = useMutation({
    mutationFn: patchUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
    },
  });

  return {
    currentUserResponse,
    patchUserMutation,
  };
};
