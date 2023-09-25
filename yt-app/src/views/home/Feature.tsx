'use client';

import getScrollAnimation from '@utils/getScrollAnimation';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { ScrollAnimationWrapper } from './layout';
import Image from 'next/image';
import Illustration from '@components/Icons/illustration-home-2.svg';
import { useTranslations } from 'next-intl';
import { FiMonitor } from 'react-icons/fi';
import { BiMobile, BiCctv } from 'react-icons/bi';
import { CgIfDesign } from 'react-icons/cg';
import { BsHddNetwork } from 'react-icons/bs';
import { RiCustomerService2Fill } from 'react-icons/ri';

const Feature = () => {
  const t = useTranslations('Auth');
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const features = [
    {
      id: 1,
      text: t('pages.home.feature.list.1'),
      icon: (
        <div className='mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-yt-blue-600'>
          <FiMonitor className='text-white' />
        </div>
      ),
    },
    {
      id: 2,
      text: t('pages.home.feature.list.2'),
      icon: (
        <div className='mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-yt-blue-600'>
          <BiMobile className='text-white' />
        </div>
      ),
    },
    {
      id: 3,
      text: t('pages.home.feature.list.3'),
      icon: (
        <div className='mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-yt-blue-600'>
          <CgIfDesign className='text-white' />
        </div>
      ),
    },
    {
      id: 4,
      text: t('pages.home.feature.list.4'),
      icon: (
        <div className='mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-yt-blue-600'>
          <BiCctv className='text-white' />
        </div>
      ),
    },
    {
      id: 5,
      text: t('pages.home.feature.list.5'),
      icon: (
        <div className='mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-yt-blue-600'>
          <BsHddNetwork className='text-white' />
        </div>
      ),
    },
    {
      id: 6,
      text: t('pages.home.feature.list.6'),
      icon: (
        <div className='mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-yt-blue-600'>
          <RiCustomerService2Fill className='text-white' />
        </div>
      ),
    },
  ];
  return (
    <div id='feature' className='w-full bg-gray-100'>
      <div className='mx-auto mb-6 mt-8 max-w-screen-xl  px-6 sm:mb-14 sm:mt-14 sm:px-8 lg:px-16'>
        <div className='p y-8 my-12 grid grid-flow-row grid-cols-1 gap-8  sm:grid-flow-col sm:grid-cols-2'>
          <ScrollAnimationWrapper className='flex w-full justify-end'>
            <motion.div
              className='h-full w-full p-4'
              variants={scrollAnimation}
            >
              <Image
                src={Illustration}
                alt='Yasin Tech Illustrasi'
                layout='responsive'
                quality={100}
                height={414}
                width={508}
              />
            </motion.div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <div className='ml-auto flex w-full flex-col items-end justify-center lg:w-9/12'>
              <h3 className='text-3xl font-medium leading-relaxed text-yt-gray-600 lg:text-4xl'>
                {t('pages.home.feature.title')}
              </h3>
              <p className='my-2 text-yt-gray-500'>
                {t('pages.home.feature.description')}
              </p>
              <ul className='list-inside space-y-4 self-start text-yt-gray-500'>
                {features.map((feature, index) => (
                  <motion.li
                    className='circle-check custom-list relative'
                    custom={{ duration: 2 + index }}
                    variants={scrollAnimation}
                    key={feature.id}
                    whileHover={{
                      scale: 1.1,
                      transition: {
                        duration: 0.2,
                      },
                    }}
                  >
                    <div className='flex flex-row items-center '>
                      {feature.icon}
                      <p>{feature.text}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </div>
  );
};

export default Feature;
