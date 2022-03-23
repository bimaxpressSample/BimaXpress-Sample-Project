import React, { useEffect, useState } from 'react';
import styles from './forgotpassword.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IoClose } from 'react-icons/io5';
import Modal from 'react-modal';
import Button from '../theme/nextButton/NextButton';
import axiosConfig from '../../config/axiosConfig';
import notification from '../theme/utility/notification';
import Input from '../theme/input/Input';
import { setLoading } from '../../redux/slices/utilitySlice';

type DeleteModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const ForgotPassword = ({ isOpen, closeModal }: DeleteModalProps) => {
  const dispatch = useAppDispatch();
  const [forgotEmail, setforgotEmail] = useState('');

  const forgotPasswordAPI = async () => {
    if (forgotEmail === '') {
      return notification('info', 'Enter a email');
    }

    dispatch(setLoading(true));

    try {
      const { data } = await axiosConfig.post(`/forgot?email=${forgotEmail}`);

      console.log(data.data);

      if (data.data === 'User Does Not Exist') {
        notification('error', 'Email does not exist');
      } else {
        notification('success', `Email has been sent to ${data.data}`);
        setforgotEmail('');
        closeModal();
      }
      dispatch(setLoading(false));
    } catch (error) {
      //@ts-ignore
      notification('error', error.message);
      dispatch(setLoading(false));
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div className={`${styles.summerModalContainer} relative`}>
        <IoClose
          className=' absolute top-4 right-6 text-2xl text-fontColor cursor-pointer'
          onClick={closeModal}
        />
        <p className='text-2xl text-fontColor mb-2 justify-center '>
          Forgot Password
        </p>

        <div className='pt-4'></div>

        <Input
          value={forgotEmail}
          name='email'
          placeHolder='Enter your email'
          handleChange={(e) => {
            setforgotEmail(e.target.value);
          }}
        />
        <div className='flex items-center'></div>
        <br />

        <div className='flex justify-center gap-4 pt-6'>
          <Button text='Reset' handleClick={forgotPasswordAPI} />
        </div>
      </div>
    </Modal>
  );
};

export default ForgotPassword;
