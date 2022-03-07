import React from "react";

type PlanSelectButtonProps = {
  outlined?: boolean;
  text: string;
  handleClick?: () => void;
  disable?: boolean;
  style?: object;
};

const PlanSelectButton = ({
  outlined = false,
  text = "Select",
  handleClick = () => {},
  disable = false,
  style = {},
}: PlanSelectButtonProps) => {
  if (outlined) {
    return (
      <button
        className="w-full h-10 outline-none border border-fontColor text-sm text-fontColor rounded  text-semibold"
        disabled={disable}
        style={style}
        onClick={handleClick}
      >
        {text}
      </button>
    );
  }
  return (
    <button
      className="w-full h-10 outline-none bg-fontColor text-sm text-primary-dark rounded font-bold"
      disabled={disable}
      style={style}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default PlanSelectButton;
