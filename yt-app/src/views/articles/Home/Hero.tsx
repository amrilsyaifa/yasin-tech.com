'use client';

import ButtonPrimary from '@components/Button/ButtonPrimary';
import ScrollAnimationWrapper from '@views/home/layout/ScrollAnimationWrapper';
import getScrollAnimation from '@utils/getScrollAnimation';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import Image from 'next/image';
import Illustration from '@components/Icons/illustration_articles.svg';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('');
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <div className='flex flex-col bg-yt-gray-200'>
      <div className='mx-auto flex w-full max-w-screen-xl flex-col flex-wrap py-4'>
        <div className='mx-auto mt-24 max-w-screen-xl px-8 xl:px-16' id='about'>
          <ScrollAnimationWrapper>
            <motion.div
              className='grid grid-flow-row grid-rows-2 gap-8 py-6 sm:grid-flow-col sm:grid-cols-2 sm:py-16 md:grid-rows-1 md:py-0'
              variants={scrollAnimation}
            >
              <div className=' row-start-2 flex flex-col items-start justify-center sm:row-start-1'>
                <h1 className='text-3xl font-medium leading-normal text-yt-gray-600 lg:text-4xl xl:text-5xl'>
                  {t('Auth.pages.articles.hero.title')}
                </h1>
                <p className='mb-6 mt-4 text-yt-gray-600'>
                  {t('Auth.pages.articles.hero.description')}
                </p>
                <ButtonPrimary>
                  {t('Auth.pages.articles.hero.start_reading')}
                </ButtonPrimary>
              </div>
              <div className='flex w-full'>
                <motion.div
                  className='h-full w-full'
                  variants={scrollAnimation}
                >
                  <Image
                    src={Illustration}
                    alt='Yasin Tech Illustrasi'
                    quality={100}
                    width={612}
                    height={383}
                    layout='responsive'
                  />
                </motion.div>
              </div>
            </motion.div>
          </ScrollAnimationWrapper>
          <div className='relative flex w-full'>
            <div
              className='absolute left-0 right-0 top-0 mx-auto mt-8 h-64 w-11/12 rounded-lg bg-yt-gray-600 opacity-5 sm:h-48'
              style={{ filter: 'blur(114px)' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
