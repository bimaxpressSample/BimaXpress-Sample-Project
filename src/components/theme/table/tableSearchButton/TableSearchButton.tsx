import React from "react";
import styles from "./TableSearchButton.module.css";

type TableSearchButtonProps = {
  text?: string;
  handleClick?: () => void;
};

const TableSearchButton = ({
  text = "Enter",
  handleClick = () => {},
}: TableSearchButtonProps) => {
  return (
    <button className={styles.button} onClick={handleClick}>
      {text}
    </button>
  );
};

export default TableSearchButton;
