import Image from 'next/image';
import Link from '@components/Link';
import React from 'react';

const Card = () => {
  return (
    <Link
      href='/articles/1234'
      className='mb-4 flex w-72 flex-col items-center justify-center rounded-xl p-5 shadow'
    >
      <Image src='' alt='ii' className='h-48 w-64 rounded-xl bg-yt-gray-100' />
      <div className='mt-6 w-full text-lg font-semibold'>
        <p className='line-clamp-3'>
          Make animated light mode and dark mode toggle with CSS Make animated
          light mode and dark mode toggle with CSS
        </p>
      </div>
      <div className='mt-6 flex w-full flex-row items-center space-x-2'>
        <Image
          className='flex h-14 w-14 basis-[75px] rounded-full bg-yt-gray-100'
          src=''
          alt='Default avatar'
        />
        <div className='flex w-full flex-col'>
          <p className='text-base font-semibold text-yt-gray-600'>
            Amril Syaifa Yasin
          </p>
          <div className='flex w-full flex-row items-center justify-between'>
            <p className='text-sm font-normal text-yt-gray-600'>Jan 10, 2022</p>
            <div className='flex flex-row items-center space-x-2'>
              <div className='h-1 w-1 rounded-full bg-yt-gray-600' />
              <p className='text-sm font-normal text-yt-gray-600'>3 min ago</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
