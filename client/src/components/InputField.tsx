import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: String;
  type?: "text";
}

const InputField: FC<Props> = ({ label, name, type, className, ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        {...props}
        className={`px-4 py-2 rounded outline-none border-[1px] border-[--borderColor] bg-transparent ${className}`}
      />
    </div>
  );
};

export default InputField;
