import React from "react";
import styles from "./NewCaseSelect.module.css";

type SelectProps = {
  options: { label: string; value: string }[];
  value?: string | number;
  name: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  label?: string;
  style?: object;
  defaultOption?: string | number;
};

const NewCaseSelect = ({
  options,
  handleChange,
  name,
  value = "",
  label = "",
  style = {},
  defaultOption = "Select One",
}: SelectProps) => {
  return (
    <>
      {label ? <p className="pb-3 text-sm text-fontColor ">{label}</p> : null}
      <select
        value={value}
        name={name}
        onChange={(e) => handleChange(e)}
        className={styles.select}
        style={style}
      >
        <option value="" className={styles.option}>
          {defaultOption}
        </option>
        {options?.map((option, index) => {
          return (
            <option value={option?.value} key={index} className={styles.option}>
              {option?.label}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default NewCaseSelect;
