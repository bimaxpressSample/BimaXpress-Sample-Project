import React, { useState } from 'react';
import InputRadio from '../../theme/inputRadio/InputRadio';
import styles from './EnhanceAndFic.module.css';
import Modal from 'react-modal';
import Request from './request/Request';
import ApproveAndRejected from './approveAndRejected/ApproveAndRejected';
import { IoClose } from 'react-icons/io5';

type EnchanceAndFciProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  newCaseData?: any;
  action?: string;
};

const EnchanceAndFci = ({
  isOpen = false,
  closeModal = () => {},
  newCaseData,
  action = '',
}: EnchanceAndFciProps) => {
  const [status, setStatus] = useState('request');

  return (
    <Modal
      isOpen={isOpen}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div className='flex items-center justify-between py-4'>
        <div className='flex items-center '>
          <div className='mr-8'>
            <InputRadio
              handleChange={(e) => setStatus(e?.target?.value)}
              name='request'
              value='request'
              radioLabel='Request'
              fieldName={status || ''}
            />
          </div>
          <div className='mr-8'>
            <InputRadio
              handleChange={(e) => setStatus(e?.target?.value)}
              name='rejected'
              value='rejected'
              radioLabel='Rejected'
              fieldName={status || ''}
            />
          </div>
          {action === 'Enhance' ? (
            <div className='mr-8'>
              <InputRadio
                handleChange={(e) => setStatus(e?.target?.value)}
                name='approved'
                value='approved'
                radioLabel='Approved'
                fieldName={status || ''}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <IoClose
          className=' text-2xl text-fontColor cursor-pointer'
          onClick={closeModal}
        />
      </div>
      {status === 'request' ? (
        <Request newCaseData={newCaseData} action={action} />
      ) : (
        <ApproveAndRejected
          status={status}
          newCaseData={newCaseData}
          action={action}
        />
      )}
    </Modal>
  );
};

export default EnchanceAndFci;
