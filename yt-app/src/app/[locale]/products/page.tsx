'use client';

import ComingSoon from '@components/ComingSoon';
import RootLayout from '@views/home/layout/RootLayout';

const Products = () => {
  return (
    <RootLayout>
      <div className='flex flex-col'>
        <div className='mx-auto flex w-full max-w-screen-xl flex-col flex-wrap py-4'>
          <ComingSoon />
        </div>
      </div>
    </RootLayout>
  );
};

export default Products;
