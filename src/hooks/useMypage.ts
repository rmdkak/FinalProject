import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBookmarksData, deleteCommentsData, deleteLikesData, deletePostsData, fetchMyBookmarksData, fetchMyCommentsData, fetchMyLikesData, fetchMyPostsData } from "api/supabase";
import { useAuthStore } from "store";

export const useMypage = () => {
  const queryClient = useQueryClient();
  const { currentSession } = useAuthStore();
  const userId = currentSession?.user.id;

  // my post get query
  const userPostsResponse = useQuery({
    queryKey: ["mypagePost", userId],
    queryFn: async () => {
      return await fetchMyPostsData(userId as string);
    },
  });

  // my post delete query
  const deleteUserPostsMutation = useMutation({
    mutationFn: deletePostsData,
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ["mypagePost"] }); },
  });

  // my comment get query
  const userCommentsResponse = useQuery({
    queryKey: ["mypageComment", userId],
    queryFn: async () => {
      return await fetchMyCommentsData(userId as string);
    },
  });

  // my comment delete query
  const deleteUserCommentMutation = useMutation({
    mutationFn: deleteCommentsData,
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ["mypageComment"] }); },
  });

  // my bookmark get query
  const userBookmarksResponse = useQuery({
    queryKey: ["mypageBookmark", userId],
    queryFn: async () => {
      return await fetchMyBookmarksData(userId as string);
    },
  });

  // my bookmark delete query
  const deleteUserBookmarkMutation = useMutation({
    mutationFn: deleteBookmarksData,
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ["mypageBookmark"] }); },
  });

  // my like get query
  const userLikesResponse = useQuery({
    queryKey: ["mypageLike", userId],
    queryFn: async () => {
      return await fetchMyLikesData(userId as string);
    },
  });

  // my like delete query
  const deleteUserLikeMutation = useMutation({
    mutationFn: deleteLikesData,
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ["mypageLike"] }); },
  });

  return {
    userPostsResponse,
    deleteUserPostsMutation,
    userCommentsResponse,
    deleteUserCommentMutation,
    userBookmarksResponse,
    deleteUserBookmarkMutation,
    userLikesResponse,
    deleteUserLikeMutation,
  }
}