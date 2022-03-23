/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import AuthScreenWrapper from './authscreen.wrapper';
import { useNavigate } from 'react-router-dom';
import './auth.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setRole,
  setUser,
  setUserData,
  setUserPlanData,
  setUserName,
} from '../../redux/slices/userSlice';
import axiosConfig from '../../config/axiosConfig';
import notification from '../theme/utility/notification';
import { setLoading } from '../../redux/slices/utilitySlice';
import {setwalletBalance , setcustomerWalletDetails} from '../../redux/slices/walletSlice';
import ForgotPassword from './forgotpassword';

// INFO: THIS COMPONENT CONTAINS LOGINPAGE LAYOUT

function LoginPage() {
  const { userData } = useAppSelector((state) => state?.user);
  const { user } = useAppSelector((state) => state?.user);
  const { role } = useAppSelector((state) => state?.user);
  const [openPasswordModal, setopenPasswordModal] = useState<boolean>(false);

  function toggleopenPasswordModal() {
    setopenPasswordModal((pre) => !pre);
  }
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setUserInput((pre) => ({ ...pre, [name]: value }));
  };

  useEffect(() => {
    let user = sessionStorage.getItem('bimaUser');
    let subscription_details = sessionStorage.getItem('bimaUserPlanData');
    

    if (user) {
      //@ts-ignore
      user = JSON.parse(user);
      dispatch(setLoading(false));
      //@ts-ignore
      dispatch(setUserData(user));
      //@ts-ignore
      dispatch(setUser(user?.email));
      //@ts-ignore
      dispatch(setRole(user?.role));
      //@ts-ignore
      subscription_details = JSON.parse(subscription_details);
      //@ts-ignore
      dispatch(setUserPlanData(subscription_details));

      if(role === 'admin'){
        let walletBalance = sessionStorage.getItem('bimaUserWalletBalance');
        let walletDetails = sessionStorage.getItem('bimaUserWalletDetails');
        //@ts-ignore
        walletBalance = JSON.parse(walletBalance);
        //@ts-ignore
        dispatch(setwalletBalance(walletBalance));
        //@ts-ignore
        walletDetails = JSON.parse(walletDetails);
        //@ts-ignore
        dispatch(setcustomerWalletDetails(walletDetails));
      }

      if (role === 'admin') {
        navigate('/home');
      }
      if (role === 'dataentry') {
        navigate('/dephome');
      }
    }
  }, []);

  // HANDLE LOGIN ON FORM SUBMISSION
  const handleSignin = async (e: any) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const {
        data: { data, subscription_details ,wallet_data },
      } = await axiosConfig.post('/signin', {
        email: userInput?.email,
        password: userInput?.password,
      });
      await dispatch(setUserName(data?.displayName));
      const {
        data: { data: userRole },
      } = await axiosConfig.get(`/role?email=${data.email}`);
      data.role = userRole.Role;
      console.log('Login Data', data);
      window.sessionStorage.setItem('bimaUser', JSON.stringify(data));
      window.sessionStorage.setItem(
        'bimaUserPlanData',
        JSON.stringify(subscription_details)
      );
      await dispatch(setLoading(false));
      await dispatch(setUserPlanData(subscription_details));
      console.log('sub details',subscription_details);

      if(data.role === 'admin' ){
        console.log("wallet details ", wallet_data?.walletdetails) 
        await dispatch(setcustomerWalletDetails(wallet_data));
        window.sessionStorage.setItem('bimaUserWalletDetails', JSON.stringify(wallet_data));

        //@ts-ignore
        const walletBalance = await axiosConfig.get(`/walletBalance?customerId=${wallet_data?.walletdetails}`);
        console.log("wallet balance on login",walletBalance?.data?.data?.balance / 100);
        await dispatch(setwalletBalance(walletBalance?.data?.data?.balance / 100));
        window.sessionStorage.setItem('bimaUserWalletBalance', JSON.stringify(walletBalance?.data?.data?.balance / 100));
      }
      

      await dispatch(setUserData(data));
      await dispatch(setUser(data?.email));
      await dispatch(setRole(data.role));
      // dispatch(setRole('dataentry'));
      if (data.Role === 'admin' || data.Role === 'underwriter') {
        navigate('/');
      }
      if (data.role === 'dataentry') {
        navigate('/dephome');
      }
      if (data.role === 'noncashless') {
        navigate('/nonCashlessHome');
      }
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  return (
    <>
      <AuthScreenWrapper title='LOGIN' submit={handleSignin}>
        <div className='authscreen__login'>
          <div className='input__group'>
            <input
              type='email'
              placeholder='Email'
              id='username'
              required
              name='email'
              value={userInput?.email}
              onChange={handleChange}
            />
          </div>
          <div className='input__group'>
            <input
              type='password'
              placeholder='Password'
              id='password'
              required
              name='password'
              value={userInput?.password}
              onChange={handleChange}
            />
          </div>
          <button>Log In</button>
        </div>
        <p className='mt-4 cursor-pointer' onClick={toggleopenPasswordModal}>
          Forget Password
        </p>
      </AuthScreenWrapper>

      {openPasswordModal && (
        <ForgotPassword
          isOpen={openPasswordModal}
          closeModal={toggleopenPasswordModal}
        />
      )}
    </>
  );
}

export default LoginPage;
