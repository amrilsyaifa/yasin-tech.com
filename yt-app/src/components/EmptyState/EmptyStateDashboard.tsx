import Image from 'next/image';
import Illustrator from '@components/Icons/empty.svg';
import { FC } from 'react';
import { EmptyStateDashboardProps } from './interface';

const EmptyStateDashboard: FC<EmptyStateDashboardProps> = ({
  title,
  description,
}) => {
  return (
    <div className='flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-center '>
      <Image className='h-80 w-80' src={Illustrator} alt='empty state' />
      <p className='text-2xl font-semibold text-yt-gray-600'>{title}</p>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
};

export default EmptyStateDashboard;
