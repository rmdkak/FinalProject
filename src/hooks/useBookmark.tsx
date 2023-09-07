import { useNavigate } from "react-router-dom";

import { useDialog } from "components";
import { useBookmarkQuery } from "hooks";
import { useAuthStore, useServiceStore } from "store";

export const useBookmark = () => {
  const { currentSession } = useAuthStore();
  const { Alert, Confirm } = useDialog();
  const navigate = useNavigate();
  const { tile, wallPaper, wallpaperPaint } = useServiceStore((state) => state);
  const { addBookmarkMutation, deleteBookmarkMutation } = useBookmarkQuery();

  const addBookmark = async () => {
    if (currentSession === null) {
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
      userId: currentSession.user.id,
      tileId: tile.id,
      leftWallpaperId: wallPaper.left.id,
      rightWallpaperId: wallPaper.right.id,
    });
    void Alert("조합이 저장되었습니다.");
  };

  const deleteBookmark = async () => {
    if (currentSession === null || tile.id == null || wallPaper.left.id == null || wallPaper.right.id == null) return;
    deleteBookmarkMutation.mutate({
      userId: currentSession.user.id,
      tileId: tile.id,
      leftWallpaperId: wallPaper.left.id,
      rightWallpaperId: wallPaper.right.id,
    });
    void Alert("조합이 삭제되었습니다.");
  };

  const recommendDesign = async () => {
    if (currentSession === null) {
      const sessionCheck = await Confirm(
        <p>
          해당 서비스는 로그인 후 이용 가능합니다.
          <br />
          로그인 페이지로 이동하시겠습니까?
        </p>,
      );
      if (sessionCheck) navigate("/login");
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
