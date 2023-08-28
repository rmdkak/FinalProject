import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchItemBookmark, onInteriorBookmarkPostHandler, onInteriorBookmarkDeleteHandler } from "api/supabase";
import { useAuthStore, useServiceStore } from "store";

const queryKey = ["interiorBookmark"];

export const useInteriorBookmark = () => {
  const queryClient = useQueryClient();

  const { currentSession } = useAuthStore()
  const userId = currentSession?.user.id
  const { wallPaper, tile } = useServiceStore();

  const interiorBookmarkResponse = useQuery({
    queryKey: [queryKey[0], userId, tile.id, wallPaper.id],
    queryFn: async () => {
      if (userId === undefined || tile.id == null || wallPaper.id == null) return
      return await fetchItemBookmark({ userId, tileId: tile.id, wallpaperId: wallPaper.id })
    }
  });


  const addInteriorBookmarkMutation = useMutation({
    mutationFn: onInteriorBookmarkPostHandler,
    onMutate: async (newBookmark) => {
      // 현재 실행중인 쿼리 캔슬
      // 이전에 실행되던 쿼리가 있을 수 있음
      await queryClient.cancelQueries({ queryKey })
      // 이전 값 백업
      const previousBookmark = queryClient.getQueryData(queryKey)
      // 미리 업데이트하기
      queryClient.setQueryData(queryKey, newBookmark)
      // queryClient.setQueryData<Array<Tables<"ITEM-BOOKMARK", "Insert">>>(queryKey, (old) => [...old ?? [], newBookmark])
      // 백업값 리턴으로 넘겨주기
      return { previousBookmark }
    },
    // 실패 했을 경우
    // onMutate에서 백업했던 값 복원하기
    onError: (err, _, context) => {
      if (context === undefined) return
      if (err !== null) {
        return queryClient.setQueryData(queryKey, context.previousBookmark)
      }
    },

    // onSettled : 성공하던 실패하던 실행되는로직
    // invalidateQueries : DB데이터 => 캐싱
    onSettled: async () => { await queryClient.invalidateQueries({ queryKey }) },
  });

  const deleteInteriorBookmarkMutation = useMutation({
    mutationFn: onInteriorBookmarkDeleteHandler,
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey }); },
  });

  return { interiorBookmarkResponse, addInteriorBookmarkMutation, deleteInteriorBookmarkMutation }
}
