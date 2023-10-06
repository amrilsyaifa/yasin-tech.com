import React, { FC, ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  textOurSkll: string;
  skillInclude: string[];
  icon: ReactNode;
}

const Card: FC<CardProps> = ({
  title,
  description,
  skillInclude,
  icon,
  textOurSkll,
}) => {
  return (
    <div className='flex w-full flex-row items-center rounded-lg border border-gray-200 bg-white shadow  hover:border-gray-300'>
      <div className='ml-4 w-44'>{icon}</div>
      <div className='flex flex-col justify-between p-4 leading-normal'>
        <h5 className='mb-2 text-2xl font-medium tracking-tight text-yt-gray-600 '>
          {title}
        </h5>
        <p className='mb-3 font-normal text-yt-gray-600'>{description}</p>
        <p className='mt-4 text-yt-gray-600'>{textOurSkll}</p>
        <div className='mt-2 flex flex-row'>
          {skillInclude?.map((val, idx) => (
            <span
              key={idx}
              className='text-md mr-2 rounded border border-yt-blue-600 bg-white px-2.5 py-0.5 font-medium text-yt-blue-600 dark:text-yt-blue-600'
            >
              {val}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
