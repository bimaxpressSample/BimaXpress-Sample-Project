import React from "react";
import styles from "./InputContained.module.css";

type InputContainedProps = {
  value?: string | number;
  name: string;
  handleChange: (
    e: React.ChangeEvent<HTMLDataElement | HTMLSelectElement | HTMLInputElement>
  ) => void;
  label?: string;
  type?: string;
  style?: object;
  min?: string;
  max?: string;
  step?: string;
};

const InputContained = ({
  handleChange,
  name,
  label,
  max = "",
  min = "0",
  step = "",
  style,
  type = "number",
  value,
}: InputContainedProps) => {
  return (
    <div>
      {label ? <p className="pb-3 text-sm text-fontColor ">{label}</p> : null}
      <input
        value={value}
        onChange={handleChange}
        name={name}
        type={type}
        max={max}
        min={min}
        step={step}
        className={styles.inputContained}
        style={style}
      />
    </div>
  );
};

export default InputContained;
