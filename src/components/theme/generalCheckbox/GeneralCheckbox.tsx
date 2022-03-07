import React from "react";
import styles from "./GeneralCheckbox.module.css";

type InputCheckboxProps = {
  //   name: string | undefined;
  //   value: string | number;
  //   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  checkboxLabel?: string;
  //   fieldName: any;
};

const GeneralCheckbox = ({
  //   handleChange,
  //   name,
  //   value,
  checkboxLabel,
  label,
}: //   fieldName,
InputCheckboxProps) => {
  return (
    <div className="flex flex-col">
      {label ? (
        <p className="pb-3 text-sm text-fontColor-light">{label}</p>
      ) : null}
      <label className={styles.container}>
        {checkboxLabel}
        <input
          type="checkbox"
          //   name={name}
          //   value={value}
          //   onChange={handleChange}
          //   checked={fieldName?.includes(value)}
        />
        <span className={styles.checkmark}></span>
      </label>
    </div>
  );
};

export default GeneralCheckbox;
