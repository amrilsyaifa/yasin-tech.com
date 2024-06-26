import { FC } from 'react';
import Hero from './Hero';
import Feature from './Feature';
import ShowCase from './ShowCase';
import Insight from './Insight';
import CallSupport from './CallSupport';
import { PostProps } from '@hooks/api/usePosts/interface';
import { Testimony } from '@hooks/api/useListTestimony/interface';
import { isEmpty } from 'lodash';
import RootHomeLayout from '@views/layouts/RootLayout';

interface HomeViewProps {
  posts: PostProps[];
  testimonies: Testimony[];
}

const HomeView: FC<HomeViewProps> = ({ posts, testimonies }) => {
  return (
    <RootHomeLayout>
      <Hero />
      <Feature />
      {!isEmpty(testimonies) && <ShowCase testimonies={testimonies} />}
      {!isEmpty(posts) && <Insight posts={posts} />}
      <CallSupport />
    </RootHomeLayout>
  );
};

export default HomeView;
