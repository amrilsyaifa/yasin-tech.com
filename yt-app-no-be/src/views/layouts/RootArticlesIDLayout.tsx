import ArticlesIdNavbar from '@components/Navbar/TopNavbar/ArticlesIdNavbar';
import React, { FC } from 'react';
import { RootArticlesIDLayoutProps } from './interface';

const RootArticlesIDLayout: FC<RootArticlesIDLayoutProps> = ({ children }) => {
  return (
    <>
      <ArticlesIdNavbar />
      {children}
    </>
  );
};

export default RootArticlesIDLayout;
