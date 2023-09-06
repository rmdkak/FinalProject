import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as supabaseApi from "api/supabase";
import { useAuthStore } from "store";

export const useMypageQuery = () => {
  const queryClient = useQueryClient();
  const { currentSession } = useAuthStore();
  const userId = currentSession?.user.id;

  // my post get query
  const userPostsResponse = useQuery({
    queryKey: ["mypagePost", userId],
    queryFn: async () => {
      if (userId === undefined) return;
      return await supabaseApi.fetchMyPostsData(userId);
    },
    enabled: userId !== undefined,
  });

  // my post delete query
  const deleteUserPostsMutation = useMutation({
    mutationFn: supabaseApi.deletePostsData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mypagePost"] });
    },
  });

  // my comment get query
  const userCommentsResponse = useQuery({
    queryKey: ["mypageComment", userId],
    queryFn: async () => {
      if (userId === undefined) return;
      return await supabaseApi.fetchMyCommentsData(userId);
    },
    enabled: userId !== undefined,
  });

  // my comment delete query
  const deleteUserCommentMutation = useMutation({
    mutationFn: supabaseApi.deleteCommentsData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mypageComment"] });
    },
  });

  // my bookmark get query
  const userBookmarksResponse = useQuery({
    queryKey: ["mypageBookmark", userId],
    queryFn: async () => {
      if (userId === undefined) return;
      return await supabaseApi.fetchMyBookmarksData(userId);
    },
    enabled: userId !== undefined,
  });

  // my bookmark delete query
  const deleteUserBookmarkMutation = useMutation({
    mutationFn: supabaseApi.deleteBookmarksData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mypageBookmark"] });
    },
  });

  // my like get query
  const userLikesResponse = useQuery({
    queryKey: ["mypageLike", userId],
    queryFn: async () => {
      if (userId === undefined) return;
      return await supabaseApi.fetchMyLikesData(userId);
    },
    enabled: userId !== undefined,
  });

  // my like delete query
  const deleteUserLikeMutation = useMutation({
    mutationFn: supabaseApi.deleteLikesData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mypageLike"] });
    },
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
  };
};
