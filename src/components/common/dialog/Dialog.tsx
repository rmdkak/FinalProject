import { type MouseEvent, type ReactNode } from "react";

import { Button } from "components";

interface Props {
  onClose: any;
  onSucess?: any;
  type: "Confirm" | "Alert";
  children: ReactNode;
}

export const Dialog = ({ onClose, onSucess, type, children }: Props) => {
  type CloseDialog = (event: MouseEvent<HTMLDivElement | HTMLElement>) => void;
  const close: CloseDialog = (event) => {
    const { target, currentTarget } = event;
    if (target !== currentTarget) return;
    onClose();
  };

  return (
    <div
      className="fixed top-0 left-0 z-[9999] flex items-center justify-center w-full h-full bg-black bg-opacity-40"
      onClick={close}
    >
      <div className="absolute max-w-[500px] min-w-[300px] min-h-[200px] text-center p-10 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg left-1/2 top-1/2">
        <div>{children}</div>
        {type === "Confirm" ? (
          <div className="mt-8 sm:flex md:flex sm:justify-center">
            <Button onClick={onClose}>취소</Button>
            <Button onClick={onSucess}>확인</Button>
          </div>
        ) : (
          <div className="mt-8">
            <Button onClick={close}>확인</Button>
          </div>
        )}
      </div>
    </div>
  );
};
