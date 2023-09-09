import React, { useCallback } from "react";

import { useServiceStore } from "store";
import { type WallOrTileOrFurniture } from "types/service";
import { handleCheckType } from "utils/servise/interiorSection";
interface Props {
  children: React.ReactNode;
  type: WallOrTileOrFurniture;
}

const InteriorTitleMemoization = ({ children, type }: Props): JSX.Element => {
  const { checkType, setTypeCheck } = useServiceStore((state) => state);

  const onClickTypeSwitch = useCallback((type: WallOrTileOrFurniture) => {
    setTypeCheck(type);
  }, []);

  return (
    <>
      <span
        className={handleCheckType(checkType, type)}
        onClick={() => {
          onClickTypeSwitch(type);
        }}
      >
        {children}
      </span>
    </>
  );
};

export const InteriorTitle = React.memo(InteriorTitleMemoization);
