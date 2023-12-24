import React, { FC, SelectHTMLAttributes } from "react";
interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: String;
  dataList?: [{ label?: String; value?: String }];
}

const Select: FC<Props> = ({ label, name, dataList, className, ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        id={name}
        className={`px-4 py-2 cursor-pointer rounded outline-none border-[1px] border-[--borderColor] bg-[--darkColor2] ${className} `}
        {...props}
      >
        {dataList?.map((item, index: number) => {
          return (
            <option key={index} value={`${item.value}`}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
