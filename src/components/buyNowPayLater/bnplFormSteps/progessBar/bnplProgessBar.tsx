import React from 'react';
import styles from './bnplProgessBar.module.css';
import { BiCheck } from 'react-icons/bi';
import notification from '../../../theme/utility/notification';

type ProgessBarProps = {
  steps: number;
  prevStep: (val: number) => void;
};

const bnplProgessBar = ({ steps, prevStep }: ProgessBarProps) => {
  return (
    <>
      <div className={styles.progressbar}>
        <div
          className={`${styles.step} ${steps >= 1 ? styles.active : ''} ${
            steps >= 2 ? styles.finish : ''
          } `}
          onClick={() => {
            prevStep(1);
          }}
        >
          <span>
            {steps >= 1 ? <BiCheck className={styles.ckeckIcon} /> : 1}
          </span>
        </div>
        <div
          className={`${styles.step} ${steps >= 2 ? styles.active : ''} ${
            steps >= 3 ? styles.finish : ''
          }  `}
          onClick={() => {
            prevStep(2);
          }}
        >
          <span>
            {steps >= 2 ? <BiCheck className={styles.ckeckIcon} /> : 2}
          </span>
        </div>
        <div
          className={`${styles.step} ${steps >= 3 ? styles.active : ''} ${
            styles.step_finall
          } ${steps >= 3 ? styles.finish : ''}`}
          onClick={() => {
            prevStep(3);
          }}
        >
          <span>
            {steps >= 3 ? <BiCheck className={styles.ckeckIcon} /> : 3}
          </span>
        </div>
      </div>
    </>
  );
};

export default bnplProgessBar;
