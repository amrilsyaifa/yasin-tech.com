import React, { FC, ReactNode } from 'react';
import HomeNavbar from '@components/Navbar/TopNavbar/HomeNavbar';

export interface RootArticlesLayoutProps {
  children: ReactNode;
}

const RootArticlesLayout: FC<RootArticlesLayoutProps> = ({ children }) => {
  return (
    <>
      <HomeNavbar />
      {children}
    </>
  );
};

export default RootArticlesLayout;
