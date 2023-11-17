import Image from 'next/image';
import Link from '@components/Link';
import React, { FC } from 'react';
import { PostProps } from '@hooks/api/usePosts/interface';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
interface CardProps {
  data: PostProps;
}

const Card: FC<CardProps> = ({ data }) => {
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

  const src = data?.thumbnail ?? (process.env.NEXT_PUBLIC_BASE_URL as string);

  return (
    <Link
      href={`/articles/${data.slug}`}
      className='mb-4 flex w-72 flex-col items-start justify-start rounded-xl p-5 shadow'
    >
      <Image
        src={src}
        alt={data.slug}
        className='h-48 w-64 rounded-xl bg-yt-gray-100'
        height={192}
        width={256}
      />
      <div className='mt-6 flex w-full flex-row flex-wrap  items-center space-x-2 text-left text-sm font-semibold '>
        {data?.tags?.map((val) => (
          <p key={val._id} className='hover:text-yt-blue-600'>
            {val.name}
          </p>
        ))}
      </div>
      <div className='mt-6 w-full text-left text-lg font-semibold'>
        <p className='line-clamp-3'>{textTitle}</p>
      </div>
      <div className='mt-2 w-full text-left text-sm font-normal'>
        <p className='line-clamp-3'>{textDescription}</p>
      </div>
    </Link>
  );
};

export default Card;
