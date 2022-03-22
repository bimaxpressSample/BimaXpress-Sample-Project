import React, { useEffect, useState } from 'react';
import { BiLink, BiBell } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import userImage from '../../assets/images/user.jpg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setRole, setUser, setUserData } from '../../redux/slices/userSlice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setshowWarning } from '../../redux/slices/userSlice';
import { setCurrentPlan } from "../../redux/slices/planSlice";
import axiosConfig from "../../config/axiosConfig";

const NavBar = () => {
  const { currentMenu } = useAppSelector((state) => state?.home);
  const { walletBalance } = useAppSelector((state) => state?.wallet);
  const { user, userData, role, userPlanData, showWarning } = useAppSelector((state) => state?.user);
  const [caseHeading, setCaseHeading] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // @ts-ignore
  const [showWarningNotification, setshowWarningNotification] = useState(userPlanData?.claimsleft <= 0.15 * userPlanData?.total_claims);

//   const fetchCurrentPlan = async () => {
//     // dispatch(setLoading(true));
//     const URL = `/plandetails?email=${user}`;
//     try {
//         const { data } = await axiosConfig.get(URL);
//         console.log("plain details ", data);

//         // dispatch(setLoading(false));
//         dispatch(setCurrentPlan(data?.data));
//     } catch (error) {
//         // dispatch(setLoading(false));
//         //@ts-ignore
//         notification("error", error?.message);
//     }
// };

//   useEffect(() => {
    
//     fetchCurrentPlan();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

  useEffect(()=>{
    // @ts-ignore
    setshowWarningNotification(userPlanData?.claimsleft <= 0.15 * userPlanData?.total_claims);
  },[userPlanData])

  console.log("Show warning", showWarning);
  console.log("Show warning notification ", showWarningNotification);
  //@ts-ignore
  console.log("user claim left", userPlanData?.claimsleft);
  //@ts-ignore
  console.log("Show total", userPlanData?.total_claims);
  //@ts-ignore
  console.log("Show Plan", userPlanData);


  // if (userPlanData) {
  //   console.log("start" , showWarning);
  //   // @ts-ignore
  //   if (userPlanData?.claimsleft <= 0.15 * userPlanData?.total_claims && showWarning) {
  //     setshowWarningNotification(true);
  //   }
  //   console.log("end");
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

        {
          showWarningNotification &&
          <div id="alert" className="flex p-2 mr-5 bg-yellow-100 rounded-lg dark:bg-yellow-200" role="alert">
            <svg className="flex-shrink-0 w-5 h-5 text-yellow-700 dark:text-yellow-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <div className="ml-3 mr-2 text-sm font-medium text-yellow-700 dark:text-yellow-800">
              {/* @ts-ignore */}
              You Have Only {userPlanData?.claimsleft} Claims Left. <Link to='/plan' className="font-semibold underline hover:text-yellow-800 dark:hover:text-yellow-900">Click Here</Link> to Buy Add-on.
            </div>
            <button onClick={() => setshowWarningNotification(!showWarningNotification)} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-yellow-100 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex h-8 w-8 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300" data-collapse-toggle="alert" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
        }

        <div onClick={() => navigate('/wallet') } className='flex mr-5 cursor-pointer' style={{background: 'transparent linear-gradient(99deg, #ffffff4d 0%, #ffffff00 100%) 0% 0% no-repeat padding-box' , boxShadow: 'inset 0px 0px 10px #ffffff1a',padding: '5px 7px' , borderRadius: '10px' , alignItems: 'center'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-wallet2 mr-4 ml-2 md:ml-2 text-xl text-white" viewBox="0 0 16 16">
            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
          </svg>
          <span className='text-white mr-3'>
            ₹ {walletBalance} 
          </span>
        </div>


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