import Link from '@components/Link/Link';
import useDisclosure from '@hooks/useDisclosure';
import { IMyProfile } from '@stores/myProfile/myProfile';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { FC, useRef } from 'react';
import { AiOutlineDown, AiOutlineUser } from 'react-icons/ai';
import { useOnClickOutside } from 'usehooks-ts';

interface UserHomeNavbarProps {
  profile: IMyProfile;
}

const UserHomeNavbar: FC<UserHomeNavbarProps> = ({ profile }) => {
  const t = useTranslations('');
  const dropdown = useDisclosure();
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => dropdown.onClose());

  const lists = [
    {
      key: 'profile',
      title: t('Dashboard.common.profile'),
      link: `/dashboard/profile`,
    },
    {
      key: 'dashboard',
      title: t('Dashboard.common.dashboard'),
      link: `/dashboard`,
    },
    {
      key: 'settings',
      title: t('Dashboard.common.settings'),
      link: `/dashboard/settings`,
    },
    {
      key: 'sign_out',
      title: t('Dashboard.common.sign_out'),
      link: `/signout`,
    },
  ];

  return (
    <div className='relative' ref={ref}>
      <button
        onClick={dropdown.onToggle}
        id='dropdownNavbarLink'
        data-dropdown-toggle='dropdownNavbar'
        className='flex w-full items-center space-x-2 py-2  pl-3 pr-4 text-yt-blue-600 hover:bg-yt-gray-100 dark:border-gray-700 dark:text-yt-blue-500 dark:hover:bg-yt-gray-600 dark:hover:text-white dark:focus:text-yt-blue-600 md:w-auto md:justify-between md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-yt-blue-600 md:dark:hover:bg-transparent md:dark:hover:text-yt-blue-500'
      >
        <div className='flex h-6 w-6 items-center justify-center rounded-full border border-yt-blue-500'>
          <AiOutlineUser className='h-4 w-4' />
        </div>
        <p className='capitalize'>
          {profile?.profile?.first_name} {profile?.profile?.last_name}
        </p>
        <AiOutlineDown />
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        id='dropdownNavbar'
        className={classNames(
          'z-10 w-full divide-y divide-gray-100 rounded-lg bg-white font-normal dark:divide-gray-600 dark:bg-gray-700 md:absolute',
          {
            hidden: !dropdown.isOpen,
          }
        )}
      >
        <ul
          className='dark:bg-yt-gray-50 w-full space-y-2 rounded-md border-yt-gray-100 bg-yt-gray-500 p-4 text-sm text-gray-700 dark:border-yt-gray-600 dark:text-gray-400'
          aria-labelledby='dropdownLargeButton'
        >
          {lists.map((val) => (
            <li key={val.key}>
              <Link
                href={val.link}
                className='block rounded py-2 pl-3 pr-4 capitalize text-yt-blue-600 hover:bg-yt-gray-100 dark:text-yt-blue-500 dark:hover:bg-yt-gray-600 dark:hover:text-white md:border-0 md:p-0 md:text-white md:hover:bg-transparent md:hover:text-yt-blue-600 md:dark:hover:bg-transparent md:dark:hover:text-yt-blue-500'
              >
                {val.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserHomeNavbar;
