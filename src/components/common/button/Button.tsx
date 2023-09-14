import React, { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className={`w-[192px] h-[52px] sm:w-[110px] px-8 py-2 m-2 text-Black transition duration-300 ${
        children === "확인" ? "bg-point" : "bg-white border border-gray05"
      } rounded-[12px] hover:bg-opacity-70`}
      {...props}
    >
      {children}
    </button>
  );
};
