import Image from 'next/image';
import { FC } from 'react';
import { AiFillEdit, AiFillStar } from 'react-icons/ai';
import { CardProps } from './interface';
import Link from '@components/Link';

const Card: FC<CardProps> = ({
  id,
  src,
  name,
  company,
  jobTitle,
  rating,
  testimony,
}) => {
  return (
    <div className='flex items-stretch px-3'>
      <div className='group relative flex flex-col rounded-lg border-2 border-yt-gray-600 bg-white p-8 transition-all '>
        <Link
          href={`/dashboard/testimony/${id}/edit`}
          className='absolute right-2 top-2 hidden h-6 w-6 items-center justify-center rounded-full bg-yt-gray-200 group-hover:flex'
        >
          <AiFillEdit />
        </Link>
        <div className='flex w-full flex-col items-stretch xl:flex-row xl:items-center'>
          <div className='order-2 flex xl:order-1'>
            <div className='w-14'>
              <Image
                src={src}
                height={50}
                width={50}
                alt='Icon People'
                className='rounded-full'
              />
            </div>
            <div className='ml-5 flex flex-col text-left'>
              <p className='text-black-600 text-lg capitalize'>{name}</p>
              <p className='text-black-500 text-sm capitalize'>{company}</p>
              <p className='text-black-500 text-sm capitalize'>{jobTitle}</p>
            </div>
          </div>
          <div className='order-1 ml-4 flex flex-none items-center xl:order-2'>
            <p className='text-sm'>{rating}</p>
            <span className='ml-2 flex'>
              <AiFillStar />
            </span>
          </div>
        </div>
        <p className='mt-5 text-left'>“{testimony}”.</p>
      </div>
    </div>
  );
};

export default Card;
