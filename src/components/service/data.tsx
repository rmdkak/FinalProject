import bgSizeMinusControlBtn from "assets/BgSizeControlBtns/bgSizeMinusControlBtn.svg";
import bgSizeMinusControlBtnActive from "assets/BgSizeControlBtns/bgSizeMinusControlBtnActive.svg";
import bgSizePlusControlBtn from "assets/BgSizeControlBtns/bgSizePlusControlBtn.svg";
import bgSizePlusControlBtnActive from "assets/BgSizeControlBtns/bgSizePlusControlBtnActive.svg";
import bgSizeTileControlBtn from "assets/BgSizeControlBtns/bgSizeTileControlBtn.svg";
import bgSizeTileControlBtnActive from "assets/BgSizeControlBtns/bgSizeTileControlBtnActive.svg";
import bgSizeWallpaperControlBtn from "assets/BgSizeControlBtns/bgSizeWallpaperControlBtn.svg";
import bgSizeWallpaperControlBtnActive from "assets/BgSizeControlBtns/bgSizeWallpaperControlBtnActive.svg";

interface BG_SIZE_CONTROL_BTN {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
}
const BG_SIZE_CONTROL_BTN_IMAGE_MAPPER: BG_SIZE_CONTROL_BTN = {
  1: bgSizeMinusControlBtn,
  2: bgSizeMinusControlBtnActive,
  3: bgSizePlusControlBtn,
  4: bgSizePlusControlBtnActive,
  5: bgSizeTileControlBtn,
  6: bgSizeTileControlBtnActive,
  7: bgSizeWallpaperControlBtn,
  8: bgSizeWallpaperControlBtnActive,
};

const WALLPAPER_TEXTURE_LIST: string[] = ["전체 보기", "벽지", "타일", "포세린", "페인트", "셀프조합"];
const TILE_TEXTURE_LIST: string[] = ["전체 보기", "장판", "마루", "포세린", "데코타일", "셀프조합"];
const FURNITURE_LIST: string[] = ["전체 보기", "가구", "조명"];

const RESOURCES_CALCULATOR_LIST: string[] = ["벽지", "타일, 가구"];

const SELECT_PAINT_INDEX: number = 4;

/**
 * 커스텀 셀프조합의 인덱스입니다.
 */
const SELECT_CUSTOM_INDEX: number = 5;

/**
 * 색상값을 지정해둔 변수입니다. 벽지, 타일을 클릭시 들어가는 색상 헥사코드입니다.
 */
const SELECT_BORDER_COLOR: string = "#1a1a1a";

/**
 * 기본 백그라운드 사이즈입니다 70
 */
const BG_DEFAULT_SIZE: number = 70;
/**
 * 배경이미지의 배율 퍼센트입니다. 25~300% 까지 있습니다.
 */
const BG_MAGNIFICATION: number[] = [25, 50, 75, 100, 125, 150, 200, 300];
/**
 * BG_MAGNIFICATION의 최대값입니다.
 */
const BG_MAGNIFICATION_LANGTH: number = BG_MAGNIFICATION.length;

/**
 * 이미지 높이, 너비 기본값 80
 */
const SELF_ITEM_WIDTH_HEIGHT = 80;
export {
  BG_SIZE_CONTROL_BTN_IMAGE_MAPPER,
  FURNITURE_LIST,
  SELECT_BORDER_COLOR,
  BG_MAGNIFICATION_LANGTH,
  BG_DEFAULT_SIZE,
  BG_MAGNIFICATION,
  WALLPAPER_TEXTURE_LIST,
  TILE_TEXTURE_LIST,
  RESOURCES_CALCULATOR_LIST,
  SELECT_PAINT_INDEX,
  SELECT_CUSTOM_INDEX,
  SELF_ITEM_WIDTH_HEIGHT,
};
