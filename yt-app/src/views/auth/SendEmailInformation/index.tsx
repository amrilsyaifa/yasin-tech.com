import Image from 'next/image';
import LayoutAuth from '../layout';
import Illustration from '@components/Icons/illustration-email-confirmation.svg';
import AuthNavbar from '@components/Navbar/TopNavbar/AuthNavbar';

const SendEmailInformationView = () => {
  return (
    <LayoutAuth navbarComponent={<AuthNavbar />}>
      <div className='mt-24 flex w-full flex-col items-center justify-center '>
        <Image src={Illustration} alt='illustration email confirmation' />
        <div className='mt-12 flex w-full max-w-xl flex-col items-center justify-center'>
          <p className='text-center text-xl font-bold text-yt-gray-600'>
            Verify your email address
          </p>
          <p className='pt-2 text-center text-lg text-yt-gray-600'>
            We’ve sent an email to thomas@email.com to verify your email address
            and activate your account. The link in the email will expire in 24
            hours
          </p>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default SendEmailInformationView;
