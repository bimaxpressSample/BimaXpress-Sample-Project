import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

type PaginationButtonProps = {
  rightIcon?: boolean;
  leftIcon?: boolean;
  disability?: boolean;
  handleClick?: () => void;
};

const PaginationButton = ({
  disability = false,
  leftIcon = false,
  rightIcon = false,
  handleClick = () => {},
}: PaginationButtonProps) => {
  return (
    <button
      className={`w-10 h-10 flex items-center justify-center rounded border-none outline-none text-center ${
        disability ? "bg-transparent cursor-default" : "bg-secondary"
      }`}
      disabled={disability}
      onClick={handleClick}
    >
      {rightIcon ? (
        <FaChevronRight
          className={`text-lg  ${
            disability ? "text-secondary" : "text-fontColor"
          } `}
        />
      ) : null}

      {leftIcon ? (
        <FaChevronLeft
          className={`text-lg  ${
            disability ? "text-secondary" : "text-fontColor"
          } `}
        />
      ) : null}
    </button>
  );
};

export default PaginationButton;
