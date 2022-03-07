import React, { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import logo from '../../../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { setCurrentMenu } from '../../../redux/slices/homeSlice';
import menuIcon from '../../../assets/icon/menu_black.svg';
import { setCollapseState } from '../../../redux/slices/leftBarSlice';

const homeMenu = {
  name: 'Home',

  icon: <AiFillHome className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
  pageLink: '/',
};

const sideBarMenu = {
 
    name: 'Add New Case',
    icon: <HiOutlineViewGridAdd className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
    pageLink: '/NonCashlessnewCase',

    };
const NonCashlessSiderBar = () => {
  const [activeMenu, setActiveMenu] = useState(7);
  const [openEmailMenu, setOpenEmailMenu] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const navigate = useNavigate();

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
            className={`flex items-center p-3 my-4 mt-22 mb-1 rounded cursor-pointer ${
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
      <div className={'bg-primary-dark p-3'}>
        <div
          className={
            collapsed
              ? 'mt-120-neg duration-4000 md:mt-0'
              : 'mt-0 duration-2000'
          }
        >
          <div
            className={`flex items-center p-3 my-4 mt-1 rounded cursor-pointer ${
              activeMenu === 8 ? 'bg-primary-light' : ''
            } `}
            onClick={() =>
              handleActiveMenu(8, sideBarMenu?.name, sideBarMenu?.pageLink)
            }
          >
            {sideBarMenu?.icon}
            <p className='text-fontColor font-semibold text-sm'>
              {sideBarMenu?.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NonCashlessSiderBar;
