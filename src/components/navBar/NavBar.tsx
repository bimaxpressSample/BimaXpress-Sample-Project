import React, { useEffect, useState } from 'react';
import { BiLink, BiBell } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import userImage from '../../assets/images/user.jpg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setRole, setUser, setUserData } from '../../redux/slices/userSlice';
import { useParams } from 'react-router-dom';

const NavBar = () => {
  const { currentMenu } = useAppSelector((state) => state?.home);
  const { user, userData, role } = useAppSelector((state) => state?.user);
  const [caseHeading, setCaseHeading] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleLogout = () => {
    sessionStorage?.removeItem('bimaUser');
    dispatch(setUserData({}));
    dispatch(setUser(''));
    dispatch(setRole(''));
    navigate('/');
  };

  useEffect(() => {
    if (params.case) {
      switch (params.case) {
        case 'new_application':
          setCaseHeading('New Application');
          break;
        case 'rmdraftcases':
          setCaseHeading('Draft Cases');
          break;
        case 'rmcompletecase':
          setCaseHeading('Completed Cases');
          break;
        case 'printcase':
          setCaseHeading('Printed Cases');
          break;
        default:
          setCaseHeading(params.case);
      }
    }
  }, [params.case]);

  return (
    <div className='flex items-center justify-between bg-primary px-4 py-3  mb-auto border-b border-fontColor-darkGray'>
      <p className='text-lg text-fontColor '>
        {currentMenu} {params.case ? ` | ${caseHeading}` : ''}{' '}
      </p>
      <div className='flex items-center'>
        <BiLink className='mr-3 text-fontColor text-lg' />
        <div className='relative'>
          <BiBell className='mr-3 text-fontColor text-lg' />
          <span className='absolute h-2 w-2 bg-green-500 rounded-full top-2 right-3'></span>
        </div>
        <div className='flex items-center'>
          <img
            src={userImage}
            alt='user'
            className='w-8 h-8 object-cover mr-3 rounded-full'
          />
          <div>
            <span className='block text-sm text-fontColor'>
              {/* @ts-ignore */}
              {user ? userData?.displayName || userData?.email : 'No user'}
            </span>
            <div className='flex items-center'>
              <span className='block text-xs text-fontColor'>{role}</span>
              {user ? (
                <span
                  className='block text-xs text-fontColor underline ml-4 cursor-pointer'
                  onClick={handleLogout}
                >
                  Logout
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
