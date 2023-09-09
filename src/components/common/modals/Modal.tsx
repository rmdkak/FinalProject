import React, { useEffect } from "react";

import closeBtn from "assets/svgs/close.svg";
import { useModalStore } from "store";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export const Modal = ({ children, title }: Props): JSX.Element => {
  const { modalState, onCloseModal } = useModalStore((state) => state);

  useEffect(() => {
    onCloseModal();
    return onCloseModal;
  }, []);

  if (!modalState) return <></>;

  let titleBorder: string = "";
  const checkTypeGuard = typeof title === "string" && title !== "";
  if (checkTypeGuard) titleBorder = " border-b border-black";

  return (
    <>
      <div
        onMouseDown={onCloseModal}
        className="fixed top-0 bottom-0 left-0 right-0 block w-full h-full bg-[#00000040] z-[9998]"
      ></div>
      <div className="fixed z-[9999] top-1/2 left-1/2 rounded-[10px] p-10 bg-white  translate-x-[-50%] translate-y-[-50%]">
        <div className={`flex items-center justify-between pb-3 mb-8 ${titleBorder}`}>
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onCloseModal}>
            <img src={closeBtn} alt="닫기" />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};
