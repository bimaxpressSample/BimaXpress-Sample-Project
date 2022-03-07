import React from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

type NextButtonPorps = {
  handleClick?: () => void;
  iconRight?: boolean;
  iconLeft?: boolean;
  text?: string;
  style?: object;
};

const NextButton = ({
  handleClick = () => {},
  iconRight = false,
  iconLeft = false,
  text = "Next",
  style = {},
}: NextButtonPorps) => {
  return (
    <div
      className={`border-none outline-none bg-fontColor text-black text-lg  py-1 rounded flex items-center font-semibold cursor-pointer ${
        iconLeft || iconRight ? "px-2" : "px-4"
      }`}
      style={style}
      onClick={handleClick}
    >
      {iconLeft ? (
        <HiOutlineChevronLeft className="mr-2 text-black text-xl" />
      ) : null}
      <p>{text}</p>
      {iconRight ? (
        <HiOutlineChevronRight className="ml-2 text-black text-xl" />
      ) : null}
    </div>
  );
};

export default NextButton;
