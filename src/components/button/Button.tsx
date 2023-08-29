import React, { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="w-auto px-8 py-2 m-1 text-sm text-white transition duration-300 bg-black shadow-md rounded-3xl hover:bg-opacity-70"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
