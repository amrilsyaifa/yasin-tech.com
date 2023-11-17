'use client';

import ButtonPrimary from '@components/Button/ButtonPrimary';
import ScrollAnimationWrapper from '@views/home/ScrollAnimationWrapper';
import getScrollAnimation from '@utils/getScrollAnimation';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Illustration from '@components/Icons/illustration-home.svg';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('');
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const handleClickScroll = () => {
    const feature = document.getElementById('feature');
    if (feature) {
      feature.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div
      className='mx-auto flex h-screen max-w-screen-xl flex-col items-center justify-center px-8 xl:px-16'
      id='hero'
    >
      <ScrollAnimationWrapper>
        <div className='grid grid-flow-row grid-rows-2 gap-8 py-6 sm:grid-flow-col sm:grid-cols-2 sm:py-16 md:grid-rows-1'>
          <div className=' row-start-2 flex flex-col items-start justify-center sm:row-start-1'>
            <h1 className='text-3xl font-medium leading-normal text-yt-gray-600 lg:text-4xl xl:text-5xl'>
              {t('Home.pages.home.hero.title')}
              <strong className='pl-2 text-yt-blue-600'>
                {t('LocaleLayout.title')}.
              </strong>
            </h1>
            <p className='mb-6 mt-4 text-yt-gray-600'>
              {t('Home.pages.home.hero.description')}
            </p>
            <ButtonPrimary onClick={handleClickScroll}>
              {t('Home.pages.home.hero.discover')}
            </ButtonPrimary>
          </div>
          <div className='flex w-full'>
            <motion.div className='h-full w-full' variants={scrollAnimation}>
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
        </div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Hero;
