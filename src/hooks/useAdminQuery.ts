import { useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addManToManData,
  addReportData,
  addTileData,
  addWallpaperData,
  deleteEventData,
  deleteManToManData,
  deleteReport,
  deleteTileData,
  deleteWallpaperData,
  fetchEventAllData,
  fetchInteriorData,
  fetchManToManData,
  fetchReportData,
  patchManToManData,
  fetchEventDetailData,
  addEventData,
} from "api/supabase/admin";

export const useAdminQuery = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // 이벤트 GET
  const fetchEventMutation = useQuery({
    queryKey: ["event"],
    queryFn: async () => {
      return await fetchEventAllData();
    },
  });
  // 이벤트 GET
  const fetchEventDetailMutation = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      if (id === undefined) return;
      return await fetchEventDetailData(id);
    },
    enabled: id !== undefined,
  });

  // 이벤트 post
  const addEventMutation = useMutation({
    mutationFn: addEventData,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["event"]);
    },
  });

  // 이벤트 delete
  const deleteEventMutation = useMutation({
    mutationFn: deleteEventData,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["event"]);
    },
  });

  // 문의하기 GET
  const fetchManToManMutation = useQuery({
    queryKey: ["manToMan"],
    queryFn: async () => {
      return await fetchManToManData();
    },
  });

  // 문의하기 post
  const addManToManMutation = useMutation({
    mutationFn: addManToManData,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["manToMan"]);
    },
  });

  // 문의하기 patch
  const patchManToManMutation = useMutation({
    mutationFn: patchManToManData,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["manToMan"]);
    },
  });

  // 문의하기 delete
  const deleteManToManMutation = useMutation({
    mutationFn: deleteManToManData,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["manToMan"]);
    },
  });

  // 신고하기 GET
  const fetchReportMutation = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      return await fetchReportData();
    },
  });

  // 신고하기 post
  const addReportMutation = useMutation({
    mutationFn: addReportData,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["report"]);
    },
  });

  // 신고하기 delete
  const deleteReportMutation = useMutation({
    mutationFn: deleteReport,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["report"]);
    },
  });

  // 벽지타일 get
  const fetchInteriorMutation = useQuery({
    queryKey: ["interior"],
    queryFn: async () => {
      return await fetchInteriorData();
    },
  });

  // 벽지타일 post
  const addTileMutation = useMutation({
    mutationFn: addTileData,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["interior"]);
    },
  });

  const addWallpaperMutation = useMutation({
    mutationFn: addWallpaperData,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["interior"]);
    },
  });

  // 벽지 delete

  const deleteTileMutation = useMutation({
    mutationFn: deleteTileData,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["interior"]);
    },
  });

  const deleteWallpaperMutation = useMutation({
    mutationFn: deleteWallpaperData,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["interior"]);
    },
  });

  return {
    fetchEventMutation,
    fetchManToManMutation,
    fetchReportMutation,
    fetchInteriorMutation,
    addEventMutation,
    addManToManMutation,
    addReportMutation,
    addTileMutation,
    addWallpaperMutation,
    patchManToManMutation,
    deleteEventMutation,
    deleteManToManMutation,
    deleteReportMutation,
    deleteTileMutation,
    deleteWallpaperMutation,
    fetchEventDetailMutation,
  };
};
