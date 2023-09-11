import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteBookmarksData,
  deleteCommentsData,
  deleteInquiryData,
  deleteLikesData,
  deletePostsData,
  fetchMyBookmarksData,
  fetchMyCommentsData,
  fetchMyInquiry,
  fetchMyLikesData,
  fetchMyPostsData,
} from "api/supabase/mypageData";
import { useAuthStore } from "store";

export const useMypageQuery = () => {
  const queryClient = useQueryClient();
  const { currentUserId } = useAuthStore();

  // my post get query
  const userPostsResponse = useQuery({
    queryKey: ["mypagePost", currentUserId],
    queryFn: async () => {
      if (currentUserId === undefined) return;
      return await fetchMyPostsData(currentUserId);
    },
    enabled: currentUserId !== undefined,
  });

  // my post delete query
  const deleteUserPostsMutation = useMutation({
    mutationFn: deletePostsData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mypagePost"] });
    },
  });

  // my comment get query
  const userCommentsResponse = useQuery({
    queryKey: ["mypageComment", currentUserId],
    queryFn: async () => {
      if (currentUserId === undefined) return;
      return await fetchMyCommentsData(currentUserId);
    },
    enabled: currentUserId !== undefined,
  });

  // my comment delete query
  const deleteUserCommentMutation = useMutation({
    mutationFn: deleteCommentsData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mypageComment"] });
    },
  });

  // my bookmark get query
  const userBookmarksResponse = useQuery({
    queryKey: ["mypageBookmark", currentUserId],
    queryFn: async () => {
      if (currentUserId === undefined) return;
      return await fetchMyBookmarksData(currentUserId);
    },
    enabled: currentUserId !== undefined,
  });

  // my bookmark delete query
  const deleteUserBookmarkMutation = useMutation({
    mutationFn: deleteBookmarksData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mypageBookmark"] });
    },
  });

  // my like get query
  const userLikesResponse = useQuery({
    queryKey: ["mypageLike", currentUserId],
    queryFn: async () => {
      if (currentUserId === undefined) return;
      return await fetchMyLikesData(currentUserId);
    },
    enabled: currentUserId !== undefined,
  });

  // my like delete query
  const deleteUserLikeMutation = useMutation({
    mutationFn: deleteLikesData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mypageLike"] });
    },
  });

  // my inquiry get query
  const userInquiryResponse = useQuery({
    queryKey: ["mypageInquiry", currentUserId],
    queryFn: async () => {
      if (currentUserId === undefined) return;
      return await fetchMyInquiry(currentUserId);
    },
    enabled: currentUserId !== undefined,
  });

  const deleteUserInquiryMutation = useMutation({
    mutationFn: deleteInquiryData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mypageInquiry"] });
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
    userInquiryResponse,
    deleteUserInquiryMutation,
  };
};
