import Image from 'next/image';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { AiOutlineUser } from 'react-icons/ai';
import { useOnClickOutside } from 'usehooks-ts';
import { FC, memo, useEffect, useRef } from 'react';
import useDisclosure from '@hooks/useDisclosure';
import Link from '@components/Link';
import getProfile from '@hooks/api/useProfile';
import useMyProfile from '@stores/myProfile';
import { isEmpty } from 'lodash';

interface AdminNavbarProps {
  isOpen: boolean;
}

const AdminNavbar: FC<AdminNavbarProps> = ({ isOpen }) => {
  const t = useTranslations('');
  const dropdown = useDisclosure(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => dropdown.onClose());

  const { profile: profileFetching, isLoading } = getProfile();
  const profile = useMyProfile((state) => state.profile);
  const setMyProfile = useMyProfile((state) => state.setMyProfile);

  useEffect(() => {
    if (!isEmpty(profileFetching)) {
      setMyProfile(profileFetching);
    }
  }, [profileFetching]);

  const lists = [
    {
      key: 'profile',
      title: t('Dashboard.common.profile'),
      link: `/dashboard/profile`,
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

  const hasImageUrl = !isEmpty(profile?.profile?.image);

  return (
    <div className='fixed z-30 flex h-16 w-full items-center justify-center bg-white p-2 px-10 dark:bg-yt-gray-600'>
      <div
        className={classNames(
          'logo flex h-full flex-none transform items-center justify-center duration-500 ease-in-out dark:text-white',
          {
            'ml-12': !isOpen,
          }
        )}
      >
        {t('LocaleLayout.title')}
      </div>
      {/* <!-- SPACER --> */}
      <div className='flex h-full grow items-center justify-center'></div>
      <div
        className='relative flex h-full flex-none items-center justify-center text-center'
        ref={ref}
      >
        {isLoading ? (
          <Placeholder />
        ) : (
          <div
            onClick={dropdown.onToggle}
            className='flex cursor-pointer items-center space-x-3 px-3'
          >
            <div className='flex flex-none justify-center'>
              <div
                className={classNames(
                  'flex h-8 w-8 items-center justify-center',
                  {
                    'rounded-full border border-white': !hasImageUrl,
                  }
                )}
              >
                {hasImageUrl ? (
                  <Image
                    src=''
                    alt='profile'
                    className='rounded-full object-cover shadow'
                  />
                ) : (
                  <AiOutlineUser className='text-white' />
                )}
              </div>
            </div>

            <div className='md:text-md hidden text-sm text-black dark:text-white md:block'>
              {profile?.profile?.first_name} {profile?.profile?.last_name}
            </div>
          </div>
        )}

        <div
          id='dropdown'
          className={classNames(
            'absolute right-0 top-16 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-yt-gray-600',
            {
              hidden: !dropdown.isOpen,
            }
          )}
        >
          <ul
            className='py-2 text-sm text-gray-700 dark:text-gray-200'
            aria-labelledby='dropdownDefaultButton'
          >
            {lists.map((val) => (
              <Link
                key={val.key}
                href={val.link}
                className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                <li>{val.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Placeholder = () => {
  return (
    <div
      role='status'
      className='flex animate-pulse flex-row items-center space-y-2 md:flex md:items-center md:space-x-2 md:space-y-0'
    >
      <div className='h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700' />
      <div className='h-6 w-40 rounded-full bg-gray-200 dark:bg-gray-700' />
    </div>
  );
};

export default memo(AdminNavbar);
