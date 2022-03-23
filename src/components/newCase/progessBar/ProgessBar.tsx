import React from 'react';
import styles from './ProgessBar.module.css';
import { BiCheck } from 'react-icons/bi';
import notification from '../../theme/utility/notification';
import Tooltip from '@mui/material/Tooltip';

type ProgessBarProps = {
  steps: number;
  newCaseData: any;
  prevStep: (val: number) => void;
};

const ProgessBar = ({ steps, prevStep, newCaseData }: ProgessBarProps) => {
  const { detailsOfTPA, patientDetails, diagnosisDetails } = newCaseData;

  return (
    <>
      <div className={styles.progressbar}>
        <Tooltip title='Details of TPA'>
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
        </Tooltip>

        <Tooltip title='Patient Details'>
          <div
            className={`${styles.step} ${steps >= 2 ? styles.active : ''} ${
              steps >= 3 ? styles.finish : ''
            }  `}
            onClick={() => {
              if (
                (!detailsOfTPA.insuranceCompany ||
                  detailsOfTPA.insuranceCompany === 'NA') &&
                (!detailsOfTPA.TPA || detailsOfTPA.TPA === 'NA')
              ) {
                notification('info', 'Please select Insurance company or TPA');
                return;
              } else {
                prevStep(2);
              }
            }}
          >
            <span>
              {steps >= 2 ? <BiCheck className={styles.ckeckIcon} /> : 2}
            </span>
          </div>
        </Tooltip>
        <Tooltip title="Doctor's And Diagnosis Details">
          <div
            className={`${styles.step} ${steps >= 3 ? styles.active : ''} ${
              steps >= 4 ? styles.finish : ''
            }`}
            onClick={() => {
              if (
                !patientDetails?.patientName ||
                !patientDetails?.AgeYear ||
                !patientDetails?.DOB ||
                !patientDetails?.contractNumber ||
                !patientDetails?.policyNumber
              ) {
                notification('info', 'Please fill mandatory details');
                return;
              } else {
                prevStep(3);
              }
            }}
          >
            <span>
              {steps >= 3 ? <BiCheck className={styles.ckeckIcon} /> : 3}
            </span>
          </div>
        </Tooltip>

        <Tooltip title='Admission Details'>
          <div
            className={`${styles.step} ${styles.step_four} ${
              steps >= 4 ? styles.active : ''
            }`}
            onClick={() => {
              if (
                !diagnosisDetails?.natureOfIllness ||
                !diagnosisDetails?.doctorsName ||
                !diagnosisDetails?.doctor_proposedLineOfTreatment_Medical_Managment
              ) {
                notification('info', 'Please fill mandatory details');
                return;
              } else {
                prevStep(4);
              }
            }}
          >
            <span>
              {steps >= 4 ? <BiCheck className={styles.ckeckIcon} /> : 4}
            </span>
          </div>
        </Tooltip>
      </div>
    </>
  );
};

export default ProgessBar;

// import React from 'react';
// import styles from './ProgessBar.module.css';
// import { BiCheck } from 'react-icons/bi';
// import notification from '../../theme/utility/notification';
// import Tooltip from '@mui/material/Tooltip';

// type ProgessBarProps = {
//   steps: number;
//   newCaseData: any;
//   prevStep: (val: number) => void;
// };

// const ProgessBar = ({ steps, prevStep, newCaseData }: ProgessBarProps) => {
//   const { detailsOfTPA, patientDetails, diagnosisDetails } = newCaseData;

//   return (
//     <>
//       <div
//         className='box1'
//         style={{
//           color: 'orange',
//           width: '130px',
//           height: '30px',
//           marginTop: '-30px',
//         }}
//       >
//         Details of TPA
//       </div>

//       <div
//         className='box1'
//         style={{
//           color: 'orange',
//           width: '130px',
//           height: '30px',
//           marginLeft: '333px',
//           marginTop: '-30px',
//         }}
//       >
//         Patient Details
//       </div>

//       <div
//         className='box1'
//         style={{
//           color: 'orange',
//           width: '230px',
//           height: '30px',
//           marginLeft: '620px',
//           marginTop: '-30px',
//         }}
//       >
//         Doctor's And Diagnosis Details
//       </div>
//       <div
//         className='box1'
//         style={{
//           color: 'orange',
//           width: '140px',
//           height: '30px',
//           marginLeft: '970px',
//           marginTop: '-30px',
//         }}
//       >
//         Admission Details
//       </div>

//       <div className={styles.progressbar}>
//         <Tooltip title='Details of TPA'>
//           <div
//             className={`${styles.step} ${steps >= 1 ? styles.active : ''} ${
//               steps >= 2 ? styles.finish : ''
//             } `}
//             onClick={() => {}}
//           >
//             <span>
//               {steps >= 1 ? <BiCheck className={styles.ckeckIcon} /> : 1}
//             </span>
//           </div>
//         </Tooltip>

//         <Tooltip title='Patient Details'>
//           <div
//             className={`${styles.step} ${steps >= 2 ? styles.active : ''} ${
//               steps >= 3 ? styles.finish : ''
//             }  `}
//             onClick={() => {}}
//           >
//             <span>
//               {steps >= 2 ? <BiCheck className={styles.ckeckIcon} /> : 2}
//             </span>
//           </div>
//         </Tooltip>

//         <Tooltip title="Doctor's And Diagnosis Details">
//           <div
//             className={`${styles.step} ${steps >= 3 ? styles.active : ''} ${
//               steps >= 4 ? styles.finish : ''
//             }`}
//             onClick={() => {}}
//           >
//             <span>
//               {steps >= 3 ? <BiCheck className={styles.ckeckIcon} /> : 3}
//             </span>
//           </div>
//         </Tooltip>

//         <Tooltip title='Admission Details'>
//           <div
//             className={`${styles.step} ${styles.step_four} ${
//               steps >= 4 ? styles.active : ''
//             }`}
//             onClick={() => {}}
//           >
//             <span>
//               {steps >= 4 ? <BiCheck className={styles.ckeckIcon} /> : 4}
//             </span>
//           </div>
//         </Tooltip>
//       </div>
//     </>
//   );
// };

// export default ProgessBar;
