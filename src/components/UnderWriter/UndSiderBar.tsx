import React, { useEffect, useState } from 'react';
import {
  AiFillHome,
} from 'react-icons/ai';

import logo from '../../assets/images/logo.svg';
import {  useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCurrentMenu } from '../../redux/slices/homeSlice';
import menuIcon from '../../assets/icon/menu_black.svg';
import { setCollapseState } from '../../redux/slices/leftBarSlice';
import axiosConfig from '../../config/axiosConfig';

const homeMenu = {
  name: 'Home',

  icon: <AiFillHome className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
  pageLink: '/',
};
// const emailMenu = {
//   name: 'Mail',
//   icon: <AiOutlineMail className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
//   pageLink: '/mail',
// };

// const inboxMail = {
//   name: 'Inbox',
//   amount: 200,
//   icon: <MdOutlineInbox className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
//   pageLink: '#',
// };
// const sentMail = {
//   name: 'Sent',
//   amount: 120,
//   icon: <FiSend className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
//   pageLink: '#',
// };

// const sideBarMenu = [
//   {
//     name: 'Add New Case',
//     icon: (
//       <HiOutlineViewGridAdd className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
//     ),
//     pageLink: '/newCase',
//   },


//   {
//     name: 'Discharge',
//     icon: (
//       <HiOutlineViewGridAdd className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
//     ),
//     pageLink: '/dis',
//   },
//   // {
//   //   name: 'DEP',
//   //   icon: (
//   //     <HiOutlineViewGridAdd className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
//   //   ),

//   //   pageLink: '/depHome',
//   // },

//   {
//     name: 'Plan Details',
//     icon: <BiDetail className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,

//     pageLink: '/plan',
//   },
//   {
//     name: 'Hospital',
//     icon: <FaHospital className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,

//     pageLink: '/hospital',
//   },
//   {
//     name: 'Analyst',
//     icon: (
//       <SiSimpleanalytics className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
//     ),

//     pageLink: '/analyst',
//   },
//   {
//     name: 'Doctor',
//     icon: (
//       <FaStethoscope className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
//     ),

//     pageLink: '/doctor',
//   },
//   {
//     name: 'Empanelled Companies',
//     icon: (
//       <FaRegBuilding className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
//     ),

//     pageLink: '/empanelledCompanies',
//   },
//   {
//     name: 'Order Details',
//     icon: (
//       <AiOutlineShoppingCart className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
//     ),

//     pageLink: '/order',
//   },
// ];

const UndSiderBar = () => {
  const [activeMenu, setActiveMenu] = useState(7);
  const [openEmailMenu, setOpenEmailMenu] = useState(false);
  const [activeMailMenu, setActiveMailMenu] = useState(3);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { inboxMailList, sentMailList } = useAppSelector(
    (state) => state?.mail
  );
  const navigate = useNavigate();

  const handleEmailMenu = (num: number, name: string, link: string) => {
    if (user) {
      setActiveMenu(num);
      setOpenEmailMenu((pre) => !pre);
      navigate(link);
    } else {
      navigate('/login');
    }
  };
  const handleActiveMenu = (num: number, name: string, link: string) => {
    dispatch(setCollapseState(!collapsed));
    if (user) {
      setActiveMenu(num);
      dispatch(setCurrentMenu(name));
      if (openEmailMenu) {
        setOpenEmailMenu(false);
      }
      navigate(link);
    } else {
      navigate('/login');
    }
  };

  useEffect(()=>{
    const fetchRole = async() =>{
      try{
          const {
            data
          } = await axiosConfig.get(`/role?email=${user}`);
    
          // userRole = data.data.Role;
          console.log(data.data.role);
        }
        catch(error){
            console.log("error",error);
        }
    }
  });

  const { collapsed } = useAppSelector((state) => state?.leftBarSlice);
  return (
    <>
      <div className='flex justify-center relative h-24 p-3 w-full bg-primary-dark'>
        <div className='w-auto h-10'>
          <img src={logo} alt='logo' />
        </div>

        <div
          className={`flex ml-auto mb-8 absolute overflow-hidden top-14 rounded-full h-10 w-10 md:hidden`}
        >
          <div
            className={`w-full h-full grid items-center justify-center bg-primary-light`}
          >
            <img
              className='cursor-pointer'
              src={menuIcon}
              alt=''
              onClick={() => dispatch(setCollapseState(!collapsed))}
            />
          </div>
        </div>
      </div>
      <div className={'bg-primary-dark p-3'}>
        <div
          className={
            collapsed
              ? 'mt-120-neg duration-4000 md:mt-0'
              : 'mt-0 duration-2000'
          }
        >
          <div
            className={`flex items-center p-3 my-4 rounded cursor-pointer ${
              activeMenu === 7 ? 'bg-primary-light' : ''
            } `}
            onClick={() =>
              handleActiveMenu(7, homeMenu?.name, homeMenu?.pageLink)
            }
          >
            {homeMenu?.icon}
            <p className='text-fontColor font-semibold text-sm'>
              {homeMenu?.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UndSiderBar;
