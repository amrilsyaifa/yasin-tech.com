import React from 'react';
import LayoutAuth from '../layout';
import AuthNavbar from '@components/Navbar/TopNavbar/AuthNavbar';
import FormLogin from './Form';
import IllustrationLogin from './Illustration';

const RegisterView = () => {
  return (
    <LayoutAuth navbarComponent={<AuthNavbar />}>
      <div className='flex w-full flex-row'>
        <div className='flex w-full flex-1'>
          <FormLogin />
        </div>
        <div className='hidden w-full md:flex md:flex-1'>
          <IllustrationLogin />
        </div>
      </div>
    </LayoutAuth>
  );
};

export default RegisterView;
