import { headerLinks } from "container/commons";
import React, { useState } from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="z-40 shadow fixed py-4 top-0 left-0 w-full bg-[--darkColor1]">
      <div className="container flex gap-8 items-center justify-between">
        <Link to={"/"} className="text-xl font-bold link">
          AV
        </Link>
        <ul className="hidden md:flex gap-4 items-center">
          {headerLinks.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.path} className="link">{item.title}</Link>
              </li>
            );
          })}
        </ul>
        <button onClick={() => setToggle(true)} className="icon md:hidden">
          <HiMiniBars3 />
        </button>
      </div>
      {toggle && (
        <div className="z-50 fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.9)] py-10 px-4">
          <button
            onClick={() => setToggle(false)}
            className="icon absolute top-4 right-4"
          >
            <MdOutlineClose />
          </button>
          <ul className="flex flex-col text-center">
            {headerLinks.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="block p-4 rounded transition hover:bg-[--darkColor2] link"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
