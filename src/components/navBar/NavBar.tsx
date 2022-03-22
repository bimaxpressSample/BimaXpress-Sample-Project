import React, { useEffect, useState } from 'react';
import { BiLink, BiBell } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import userImage from '../../assets/images/user.jpg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setRole, setUser, setUserData } from '../../redux/slices/userSlice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { currentMenu } = useAppSelector((state) => state?.home);
  const { user, userData, role, userPlanData } = useAppSelector(
    (state) => state?.user
  );
  const [caseHeading, setCaseHeading] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [showWarningNotification, setshowWarningNotification] = useState(
    // @ts-ignore
    userPlanData?.claimsleft <= 0.15 * userPlanData?.total_claims
  );

  // if (userPlanData) {
  //   // @ts-ignore
  //   if (userPlanData.claimsleft <= 0.15 * userPlanData.total_claims) {
  //     setshowWarningNotification(true);
  //   }
  // }

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
        {showWarningNotification && (
          <div
            id='alert'
            className='flex p-2 mr-5 bg-yellow-100 rounded-lg dark:bg-yellow-200'
            role='alert'
          >
            <svg
              className='flex-shrink-0 w-5 h-5 text-yellow-700 dark:text-yellow-800'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              ></path>
            </svg>
            <div className='ml-3 mr-2 text-sm font-medium text-yellow-700 dark:text-yellow-800'>
              {/* @ts-ignore */}
              You Have Only {userPlanData.claimsleft} Claims Left.{' '}
              <Link
                to='/plan'
                className='font-semibold underline hover:text-yellow-800 dark:hover:text-yellow-900'
              >
                Click Here
              </Link>{' '}
              to Buy Add-on.
            </div>
            <button
              onClick={() =>
                setshowWarningNotification(!showWarningNotification)
              }
              type='button'
              className='ml-auto -mx-1.5 -my-1.5 bg-yellow-100 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex h-8 w-8 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300'
              data-collapse-toggle='alert'
              aria-label='Close'
            >
              <span className='sr-only'>Close</span>
              <svg
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
        )}

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
