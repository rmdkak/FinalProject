import { type ArrayRGB } from "color-thief-react/lib/types";
import tinycolor from "tinycolor2";

interface props {
  color: string | ArrayRGB;
}

export const ColorPallet = ({ color }: props) => {
  const getcolors: string[] = [];
  const tetradColors: tinycolor.Instance[] = tinycolor(color as string).tetrad();
  const triadColors: tinycolor.Instance[] = tinycolor(color as string).triad();

  tetradColors.map((color) => {
    return getcolors.push(color.toHexString());
  });
  triadColors.map((color) => {
    return getcolors.push(color.toHexString());
  });

  const deleteDuplicate = new Set(getcolors);
  const colors = [...deleteDuplicate];

  return (
    <>
      {colors.map((color, idx) => {
        return (
          <li key={idx} className="flex">
            <div className="w-32 h-32" style={{ backgroundColor: color }} />
            <span className="mt-auto font-bold" style={{ color }}>
              {color}
            </span>
          </li>
        );
      })}
    </>
  );
};
