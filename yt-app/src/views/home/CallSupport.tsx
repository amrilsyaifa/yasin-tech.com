'use client';

import { useTranslations } from 'next-intl';
import { FcCustomerSupport } from 'react-icons/fc';

const CallSupport = () => {
  const t = useTranslations('Auth');
  return (
    <a
      target='_blank'
      href={`https://wa.me/6282272271374?text=${t(
        'pages.home.call_support.message'
      )}`}
    >
      <div className='fixed bottom-4 right-4 z-50 flex cursor-pointer flex-col items-center justify-center md:bottom-8 md:right-8'>
        <p className='text-yt-gray-600'>Talk to us?</p>
        <FcCustomerSupport className='h-16 w-16 -scale-x-100' />
      </div>
    </a>
  );
};

export default CallSupport;
