import React from 'react';
import styles from './InputDate.module.css';

type InputDateProps = {
  value?: string | number;
  name: string;
  handleChange: (
    e: React.ChangeEvent<HTMLDataElement | HTMLSelectElement | HTMLInputElement>
  ) => void;
  label?: string;
  style?: object;
  type?: string;
  labelStyle?: object;
  disable?: boolean;
};

const InputDate = ({
  handleChange,
  name,
  label,
  value,
  style = {},
  labelStyle = {},
  type = 'date',
  disable = false,
}: InputDateProps) => {
  return (
    <div>
      {label ? (
        <p className='pb-3 text-sm text-fontColor ' style={labelStyle}>
          {label}
        </p>
      ) : null}

      <input
        type={type}
        name={name}
        placeholder='Select date'
        value={value}
        onChange={handleChange}
        className={styles.inputDate}
        style={style}
        disabled={disable}
      />
    </div>
  );
};

export default InputDate;
