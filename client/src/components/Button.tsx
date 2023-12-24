import React, { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<Props> = ({ className, ...props }) => {
  return (
    <button
      {...props}
      className={`${className} px-4 py-2 bg-blue-500 text-white hover:opacity-90`}
    >
    </button>
  );
};

export default Button;
