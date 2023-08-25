import { useQuery } from "@tanstack/react-query";
import { fetchMyBookmarksData, fetchMyCommentsData, fetchMyPostsData } from "api/supabase/mypageData";
import { useAuthStore } from "store";

export const useMypage = () => {
  const { currentSession } = useAuthStore();
  const userId = currentSession?.user.id;

  const userPostsResponse = useQuery({
    queryKey: ["authPost", userId],
    queryFn: async () => {
      return await fetchMyPostsData(userId as string);
    },
  });

  const userCommentsResponse = useQuery({
    queryKey: ["authComment", userId],
    queryFn: async () => {
      return await fetchMyCommentsData(userId as string);
    },
  });

  const userBookmarksResponse = useQuery({
    queryKey: ["authBookmark", userId],
    queryFn: async () => {
      return await fetchMyBookmarksData(userId as string);
    },
  });




  return { userPostsResponse, userCommentsResponse, userBookmarksResponse }
}