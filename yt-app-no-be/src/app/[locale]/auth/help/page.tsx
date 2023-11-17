'use client';

import ComingSoon from '@components/ComingSoon';
import HomeNavbar from '@components/Navbar/TopNavbar/HomeNavbar';

const page = () => {
  return (
    <div className='flex flex-col'>
      <HomeNavbar />
      <div className='mx-auto flex w-full max-w-screen-xl flex-col flex-wrap py-4'>
        <ComingSoon />
      </div>
    </div>
  );
};

export default page;
