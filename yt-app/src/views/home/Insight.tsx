'use client';

import { motion } from 'framer-motion';
import { ScrollAnimationWrapper } from './layout';
import { FC, useMemo } from 'react';
import getScrollAnimation from '@utils/getScrollAnimation';

import { useTranslations } from 'next-intl';
import Card from './Card';
import Link from '@components/Link';
import { PostProps } from '@hooks/api/usePosts/interface';

interface InsightProps {
  posts: PostProps[];
}

const Insight: FC<InsightProps> = ({ posts }) => {
  const t = useTranslations('Auth');
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className='from-white-300 to-white-500 w-full bg-gradient-to-b py-14'
      id='pricing'
    >
      <div className='mx-auto  flex w-full max-w-screen-xl flex-col justify-center px-6 text-center sm:px-8 lg:px-16'>
        <div className='my-16 flex w-full flex-col' id='testimoni'>
          <ScrollAnimationWrapper>
            <motion.p
              variants={scrollAnimation}
              className='mx-auto mb-2 mt-4 w-10/12 text-lg leading-normal sm:w-7/12 lg:w-6/12'
            >
              {t('pages.home.insight.title')}
            </motion.p>
            <motion.h3
              variants={scrollAnimation}
              className='text-black-600 sm: mx-auto w-9/12 text-2xl font-medium leading-normal sm:text-3xl lg:w-4/12 lg:text-4xl'
            >
              {t('pages.home.insight.description')}
            </motion.h3>
          </ScrollAnimationWrapper>
          <div className='flex w-full flex-col py-12'>
            <div>
              <div className='flex w-full flex-col'>
                <div className='mx-auto grid grid-flow-row grid-cols-1 gap-4 pb-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                  {posts?.map((val) => <Card key={val.id} data={val} />)}
                </div>
                <div className='flex flex-row items-center justify-end'>
                  <Link
                    href='/articles'
                    className='font-semi-bold flex flex-row items-center space-x-1 text-lg text-yt-gray-600'
                  >
                    Readmore...
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insight;
