'use client';

import { motion } from 'framer-motion';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import { FC, useMemo } from 'react';
import getScrollAnimation from '@utils/getScrollAnimation';

import TestimonyComponent from './Testimony';
import { useTranslations } from 'next-intl';
import { Testimony } from '@hooks/api/useListTestimony/interface';

interface ShowCaseProps {
  testimonies: Testimony[];
}

const ShowCase: FC<ShowCaseProps> = ({ testimonies }) => {
  const t = useTranslations('Home');
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <div
      className='from-white-300 to-white-500 w-full bg-yt-blue-600 bg-gradient-to-b py-14'
      id='show-case'
    >
      <div className='mx-auto  flex w-full max-w-screen-xl flex-col justify-center px-6 text-center sm:px-8 lg:px-16'>
        <div className='my-16 flex w-full flex-col' id='testimoni'>
          <ScrollAnimationWrapper>
            <motion.p
              variants={scrollAnimation}
              className='mx-auto mb-2 mt-4 w-10/12 text-lg leading-normal text-white sm:w-7/12 lg:w-6/12'
            >
              {t('pages.home.show_case.title')}
            </motion.p>
            <motion.h3
              variants={scrollAnimation}
              className='text-black-600 sm: mx-auto w-9/12 text-2xl font-medium leading-normal text-white sm:text-3xl lg:w-4/12 lg:text-4xl'
            >
              {t('pages.home.show_case.description')}
            </motion.h3>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className='flex w-full flex-col py-12'>
            <motion.div variants={scrollAnimation}>
              {testimonies && <TestimonyComponent testimonies={testimonies} />}
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
