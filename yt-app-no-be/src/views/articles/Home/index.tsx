import '@styles/slick.scss';
import RootArticlesLayout from '../../layouts/RootArticlesLayout';
import Hero from './Hero';
import ContentVertical from './ContentVertical';
import { FC } from 'react';
import { PostProps } from '@hooks/api/usePosts/interface';
// import Content from './Content';

interface ArticlesViewProps {
  data: PostProps[];
}

const ArticlesView: FC<ArticlesViewProps> = ({ data }) => {
  return (
    <RootArticlesLayout>
      <Hero />
      {/* <Content /> */}
      <ContentVertical data={data} />
    </RootArticlesLayout>
  );
};

export default ArticlesView;
