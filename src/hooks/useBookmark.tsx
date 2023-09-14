import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";

import { useDialog } from "components";
import { useDynamicImport } from "hooks/useDynamicImport";
import { useAuthStore, useServiceStore } from "store";

import { useBookmarkQuery } from "./useBookmarkQuery";

export const useBookmark = () => {
  const navigate = useNavigate();
  const { currentUserId } = useAuthStore();
  const { Alert, Confirm } = useDialog();
  const { preFetchPageBeforeEnter } = useDynamicImport();
  const { addBookmarkMutation, deleteBookmarkMutation } = useBookmarkQuery();
  const { tile, wallPaper, wallpaperPaint } = useServiceStore((state) => state);

  const addBookmark = async () => {
    if (currentUserId === undefined) {
      await preFetchPageBeforeEnter("login");
      const goToLogin = await Confirm(
        <>
          <p>북마크 기능은 로그인 후 이용가능합니다.</p>
          <p>로그인 하시겠습니까?</p>
        </>,
      );
      if (goToLogin) {
        navigate("/login");
      }
      return;
    }
    if (tile.id === null || wallPaper.left.id === null || wallPaper.right.id === null) {
      await Alert("벽지와 타일 3가지 모두 선택해주세요.");
      return;
    }
    addBookmarkMutation.mutate({
      userId: currentUserId,
      tileId: tile.id,
      leftWallpaperId: wallPaper.left.id,
      rightWallpaperId: wallPaper.right.id,
    });
    toast("조합이 저장되었습니다.", { theme: "warning", zIndex: 9999 });
  };

  const deleteBookmark = async () => {
    if (currentUserId === undefined || tile.id == null || wallPaper.left.id == null || wallPaper.right.id == null)
      return;
    deleteBookmarkMutation.mutate({
      userId: currentUserId,
      tileId: tile.id,
      leftWallpaperId: wallPaper.left.id,
      rightWallpaperId: wallPaper.right.id,
    });
    toast("조합이 삭제되었습니다.", { theme: "warning", zIndex: 9999 });
  };

  const recommendDesign = async () => {
    if (currentUserId === undefined) {
      await preFetchPageBeforeEnter("login");
      const sessionCheck = await Confirm(
        <p>
          해당 서비스는 로그인 후 이용 가능합니다.
          <br />
          로그인 페이지로 이동하시겠습니까?
        </p>,
      );
      if (sessionCheck) {
        navigate("/login");
      }
      return;
    }
    if (tile.id !== null && wallPaper.left.id !== null && wallPaper.right.id !== null) {
      const selectedData = {
        leftWall: { image: wallPaper.left.image, id: wallPaper.left.id },
        rightWall: { image: wallPaper.right.image, id: wallPaper.right.id },
        leftWallPaint: null,
        rightWallPaint: null,
        tile: { image: tile.image, id: tile.id },
      };
      localStorage.setItem("selectedData", JSON.stringify(selectedData));
    } else if (tile.id !== null && wallpaperPaint.left !== null && wallpaperPaint.right !== null) {
      const selectedData = {
        leftWall: null,
        rightWall: null,
        leftWallPaint: wallpaperPaint.left,
        rightWallPaint: wallpaperPaint.right,
        tile: { image: tile.image, id: tile.id },
      };
      localStorage.setItem("selectedData", JSON.stringify(selectedData));
    } else {
      await Alert("조합을 모두 선택하신 후 이용해주세요.");
      return;
    }
    navigate("/post");
  };

  return { addBookmark, deleteBookmark, recommendDesign };
};
