import React, { useState } from 'react';
import {
  AiFillHome,
  AiOutlineMail,
  AiOutlineShoppingCart,
  AiOutlineClockCircle,
  AiOutlineUserAdd,
  AiOutlineFieldTime,
} from 'react-icons/ai';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { BiDetail } from 'react-icons/bi';
// import { RiSpamLine, RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
// import { IoDocumentOutline } from "react-icons/io5";
import { FaHospital, FaStethoscope, FaRegBuilding } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { MdOutlineInbox } from 'react-icons/md';
import { SiSimpleanalytics } from 'react-icons/si';
import logo from '../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCurrentMenu } from '../../redux/slices/homeSlice';
import { setCurrentMailList } from '../../redux/slices/mailSlice';
import menuIcon from '../../assets/icon/menu_black.svg';
import { setCollapseState } from '../../redux/slices/leftBarSlice';

const homeMenu = {
  name: 'Home',

  icon: <AiFillHome className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
  pageLink: '/',
};
const emailMenu = {
  name: 'Mail',
  icon: <AiOutlineMail className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
  pageLink: '/mail',
};

const inboxMail = {
  name: 'Inbox',
  amount: 200,
  icon: <MdOutlineInbox className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
  pageLink: '#',
};
const sentMail = {
  name: 'Sent',
  amount: 120,
  icon: <FiSend className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
  pageLink: '#',
};

const userDetails = {
  name: 'User Details',
  icon: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      fill='currentColor'
      className='bi bi-person text-fontColor mr-4 ml-2 md:ml-5 text-xl'
      viewBox='0 0 16 16'
    >
      <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' />
    </svg>
  ),
  pageLink: '/hospital',
};

const hospital = {
  name: 'Hospital',
  icon: <FaHospital className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
  pageLink: '/hospital',
};

const analyst = {
  name: 'Analyst',
  icon: (
    <SiSimpleanalytics className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
  ),
  pageLink: '/analyst',
};

const doctor = {
  name: 'Doctor',
  icon: <FaStethoscope className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
  pageLink: '/doctor',
};

const sideBarMenu = [
  {
    name: 'Add New Case',
    icon: (
      <HiOutlineViewGridAdd className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
    ),
    pageLink: '/newCase',
  },
  // {
  //   name: 'DEP',
  //   icon: (
  //     <HiOutlineViewGridAdd className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
  //   ),

  //   pageLink: '/depHome',
  // },

  {
    name: 'Plan Details',
    icon: <BiDetail className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,

    pageLink: '/plan',
  },

  {
    name: 'Empanelled Companies',
    icon: (
      <FaRegBuilding className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
    ),

    pageLink: '/empanelledCompanies',
  },
  {
    name: 'Order Details',
    icon: (
      <AiOutlineShoppingCart className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
    ),

    pageLink: '/order',
  },
  {
    name: 'New Order',
    icon: (
      <AiOutlineShoppingCart className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
    ),

    pageLink: '/ordernew',
  },
  {
    name: 'Reimbursement',
    icon: (
      <AiOutlineUserAdd className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
    ),
    pageLink: '/reimbursementHome',
  },
  {
    name: 'ES Dashboard',
    icon: (
      <AiOutlineClockCircle className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
    ),
    pageLink: '/earlysettlementDash',
  },
  {
    name: 'Early Settlement',
    icon: (
      <AiOutlineClockCircle className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
    ),
    pageLink: '/earlysettlement',
  },
  {
    name: 'Wallet',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18'
        height='18'
        fill='currentColor'
        className='bi bi-wallet2 mr-4 ml-2 md:ml-5 text-xl text-white'
        viewBox='0 0 16 16'
      >
        <path d='M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z' />
      </svg>
    ),
    pageLink: '/wallet',
  },

  // {
  //   name: 'BNPL Home(development)',
  //   icon: (
  //     <AiOutlineFieldTime className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
  //   ),
  //   pageLink: '/bnplHome',
  // },

  // {
  //   name: 'BNPL Application Form(development)',
  //   icon: (
  //     <AiOutlineFieldTime className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
  //   ),
  //   pageLink: '/bnplForm',
  // },
];

const SiderBar = () => {
  const [activeMenu, setActiveMenu] = useState(7);
  const [openEmailMenu, setOpenEmailMenu] = useState(false);
  const [openuserdetailMenu, setOpenuserdetailMenu] = useState(false);
  const [activeMailMenu, setActiveMailMenu] = useState(3);
  const [activeUserDetailsMenu, setActiveUserDetailsMenu] = useState(5);
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
  const handleuserdetailMenu = (num: number, name: string, link: string) => {
    if (user) {
      setActiveMenu(num);
      setOpenuserdetailMenu((pre) => !pre);
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

  // useEffect(()=>{
  //   const fetchRole = async() =>{
  //     try{
  //         const {
  //           data
  //         } = await axiosConfig.get(`/role?email=${user}`);

  //         // userRole = data.data.Role;
  //         console.log(data.data.role);
  //       }
  //       catch(error){
  //           console.log("error",error);
  //       }
  //   }
  // });

  const { collapsed } = useAppSelector((state) => state?.leftBarSlice);
  return (
    <>
      <div className='flex justify-center relative p-2 w-full bg-primary-dark'>
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
          <div
            className={`flex items-center justify-between p-3 my-4 rounded cursor-pointer  ${
              activeMenu === 8 ? ' bg-secondary-light' : ''
            } `}
            onClick={() =>
              handleEmailMenu(8, emailMenu?.name, emailMenu?.pageLink)
            }
          >
            <div className='flex'>
              {emailMenu?.icon}
              <p className='text-fontColor font-semibold text-sm'>
                {emailMenu?.name}
              </p>
            </div>
            {openEmailMenu ? (
              <IoIosArrowUp className='text-fontColor text-xl' />
            ) : (
              <IoIosArrowDown className='text-fontColor text-xl' />
            )}
          </div>
          {openEmailMenu ? (
            <div className='border-b border-fontColor-darkGray'>
              <Link
                to={inboxMail?.pageLink}
                className={`flex items-center justify-between p-3 my-2 rounded cursor-pointer  ${
                  3 === activeMailMenu ? 'bg-primary-light' : ''
                }`}
                onClick={() => {
                  setActiveMailMenu(3);
                  dispatch(setCurrentMailList('inbox'));
                }}
              >
                <div className='flex'>
                  {inboxMail?.icon}
                  <p className='text-fontColor font-semibold text-sm'>
                    {inboxMail?.name}
                  </p>
                </div>
                <p
                  className={`text-sm font-semibold  ${
                    3 === activeMailMenu
                      ? 'px-2 rounded-xl bg-fontColor text-primary-dark'
                      : 'text-fontColor'
                  }`}
                >
                  {inboxMailList?.length}
                </p>
              </Link>
              <Link
                to={sentMail?.pageLink}
                className={`flex items-center justify-between p-3 my-2 rounded cursor-pointer  ${
                  4 === activeMailMenu ? 'bg-primary-light' : ''
                }`}
                onClick={() => {
                  setActiveMailMenu(4);
                  dispatch(setCurrentMailList('sent'));
                }}
              >
                <div className='flex'>
                  {sentMail?.icon}
                  <p className='text-fontColor font-semibold text-sm'>
                    {sentMail?.name}
                  </p>
                </div>
                <p
                  className={`text-sm font-semibold  ${
                    4 === activeMailMenu
                      ? 'px-2 rounded-xl bg-fontColor text-primary-dark'
                      : 'text-fontColor'
                  }`}
                >
                  {sentMailList?.length}
                </p>
              </Link>
              {/* {innerMailMenu?.map((menu, index) => {
                return (
                  <Link
                    to={menu?.pageLink}
                    key={index}
                    className={`flex items-center justify-between p-3 my-2 rounded cursor-pointer  ${
                      index === activeMailMenu ? "bg-primary-light" : ""
                    }`}
                    onClick={() => setActiveMailMenu(index)}
                  >
                    <div className="flex">
                      {menu?.icon}
                      <p className="text-fontColor font-semibold text-sm">
                        {menu?.name}
                      </p>
                    </div>
                    <p
                      className={`text-sm font-semibold  ${
                        index === activeMailMenu
                          ? "px-2 rounded-xl bg-fontColor text-primary-dark"
                          : "text-fontColor"
                      }`}
                    >
                      {menu?.amount}
                    </p>
                  </Link>
                );
              })} */}
            </div>
          ) : null}

          <div
            className={`flex items-center justify-between p-3 my-4 rounded cursor-pointer  ${
              activeMenu === 9 ? ' bg-secondary-light' : ''
            } `}
            onClick={() =>
              handleuserdetailMenu(9, userDetails?.name, userDetails?.pageLink)
            }
          >
            <div className='flex'>
              {userDetails?.icon}
              <p className='text-fontColor font-semibold text-sm'>
                {userDetails?.name}
              </p>
            </div>
            {openuserdetailMenu ? (
              <IoIosArrowUp className='text-fontColor text-xl' />
            ) : (
              <IoIosArrowDown className='text-fontColor text-xl' />
            )}
          </div>
          {openuserdetailMenu ? (
            <div className='border-b border-fontColor-darkGray'>
              <Link
                to={hospital?.pageLink}
                className={`flex items-center justify-between p-3 my-2 rounded cursor-pointer  ${
                  5 === activeUserDetailsMenu ? 'bg-primary-light' : ''
                }`}
                onClick={() => {
                  setActiveUserDetailsMenu(5);
                  dispatch(setCurrentMailList('inbox'));
                }}
              >
                <div className='flex'>
                  {hospital?.icon}
                  <p className='text-fontColor font-semibold text-sm'>
                    {hospital?.name}
                  </p>
                </div>
              </Link>
              <Link
                to={analyst?.pageLink}
                className={`flex items-center justify-between p-3 my-2 rounded cursor-pointer  ${
                  6 === activeUserDetailsMenu ? 'bg-primary-light' : ''
                }`}
                onClick={() => {
                  setActiveUserDetailsMenu(6);
                  dispatch(setCurrentMailList('sent'));
                }}
              >
                <div className='flex'>
                  {analyst?.icon}
                  <p className='text-fontColor font-semibold text-sm'>
                    {analyst?.name}
                  </p>
                </div>
              </Link>
              <Link
                to={doctor?.pageLink}
                className={`flex items-center justify-between p-3 my-2 rounded cursor-pointer  ${
                  7 === activeUserDetailsMenu ? 'bg-primary-light' : ''
                }`}
                onClick={() => {
                  setActiveUserDetailsMenu(7);
                  dispatch(setCurrentMailList('sent'));
                }}
              >
                <div className='flex'>
                  {doctor?.icon}
                  <p className='text-fontColor font-semibold text-sm'>
                    {doctor?.name}
                  </p>
                </div>
              </Link>
              {/* {innerMailMenu?.map((menu, index) => {
                return (
                  <Link
                    to={menu?.pageLink}
                    key={index}
                    className={`flex items-center justify-between p-3 my-2 rounded cursor-pointer  ${
                      index === activeMailMenu ? "bg-primary-light" : ""
                    }`}
                    onClick={() => setActiveMailMenu(index)}
                  >
                    <div className="flex">
                      {menu?.icon}
                      <p className="text-fontColor font-semibold text-sm">
                        {menu?.name}
                      </p>
                    </div>
                    <p
                      className={`text-sm font-semibold  ${
                        index === activeMailMenu
                          ? "px-2 rounded-xl bg-fontColor text-primary-dark"
                          : "text-fontColor"
                      }`}
                    >
                      {menu?.amount}
                    </p>
                  </Link>
                );
              })} */}
            </div>
          ) : null}

          {sideBarMenu?.map((menu, index) => {
            return (
              <div
                key={index}
                className={`flex items-center p-3 my-4 rounded cursor-pointer${
                  index === activeMenu ? 'bg-primary-light' : ''
                } `}
                onClick={() =>
                  handleActiveMenu(index, menu?.name, menu?.pageLink)
                }
              >
                {menu?.icon}
                <p className='text-fontColor font-semibold text-sm'>
                  {menu?.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SiderBar;
