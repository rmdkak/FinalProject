import { useCoachMarkStore } from "store/useCoachMarkStore";

import { BgSizecontrolBtn } from "./BgSizecontrolBtn";
import { BgSizeSelectcontrolBtn } from "./BgSizeSelectcontrolBtn";
import { CoachStepFour } from "./coachMark/CoachStepFour";

export const InteriorBgSizeController = (): JSX.Element => {
  const { activeNumber, isTutorialPass } = useCoachMarkStore();
  const isStepFour = !isTutorialPass && activeNumber === 4;
  return (
    <>
      <div className={`absolute  flex bottom-4 right-4 sm:hidden ${isStepFour ? "z-[9300]" : "z-50"}`}>
        {isStepFour && (
          <>
            <div className="absolute -inset-2 outline-dashed outline-point outline-2 rounded-xl z-[9300]">
              <div className="w-full h-full bg-white opacity-20" />
            </div>
            <CoachStepFour />
          </>
        )}
        <BgSizeSelectcontrolBtn type="leftWall" />
        <BgSizeSelectcontrolBtn type="rightWall" />
        <BgSizeSelectcontrolBtn type="tile" />

        <BgSizecontrolBtn type="plus" />
        <BgSizecontrolBtn type="minus" />
      </div>
    </>
  );
};
