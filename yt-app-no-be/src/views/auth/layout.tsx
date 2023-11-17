'use client';

import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  navbarComponent?: ReactNode;
}

const LayoutAuth: FC<LayoutProps> = ({ children, navbarComponent }) => {
  return (
    <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
      {navbarComponent}
      {children}
    </div>
  );
};

export default LayoutAuth;
