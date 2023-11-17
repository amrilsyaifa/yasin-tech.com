import Image from 'next/image';
import Link from '@components/Link';
import React, { FC, useState, MouseEvent } from 'react';
import { PostProps } from '@hooks/api/usePosts/interface';
import { isEmpty } from 'lodash';
import {
  AiOutlineUser,
  AiFillEdit,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { format, formatDistance } from 'date-fns';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from '@utils/axios';

interface CardProps {
  data: PostProps;
}

const Card: FC<CardProps> = ({ data }) => {
  const [forShow, setForShow] = useState<boolean>(data.forShow);

  const src = data?.thumbnail ?? (process.env.NEXT_PUBLIC_BASE_URL as string);
  const hasImageUrl = !isEmpty(data.author.profile.image);

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

  const onUpdateForShow = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const payload = {
      for_show: !data.forShow,
    };
    axios
      .put(`/post/for-show/${data.id}`, payload)
      .then((res) => {
        if (res?.data?.status === 'success') {
          setForShow(!data.forShow);
        }
      })
      .catch(() => {
        setForShow(data.forShow);
      });
  };

  return (
    <Link
      href={`/articles/${data.slug}`}
      className='group mb-4 flex w-full max-w-[300px] flex-col items-start justify-between rounded-xl p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
    >
      <div className='relative w-full'>
        <Link
          href={`/dashboard/content/${data.slug}/edit`}
          className='absolute right-2 top-2 hidden h-6 w-6 items-center justify-center rounded-full bg-yt-gray-200 group-hover:flex'
        >
          <AiFillEdit />
        </Link>
        <button
          onClick={onUpdateForShow}
          className='absolute bottom-2 right-2 hidden h-6 w-6 items-center justify-center rounded-full bg-yt-gray-200 group-hover:flex'
        >
          {forShow && <AiFillStar />}
          {!forShow && <AiOutlineStar />}
        </button>
        <Image
          src={src}
          alt={data.slug}
          className='h-48 w-64 rounded-xl bg-yt-gray-100'
          height={192}
          width={256}
        />
        <div className='mt-6 w-full text-lg font-semibold'>
          <p className='line-clamp-3'>{textTitle}</p>
          <p className='line-clamp-4 text-sm font-normal text-gray-600'>
            {textDescription}
          </p>
        </div>
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

        <div className='w-[calc(100%-62px)]] flex flex-col'>
          <p className='text-base font-semibold text-yt-gray-600'>
            {data.author.profile.first_name} {data.author.profile.last_name}
          </p>
          <div className='flex w-full flex-col items-start justify-between'>
            <p className='text-sm font-normal text-yt-gray-600'>
              {format(new Date(data.createdAt), 'MMMM dd yyyy')}
            </p>
            <p className='text-sm font-normal text-yt-gray-600'>
              {formatDistance(new Date(data.createdAt), new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
