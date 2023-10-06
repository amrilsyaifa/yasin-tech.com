import React, { FC } from 'react';
import { RootHomeLayoutProps } from './interface';
import FooterHome from '@components/Footer/FooterHome';
import HomeNavbar from '@components/Navbar/TopNavbar/HomeNavbar';

const RootHomeLayout: FC<RootHomeLayoutProps> = ({ children }) => {
  return (
    <>
      <HomeNavbar />
      <div className='flex flex-col'>
        <div className='mx-auto flex w-full flex-col flex-wrap py-4'>
          {children}
        </div>
      </div>
      <FooterHome />
    </>
  );
};

export default RootHomeLayout;
