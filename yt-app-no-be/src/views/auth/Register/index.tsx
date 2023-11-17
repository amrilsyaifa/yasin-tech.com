'use client';

import LayoutAuth from '../layout';
import AuthNavbar from '@components/Navbar/TopNavbar/AuthNavbar';
import FormRegister from './Form';
import IllustrationLogin from './Illustration';
import { GoogleOAuthProvider } from '@react-oauth/google';

const RegisterView = () => {
  return (
    <LayoutAuth navbarComponent={<AuthNavbar />}>
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
      >
        <div className='flex w-full flex-row'>
          <div className='flex w-full flex-1'>
            <FormRegister />
          </div>
          <div className='hidden w-full md:flex md:flex-1'>
            <IllustrationLogin />
          </div>
        </div>
      </GoogleOAuthProvider>
    </LayoutAuth>
  );
};

export default RegisterView;
