import React, { FC } from 'react';
import HomeNavbar from '@components/Navbar/TopNavbar/HomeNavbar';
import { RootArticlesLayoutProps } from './interface';

const RootArticlesLayout: FC<RootArticlesLayoutProps> = ({ children }) => {
  return (
    <>
      <HomeNavbar />
      {children}
    </>
  );
};

export default RootArticlesLayout;
