import React, { FC } from 'react';
import CardVertical from './CardVertical';
import { PostProps } from '@hooks/api/usePosts/interface';

interface ContentVerticalProps {
  data: PostProps[];
}

const ContentVertical: FC<ContentVerticalProps> = ({ data }) => {
  return (
    <div className='flex flex-col bg-white'>
      <div className='mx-auto flex w-full max-w-screen-xl flex-col flex-wrap space-y-20 py-4'>
        {data?.map((val) => <CardVertical key={val.id} data={val} />)}
      </div>
    </div>
  );
};

export default ContentVertical;
