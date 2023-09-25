'use client';

import { PostProps } from '@hooks/api/usePosts/interface';
import Card from './Card';
import { FC } from 'react';

interface ListProps {
  data: PostProps[];
}

const List: FC<ListProps> = ({ data }) => {
  return (
    <div className='grid-rows-8 mt-6 grid grid-cols-5 gap-4'>
      {data?.map((val) => <Card key={val.id} data={val} />)}
    </div>
  );
};

export default List;
