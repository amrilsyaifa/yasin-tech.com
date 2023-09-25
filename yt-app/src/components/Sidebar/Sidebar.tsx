import { FC, memo } from 'react';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { AiOutlineHome, AiOutlineMenu, AiOutlineMeh } from 'react-icons/ai';
import Link from '@components/Link';

interface SidebarProps {
  isOpen: boolean;
  onOpenNav: () => void;
}

const Sidebar: FC<SidebarProps> = ({ onOpenNav, isOpen }) => {
  const t = useTranslations('');

  const lists = [
    {
      key: 'home',
      title: t('Dashboard.common.dashboard'),
      icon: <AiOutlineHome />,
      link: '/',
    },
    {
      key: 'content',
      title: t('Dashboard.common.content'),
      icon: <AiOutlineMenu />,
      link: '/content',
    },
    {
      key: 'testimony',
      title: t('Dashboard.common.testimony'),
      icon: <AiOutlineMeh />,
      link: '/testimony',
    },
  ];
  return (
    <aside
      className={classNames(
        'fixed z-50 flex h-screen w-60 transform bg-yt-gray-600 transition duration-1000 ease-in-out',
        {
          '-translate-x-48': !isOpen,
          'translate-x-none': isOpen,
        }
      )}
    >
      {/* <!-- open sidebar button --> */}
      <div
        className={classNames(
          'max-toolbar absolute -right-6 top-2 flex h-12 w-full transform items-center justify-between rounded-full border-4 border-white bg-yt-gray-600 transition duration-300 ease-in dark:border-[#0F172A]',
          {
            'translate-x-0': isOpen,
            'translate-x-24 scale-x-0': !isOpen,
          }
        )}
      >
        <div className='hidden items-center space-x-2 pl-4'>
          <div>
            <div
              // onclick="setDark('dark')"
              className='moon text-white hover:text-yt-blue-500 dark:hover:text-yt-blue-600'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='{3}'
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
                />
              </svg>
            </div>
            <div
              className={classNames(
                'sun text-white hover:text-yt-blue-500 dark:hover:text-yt-blue-600',
                {
                  hidden: isOpen,
                  flex: !isOpen,
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                />
              </svg>
            </div>
          </div>
          <div className='text-white hover:text-yt-blue-500 dark:hover:text-yt-blue-600'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='{3}'
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
              />
            </svg>
          </div>
        </div>
        <div
          className={classNames(
            'group items-center space-x-3 rounded-full bg-gradient-to-r from-yt-blue-600 via-yt-blue-500 to-yt-blue-400 py-1 pl-10 pr-2 text-white dark:from-yt-blue-600 dark:to-yt-blue-400',
            {
              flex: isOpen,
              hidden: !isOpen,
            }
          )}
        >
          <div className='mr-12 transform duration-300 ease-in-out'>
            {t('LocaleLayout.title')}
          </div>
        </div>
      </div>
      <div
        onClick={onOpenNav}
        className='absolute -right-6 top-2 flex transform rounded-full border-4 border-white bg-yt-gray-600 p-3 text-white transition duration-500 ease-in-out hover:rotate-45 hover:bg-purple-500 dark:border-[#0F172A] dark:hover:bg-blue-500'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='{3}'
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z'
          />
        </svg>
      </div>
      {/* <!-- MAX SIDEBAR--> */}
      <div
        className={classNames(
          'max mt-20 h-screen w-full flex-col space-y-2 text-white',
          {
            hidden: !isOpen,
            flex: isOpen,
          }
        )}
      >
        {lists?.map((val) => (
          <Link
            href={`/dashboard${val.link}`}
            key={val.key}
            className='flex w-full transform flex-row items-center space-x-3 rounded-full bg-yt-gray-600 p-2 pl-8 text-white duration-300 ease-in-out hover:ml-4 hover:text-purple-500 dark:hover:text-yt-blue-500'
          >
            {val.icon}
            <div>{val.title}</div>
          </Link>
        ))}
      </div>
      {/* <!-- MINI SIDEBAR--> */}
      <div
        className={classNames(
          'mini mt-20  h-screen w-full flex-col space-y-2',
          {
            flex: !isOpen,
            hidden: isOpen,
          }
        )}
      >
        {lists?.map((val) => (
          <Link
            href={`/dashboard${val.link}`}
            key={val.key}
            className='flex w-full transform justify-end rounded-full bg-yt-gray-600 p-3 pr-5 text-white duration-300 ease-in-out hover:ml-4 hover:text-purple-500 dark:hover:text-yt-blue-500'
          >
            {val.icon}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default memo(Sidebar);
