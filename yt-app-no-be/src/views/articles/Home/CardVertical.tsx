'use client';

import Image from 'next/image';
import Link from '@components/Link';
import React, { FC } from 'react';
import { PostProps } from '@hooks/api/usePosts/interface';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { AiOutlineUser } from 'react-icons/ai';
import { isEmpty } from 'lodash';
import { format, formatDistance } from 'date-fns';

interface CardVerticalProps {
  data: PostProps;
}

const CardVertical: FC<CardVerticalProps> = ({ data }) => {
  const editorTitle = useEditor({
    editable: false,
    content: data.title,
    extensions: [StarterKit],
  });

  const editorDescription = useEditor({
    editable: false,
    content: data.description,
    extensions: [StarterKit],
  });

  const textTitle = editorTitle?.getText();
  const textDescription = editorDescription?.getText();
  const hasImageUrl = !isEmpty(data.author.profile.image);
  const src = data?.thumbnail ?? (process.env.NEXT_PUBLIC_BASE_URL as string);

  return (
    <Link
      href={`/articles/${data.slug}`}
      className='mb-4 flex w-full cursor-pointer flex-row items-center justify-between rounded-xl p-5 shadow'
    >
      <div className='flex w-[calc(100%-256px)] flex-col'>
        <div className='mt-6 w-full text-lg font-semibold'>
          <p className='line-clamp-3'>{textTitle}</p>
          <p className='line-clamp-6 text-sm font-normal text-gray-600'>
            {textDescription}
          </p>
        </div>
        <div className='mt-6 flex w-full flex-row items-center space-x-2'>
          {hasImageUrl ? (
            <Image
              src=''
              alt='profile'
              className='flex h-14 w-14 rounded-full bg-yt-gray-100'
            />
          ) : (
            <div className='flex h-14 w-14 items-center justify-center rounded-full border bg-yt-gray-100'>
              <AiOutlineUser className='flex h-10 w-10 rounded-full font-normal text-yt-gray-600' />
            </div>
          )}

          <div className='flex w-full flex-col'>
            <p className='text-base font-semibold text-yt-gray-600'>
              {data.author.profile.first_name} {data.author.profile.last_name}
            </p>
            <div className='flex w-full flex-row items-center '>
              <p className='text-sm font-normal text-yt-gray-600'>
                {format(new Date(data.createdAt), 'MMMM dd yyyy')}
              </p>
              <div className='ml-2 flex flex-row items-center space-x-2'>
                <div className='h-1 w-1 rounded-full bg-yt-gray-600' />
                <p className='text-sm font-normal text-yt-gray-600'>
                  {formatDistance(new Date(data.createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        height={192}
        width={256}
        src={src}
        alt={data.slug}
        className='h-48 w-64 rounded-xl bg-yt-gray-100'
      />
    </Link>
  );
};

export default CardVertical;
