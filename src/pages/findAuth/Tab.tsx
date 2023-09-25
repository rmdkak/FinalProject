import { type FocusTab } from "./FindAuth";

const TAB_STYLE =
  "max-w-[280px] w-[280px] pb-[12px] text-[18px] font-normal leading-[130%] text-center cursor-pointer sm:text-[16px] sm:w-full max-w-auto";
const TAB_FOCUSED_STYLE = `${TAB_STYLE} text-black border-b-[1px] border-black`;
const TAB_UNFOCUSED_STYLE = `${TAB_STYLE} text-gray03`;

interface Props {
  changeTabHandler: (type: "email" | "password") => void;
  focusTab: FocusTab;
}

export const Tab = ({ changeTabHandler, focusTab }: Props) => {
  return (
    <div className="flex w-full contents-center">
      <div
        className={focusTab.focusEmail ? TAB_FOCUSED_STYLE : TAB_UNFOCUSED_STYLE}
        onClick={() => {
          changeTabHandler("email");
        }}
      >
        아이디 찾기
      </div>
      <div
        className={focusTab.focusPassword ? TAB_FOCUSED_STYLE : TAB_UNFOCUSED_STYLE}
        onClick={() => {
          changeTabHandler("password");
        }}
      >
        비밀번호 찾기
      </div>
    </div>
  );
};
