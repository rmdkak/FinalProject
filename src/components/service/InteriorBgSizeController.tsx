import bgSizeMinusControlBtn from "assets/BgSizeControlBtns/bgSizeMinusControlBtn.svg";
import bgSizePlusControlBtn from "assets/BgSizeControlBtns/bgSizePlusControlBtn.svg";
import bgSizeTileControlBtn from "assets/BgSizeControlBtns/BgSizeTileControlBtn.svg";
import BgSizeWallpaperControlBtn from "assets/BgSizeControlBtns/BgSizeWallpaperControlBtn.svg";
import { useServiceStore } from "store";

export const InteriorBgSizeController = (): JSX.Element => {
  const { selectBg, setSelectBg, setIncreseSelectBgSize, setDecreseSelectBgSize } = useServiceStore();
  const SELECT_BG_LEFT = selectBg === "leftWall" ? "bg-[#00000080]" : "";
  const SELECT_BG_RIGHT = selectBg === "rightWall" ? "bg-[#00000080]" : "";
  const SELECT_BG_TILE = selectBg === "tile" ? "bg-[#00000080]" : "";
  return (
    <>
      <div className="absolute z-50 flex bottom-4 right-4">
        {/* 왼쪽 벽지 */}
        <button
          onClick={() => {
            setSelectBg("leftWall");
          }}
          className={`flex bg-[#00000040] w-6 h-6 mr-2 rounded contents-center active:bg-[#00000060] ${SELECT_BG_LEFT}`}
        >
          <img className="w-[10px]" src={BgSizeWallpaperControlBtn} alt="왼쪽 벽지 이미지" />
        </button>
        {/* 오른쪽 벽지 */}
        <button
          onClick={() => {
            setSelectBg("rightWall");
          }}
          className={`flex bg-[#00000040] w-6 h-6 mr-2 rounded contents-center active:bg-[#00000060] ${SELECT_BG_RIGHT}`}
        >
          <img className="w-[10px] scale-x-[-1]" src={BgSizeWallpaperControlBtn} alt="오른쪽 벽지 이미지" />
        </button>
        {/* 타일 */}
        <button
          onClick={() => {
            setSelectBg("tile");
          }}
          className={`flex bg-[#00000040] w-6 h-6 mr-2 rounded contents-center active:bg-[#00000060] ${SELECT_BG_TILE}`}
        >
          <img className="w-[10px]" src={bgSizeTileControlBtn} alt="타일 이미지" />
        </button>
        {/* 크기 확대 버튼 */}
        <button
          onClick={() => {
            setIncreseSelectBgSize(selectBg);
          }}
          className="flex  bg-[#00000040] w-6 h-6 mr-2 rounded contents-center active:bg-[#00000060]"
        >
          <img className="w-[10px]" src={bgSizePlusControlBtn} alt="추가 버튼이미지" />
        </button>
        {/* 크기 축소 버튼 */}
        <button
          onClick={() => {
            setDecreseSelectBgSize(selectBg);
          }}
          className="flex  bg-[#00000040] w-6 h-6 rounded contents-center active:bg-[#00000060]"
        >
          <img className="w-[10px]" src={bgSizeMinusControlBtn} alt="감소 버튼이미지" />
        </button>
      </div>
    </>
  );
};
