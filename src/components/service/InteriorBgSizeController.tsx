import { BgSizecontrolBtn } from "./BgSizecontrolBtn";
import { BgSizeSelectcontrolBtn } from "./BgSizeSelectcontrolBtn";

export const InteriorBgSizeController = (): JSX.Element => {
  return (
    <>
      <div className="absolute z-50 flex bottom-4 right-4 sm:hidden">
        <BgSizeSelectcontrolBtn type="leftWall" />
        <BgSizeSelectcontrolBtn type="rightWall" />
        <BgSizeSelectcontrolBtn type="tile" />

        <BgSizecontrolBtn type="plus" />
        <BgSizecontrolBtn type="minus" />
      </div>
    </>
  );
};
