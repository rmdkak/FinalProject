/**
import { ResouresCalculator } from './ResouresCalculator';
 * 여기에 벽지 카테고리가 추가되면 추가하면 됩니다.
 */
const WALLPAPER_TEXTURE_LIST: string[] = ["전체", "벽지", "타일", "포세린", "페인트", "셀프조합"];

/**
 * 여기에 타일 카테고리가 추가되면 추가하면 됩니다.
 */
const TILE_TEXTURE_LIST: string[] = ["전체", "장판", "마루", "데코타일", "포세린", "셀프조합"];

const RESOURES_CALCULATOR_LIST: string[] = ["벽지", "타일"];

const SELECT_PAINT_INDEX: number = 4;

const SELECT_CUSTOM_INDEX: number = 5;

/**
 * 색상값을 지정해둔 변수입니다. 왼쪽 벽지에 들어갈 값을 담슴니다.
 */
// const LEFT_ITEM_BORDER_COLOR = "#054ac";
/**
 * 색상값을 지정해둔 변수입니다. 오른쪽 벽지에 들어갈 값을 담슴니다.
 */
// const RIGHT_ITEM_BORDER_COLOR = "#4c04e0";
/**
 * 색상값을 지정해둔 변수입니다. 타일에 들어갈 값을 담슴니다.
 */
// const TILE_ITEM_BORDER_COLOR = "#69eaac";

/**
 * 색상값을 지정해둔 변수입니다. 벽지, 타일을 클릭시 들어가는 색상 헥사코드입니다.
 */
const SELECT_BORDER_COLOR = "#666";

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

export {
  BG_MAGNIFICATION_LANGTH,
  BG_DEFAULT_SIZE,
  BG_MAGNIFICATION,
  SELECT_BORDER_COLOR,
  WALLPAPER_TEXTURE_LIST,
  TILE_TEXTURE_LIST,
  RESOURES_CALCULATOR_LIST,
  SELECT_PAINT_INDEX,
  SELECT_CUSTOM_INDEX,
};
