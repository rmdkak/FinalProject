import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "api/supabase";
import { useAuthStore } from "store";

// const queryKey = ["auth"];

export const useAuthQuery = () => {
  // const queryClient = useQueryClient();
  const { currentUserId } = useAuthStore();
  console.log("hooks > useAuthQuery > currentUserId :", currentUserId);

  const currentUserResponse = useQuery({
    queryKey: ["auth", currentUserId],
    queryFn: async () => {
      if (currentUserId === undefined) return;
      console.log("hooks > useAuthQuery > currentUserResponse > currentUserId :", currentUserId);
      return await fetchUser(currentUserId);
    },
    // enabled: currentSession !== null,
  });

  // const patchUserMutation = useMutation({
  //   mutationFn: patchUser,
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries(queryKey);
  //   },
  // });

  return {
    currentUserResponse,
    //  patchUserMutation
  };
};
