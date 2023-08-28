import { type ArrayRGB } from "color-thief-react/lib/types";
import tinycolor from "tinycolor2";

interface props {
  color: string | ArrayRGB;
}

export const ColorPallet = ({ color }: props) => {
  const toneInTone: string[] = [];
  const toneOnTone: string[] = [];
  const tetradColors: tinycolor.Instance[] = tinycolor(color as string).tetrad();
  const triadColors: tinycolor.Instance[] = tinycolor(color as string).triad();
  const analogColors: tinycolor.Instance[] = tinycolor(color as string).analogous();

  tetradColors.map((color) => {
    return toneInTone.push(color.toHexString());
  });
  triadColors.map((color) => {
    return toneInTone.push(color.toHexString());
  });
  analogColors.map((color) => {
    return toneOnTone.push(color.toHexString());
  });

  const deleteDuplicate = new Set(toneInTone);
  const colors = [...deleteDuplicate];

  /**
   *
   * @param color "이 함수는 클립보드에 색상 값을 복사하는 기능을 제공합니다. 매개변수 'color'에는 복사할 색상 값이 전달되어야 합니다."
   */
  const handleCopyColorClipBoard = (color: string) => {
    navigator.clipboard
      .writeText(color)
      .then(() => {
        alert("컬러가 복사되었습니다.");
      })
      .catch((error) => {
        console.error("복사 실패", error);
      });
  };

  return (
    <>
      <h3>TONE IN TONE</h3>
      <ul className="flex flex-wrap gap-4">
        {colors.map((color, idx) => {
          return (
            <li
              onClick={() => {
                handleCopyColorClipBoard(color);
              }}
              key={idx}
              className="flex"
            >
              <div className="w-32 h-32 rounded-xl" style={{ backgroundColor: color }} />
            </li>
          );
        })}
      </ul>
      <h3>TONE ON TONE</h3>
      <ul className="flex flex-wrap gap-4">
        {toneOnTone.map((color, idx) => {
          return (
            <li
              onClick={() => {
                handleCopyColorClipBoard(color);
              }}
              key={idx}
              className="flex"
            >
              <div className="w-32 h-32 rounded-xl" style={{ backgroundColor: color }} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
