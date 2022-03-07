import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './ApproveModal.module.css';
import { IoClose } from 'react-icons/io5';
import paperclip from '../../../assets/icon/paperclip.svg';
import Input from '../../theme/input/Input';
import InputDate from '../../theme/inputDate/InputDate';
import PlanSelectButton from '../../theme/button/PlanSelectButton';
Modal.setAppElement('#root');

type ApproveModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
};

const ApproveModal = ({
  isOpen = false,
  closeModal = () => {},
}: ApproveModalProps) => {
  const [data, setData] = useState({ claimNumber: '', amount: '', date: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLDataElement | any>
  ) => {
    const { name, value } = e?.target;
    setData((pre) => ({ ...pre, [name]: value }));
  };
  return (
    <Modal
      isOpen={isOpen}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div className='px-10 py-8 relative'>
        <IoClose
          className='absolute top-2 right-2 text-2xl text-fontColor cursor-pointer'
          onClick={closeModal}
        />

        <div className='w-full h-44 border-2 border-fontColor rounded-lg text-center'>
          <p className='text-sm text-fontColor-gray pt-4'>
            Upload your documents here
          </p>
          <div className='flex items-center justify-center mt-4'>
            <div className='bg-fontColor-gray text-sm flex items-center justify-between w-36 h-8 px-2 mr-2 rounded-sm'>
              <p>File #1.docx</p>
              <IoClose />
            </div>
            <div className='bg-fontColor-gray text-sm flex items-center justify-between w-36 h-8 px-2 mr-2 rounded-sm'>
              <p>File #2.docx</p>
              <IoClose />
            </div>
          </div>
          <div className='flex justify-center mt-8'>
            <div className=' flex items-center justify-center border-2 border-fontColor rounded-lg w-44 h-10'>
              <img src={paperclip} alt='icon' className='mr-2' />
              <p className='text-fontColor-gray font-normal '>Attach file</p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <div className='col-span-1'>
            <Input
              value={data?.claimNumber}
              name='claimNumber'
              handleChange={handleChange}
              label='Enter claim number'
              labelStyle={{ color: '#c8c8c8' }}
              style={{
                height: '40px',
                border: 'none',
                outline: 'none',
                backgroundColor: '#FFFFFF17',

                borderRadius: '5px',
              }}
            />
          </div>
          <div className='col-span-1'>
            <InputDate
              value={data?.date}
              name='date'
              handleChange={handleChange}
              labelStyle={{ color: '#c8c8c8' }}
              label='Select date'
              style={{
                height: '40px',
                border: 'none',
                outline: 'none',
                backgroundColor: '#FFFFFF17',
                minWidth: '100%',
                borderRadius: '5px',
                marginTop: '4px',
              }}
            />
          </div>
          <div className='col-span-1'>
            <Input
              value={data?.amount}
              name='amount'
              handleChange={handleChange}
              label='Amount'
              labelStyle={{ color: '#c8c8c8' }}
              style={{
                height: '40px',
                border: 'none',
                outline: 'none',
                backgroundColor: '#FFFFFF17',

                borderRadius: '5px',
              }}
            />
          </div>
        </div>
        <div className='flex justify-center mt-8'>
          <PlanSelectButton text='Submit' style={{ maxWidth: '180px' }} />
        </div>
      </div>
    </Modal>
  );
};

export default ApproveModal;
