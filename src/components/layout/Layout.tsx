import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import LogoNav from '../navBar/LogoNav';
import NavBar from '../navBar/NavBar';
import SiderBar from '../sideBar/SiderBar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state?.user);
  let userSession = sessionStorage.getItem('bimaUser');
  useEffect(() => {
    if (!user && !userSession) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className='grid grid-cols-12 mx-auto h-full min-h-screen w-full'>
      {user ? (
        <>
          <div className='col-span-12 md:col-span-3 bg-primary-dark border-r border-gray-500'>
            <SiderBar />
          </div>
          <div className=' col-span-12 md:col-span-9 bg-primary-light min-h-screen md:min-h-0'>
            <NavBar />
            {children}
          </div>
        </>
      ) : (
        <div className='col-span-12'>
          <LogoNav />
          {children}
        </div>
      )}
    </div>
  );
};

export default Layout;
