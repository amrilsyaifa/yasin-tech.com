'use client';

import React, { FC, ReactNode, memo, useCallback } from 'react';
import MainNav from '@components/Navbar/TopNavbar/AdminNavbar';
import BreadCrumb from '@components/BreadCrumb/BreadCrumb';
import Sidebar from '@components/Sidebar/Sidebar';
import useDisclosure from '@hooks/useDisclosure';
import classNames from 'classnames';

interface WrapperAdminSidebarProps {
  children: ReactNode;
}
const WrapperAdminSidebar: FC<WrapperAdminSidebarProps> = ({ children }) => {
  const adminDisclosure = useDisclosure();

  const onOpenNav = useCallback(() => {
    adminDisclosure.onToggle();
  }, [adminDisclosure]);

  return (
    <div>
      <MainNav isOpen={adminDisclosure.isOpen} />
      <Sidebar isOpen={adminDisclosure.isOpen} onOpenNav={onOpenNav} />
      <div
        className={classNames(
          'content h-[calc(100vh-10px)] transform overflow-y-auto pb-4 pl-2 pt-20 duration-500 ease-in-out',
          {
            'ml-12': !adminDisclosure.isOpen,
            'ml-12 md:ml-60': adminDisclosure.isOpen,
          }
        )}
      >
        <BreadCrumb />
        <div className='-mr-2 mt-5 flex w-full flex-wrap px-6'>{children}</div>
      </div>
    </div>
  );
};

export default memo(WrapperAdminSidebar);
