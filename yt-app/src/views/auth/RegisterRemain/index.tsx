'use client';

import LayoutAuth from '../layout';
import AuthNavbar from '@components/Navbar/TopNavbar/AuthNavbar';
import FormRegister from './Form';
import IllustrationLogin from '../Register/Illustration';

const RegisterRemainView = () => {
  return (
    <LayoutAuth navbarComponent={<AuthNavbar />}>
      <div className='flex w-full flex-row'>
        <div className='flex w-full flex-1'>
          <FormRegister />
        </div>
        <div className='hidden w-full md:flex md:flex-1'>
          <IllustrationLogin />
        </div>
      </div>
    </LayoutAuth>
  );
};

export default RegisterRemainView;
