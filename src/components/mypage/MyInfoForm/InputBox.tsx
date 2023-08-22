import { type User } from "@supabase/gotrue-js";

import { type PatchIsOpen } from "../MyInfo";

interface Props {
  content: keyof PatchIsOpen;
  patchIsOpen: PatchIsOpen;
  changeHandler: (content: keyof PatchIsOpen) => void;
  defaultValue?: User["email" | "phone"];
}

const INPUT_STYLE =
  "w-full px-[24px] py-[12px] border-[1px] border-[#E5E5E5] placeholder:text-[#888] disabled:bg-[#d7d7d7]";

export const InputBox = ({ content, patchIsOpen, changeHandler, defaultValue = "" }: Props) => {
  return (
    <div className="flex gap-4">
      <input
        id={content}
        placeholder={content}
        disabled={!patchIsOpen[content]}
        defaultValue={defaultValue}
        className={INPUT_STYLE}
      />
      <button
        type="button"
        onClick={() => {
          changeHandler(content);
        }}
        className="w-[80px] h-[48px] text-white bg-[#888] disabled:bg-[#bbb]"
      >
        변경
      </button>
    </div>
  );
};
