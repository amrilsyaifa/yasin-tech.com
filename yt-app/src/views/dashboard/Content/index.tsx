'use client';

import { AiFillPlusCircle } from 'react-icons/ai';
import List from './List';
import Link from '@components/Link';
import getAllPosts from '@hooks/api/usePosts';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Placeholder from '@components/Placeholder';
import { useTranslations } from 'next-intl';
import { EmptyStateDashboard } from '@components/EmptyState';

interface ITabList {
  name: string;
  key: 'publish' | 'draft' | 'dashboard';
}

const tabList: ITabList[] = [
  { name: 'Publish', key: 'publish' },
  { name: 'Draft', key: 'draft' },
  { name: 'Dashboard Show', key: 'dashboard' },
];

const ContentView = () => {
  const t = useTranslations('Dashboard');

  const [status, setStatus] = useState<'publish' | 'draft' | 'dashboard'>(
    'publish'
  );

  const { posts, isLoading, mutate } = getAllPosts({
    status: status === 'dashboard' ? undefined : status,
    for_show: status === 'dashboard' ? true : undefined,
  });

  useEffect(() => {
    mutate?.();
  }, [status]);

  return (
    <div className='w-full'>
      <div className='flex flex-row justify-end '>
        <Link
          href='/dashboard/content/create'
          className='mb-2 flex flex-row items-center space-x-2 rounded-lg bg-yt-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-yt-blue-500 focus:outline-none focus:ring-4 focus:ring-yt-blue-300 dark:bg-yt-blue-600 dark:hover:bg-yt-blue-600 dark:focus:ring-yt-blue-600'
        >
          <AiFillPlusCircle className='h-4 w-4 text-white' />
          <p>{t('content.create.write')}</p>
        </Link>
      </div>
      <ul className='flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400'>
        {tabList?.map((val) => (
          <li onClick={() => setStatus(val.key)} key={val.key} className='mr-2'>
            <div
              className={classNames({
                'active inline-block  cursor-pointer rounded-lg bg-blue-600 px-4 py-3 text-white':
                  val.key === status,
                'inline-block cursor-pointer rounded-lg px-4 py-3 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white':
                  val.key !== status,
              })}
              aria-current='page'
            >
              {val.name}
            </div>
          </li>
        ))}
      </ul>
      {isLoading && <Placeholder />}
      {!isLoading && (
        <>
          {isEmpty(posts) && (
            <EmptyStateDashboard
              title={t('content.empty_state.title')}
              description={t('content.empty_state.description')}
            />
          )}
          {!isEmpty(posts) && <List data={posts} />}
        </>
      )}
    </div>
  );
};

export default ContentView;
