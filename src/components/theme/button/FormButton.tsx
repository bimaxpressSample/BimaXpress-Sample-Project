import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { FiPlus } from "react-icons/fi";

type FormButtonProps = {
  text: string;
  iconEdit?: boolean;
  iconPlus?: boolean;
  handleClick?: () => void;
};

const FormButton = ({
  text = "",
  iconEdit = false,
  iconPlus = false,
  handleClick,
}: FormButtonProps) => {
  const buttonClick = () => {
    if (handleClick) {
      handleClick();
    }
  };
  return (
    <button
      className={`h-8 w-auto border text-fontColor-light rounded outline-none text-sm flex items-center ${
        iconEdit || iconPlus ? "px-4" : "px-6"
      }`}
      onClick={buttonClick}
    >
      {iconEdit ? (
        <MdOutlineEdit className="text-fontColor text-lg mr-2 " />
      ) : null}
      {iconPlus ? <FiPlus className="text-fontColor text-lg mr-2" /> : null}
      {text}
    </button>
  );
};

export default FormButton;
