import LogoText from '@components/Icons/yt-icon-text.svg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from '@components/Link';
import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { useOnClickOutside } from 'usehooks-ts';

const AuthNavbar = () => {
  const t = useTranslations('Auth');
  const [isOpenDrawer, setIsOpenDeawer] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const onToogle = useCallback(() => {
    setIsOpenDeawer(!isOpenDrawer);
  }, [isOpenDrawer]);

  const onClose = useCallback(() => {
    setIsOpenDeawer(false);
  }, []);

  useOnClickOutside(ref, onClose);

  return (
    <nav className='w-full border-gray-200 bg-white'>
      <div className='flex w-full flex-row items-center justify-between'>
        <Link href='/' className='flex items-center'>
          <Image src={LogoText} alt={'logo'} />
        </Link>
        <button
          onClick={onToogle}
          data-collapse-toggle='navbar-default'
          type='button'
          className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-yt-gray-500 hover:bg-yt-gray-100 focus:outline-none focus:ring-2 focus:ring-yt-gray-200 dark:text-yt-gray-400 dark:hover:bg-yt-gray-600 dark:focus:ring-yt-gray-600 md:hidden'
          aria-controls='navbar-default'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='h-5 w-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div
          ref={ref}
          className={classNames('w-full md:block md:w-auto', {
            'absolute right-4 top-12 block w-[calc(100%-32px)]': isOpenDrawer,
            hidden: !isOpenDrawer,
          })}
        >
          <ul className='mt-4 flex flex-col rounded-lg border border-yt-gray-100 bg-gray-50 p-4 font-medium dark:border-yt-gray-600 dark:bg-yt-gray-600 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 '>
            <li>
              <Link
                href='/auth/help'
                className='block rounded py-2 pl-3 pr-4 capitalize text-yt-blue-500 hover:bg-yt-gray-100 dark:text-blue-500 dark:hover:bg-yt-gray-600 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-yt-blue-600 md:dark:hover:bg-transparent md:dark:hover:text-yt-blue-500'
              >
                {t('navbar.top_navbar.auth.help')}
              </Link>
            </li>
            <li>
              <Link
                href='/contact'
                className='block rounded py-2 pl-3 pr-4 capitalize text-yt-blue-500 hover:bg-yt-gray-100 dark:text-blue-500 dark:hover:bg-yt-gray-600 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-yt-blue-600 md:dark:hover:bg-transparent md:dark:hover:text-yt-blue-500'
              >
                {t('navbar.top_navbar.auth.contact')}
              </Link>
            </li>
            <li>
              <Link
                href='/'
                className='block rounded py-2 pl-3 pr-4 capitalize text-yt-blue-500 hover:bg-yt-gray-100 dark:text-blue-500 dark:hover:bg-yt-gray-600 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-yt-blue-600 md:dark:hover:bg-transparent md:dark:hover:text-yt-blue-500'
              >
                {t('navbar.top_navbar.auth.home')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
