import ArticlesIdNavbar from '@components/Navbar/TopNavbar/ArticlesIdNavbar';
import React, { FC, ReactNode } from 'react';

interface RootArticlesIDLayoutProps {
  children: ReactNode;
}

const RootArticlesIDLayout: FC<RootArticlesIDLayoutProps> = ({ children }) => {
  return (
    <>
      <ArticlesIdNavbar />
      {children}
    </>
  );
};

export default RootArticlesIDLayout;
