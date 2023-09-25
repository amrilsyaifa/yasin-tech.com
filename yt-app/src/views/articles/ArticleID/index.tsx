import { PostProps } from '@hooks/api/usePosts/interface';
import RootArticlesIDLayout from '../layout/RootArticlesIDLayout';
import AnotherArticle from './AnotherArticle';
import { FC } from 'react';
import RenderTiptap from './RenderTiptap';

interface ArticlesIDViewProps {
  data: PostProps;
}

const ArticlesIDView: FC<ArticlesIDViewProps> = ({ data }) => {
  return (
    <RootArticlesIDLayout>
      <div className='mt-12 flex flex-col'>
        <div className='mx-auto flex w-full max-w-screen-lg flex-col flex-wrap py-4'>
          <h3 className='text-3xl font-bold text-yt-gray-600'>
            <RenderTiptap content={data.title} />
          </h3>
          <div className='mt-12'>
            <RenderTiptap content={data.description} />
          </div>
        </div>
        <AnotherArticle />
      </div>
    </RootArticlesIDLayout>
  );
};

export default ArticlesIDView;
