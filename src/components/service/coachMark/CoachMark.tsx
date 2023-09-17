import toast from "react-simple-toasts";

import { useInteriorPreview } from "hooks/useInteriorPreview";
import { useServiceStore } from "store";
import { useCoachMarkStore } from "store/useCoachMarkStore";

export const CoachMark = () => {
  const { nextActiveNumber, activeNumber, setTutorialPass } = useCoachMarkStore();
  const { windowWidth } = useInteriorPreview();
  const setTypeCheck = useServiceStore((state) => state.setTypeCheck);
  const wallPaper = useServiceStore((state) => state.wallPaper);

  const isMobile = activeNumber === 3 && windowWidth !== undefined && windowWidth <= 768;

  const nextHandler = () => {
    if (activeNumber === 1) {
      setTypeCheck("wallPaper");
    }
    if (activeNumber === 2) {
      if (wallPaper.left.id === null && wallPaper.right.id === null) {
        toast("아이템을 선택해보세요!", { theme: "plain", zIndex: 9999 });
        return;
      }
    }
    if (isMobile) {
      setTutorialPass();
      return;
    }
    if (activeNumber === 4) {
      setTutorialPass();
      return;
    }
    nextActiveNumber();
  };

  return (
    <>
      <div className="fixed inset-0 block w-full h-full bg-[#000000E6] z-[9300]"></div>
      <button
        onClick={nextHandler}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] w-48 h-10 point-button rounded-2xl"
      >
        {activeNumber === 4 || isMobile ? "사용해보기" : "다음 단계"}
      </button>
    </>
  );
};
