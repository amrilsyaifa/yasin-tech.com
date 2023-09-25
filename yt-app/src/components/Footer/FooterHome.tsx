'use client';

import Image from 'next/image';
import LogoYT from '@components/Icons/yt-icon-text.svg';
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
} from 'react-icons/ai';
import { useTranslations } from 'next-intl';
import Wave from 'react-wavify';
import { FooterSelectLang } from '../SelectLang';
import Link from '@components/Link';

const FooterHome = () => {
  const t = useTranslations('');
  const office = process.env.NEXT_PUBLIC_YASIN_TECH_MAPS;
  return (
    <div className='relative h-[750px] md:mt-44 md:h-96 '>
      <div>
        <Wave
          fill='#0081cc'
          paused={false}
          style={{ display: 'flex', height: 240 }}
          options={{
            height: 0,
            amplitude: 40,
            speed: 0.15,
            points: 3,
          }}
        />
        <div className='h-[550px] w-full bg-yt-blue-600 md:h-52' />
      </div>
      <div className='absolute bottom-0 left-0 w-full '>
        <div className='mx-auto grid w-full max-w-screen-xl grid-flow-row grid-cols-3 gap-4 px-6 sm:grid-flow-col sm:grid-cols-12 sm:grid-rows-1 sm:px-8 lg:px-16'>
          <div className='col-start-1 col-end-4 row-span-2 flex w-full flex-col items-start sm:col-start-1 sm:col-end-13 md:col-start-1 md:col-end-5'>
            <Link href='/'>
              <Image
                className='mb-6 h-8 w-auto'
                src={LogoYT}
                alt='logo-yasin-tech'
              />
            </Link>
            <p className='mb-4 text-white'>
              <strong className='pr-1 font-semibold text-white'>
                {t('LocaleLayout.title')}
              </strong>
              {t('LocaleLayout.meaning')}
            </p>
            <div className='-mx-2 mb-8 mt-2 flex w-full'>
              <div className='mx-2 flex items-center justify-center rounded-full bg-white p-2 shadow-md'>
                <AiFillFacebook className='text-blue-500' />
              </div>
              <div className='mx-2 flex items-center justify-center rounded-full bg-white p-2 shadow-md'>
                <AiFillTwitterSquare className='text-blue-400' />
              </div>
              <div className='mx-2 flex items-center justify-center rounded-full bg-white p-2 shadow-md'>
                <AiFillInstagram className='text-red-500' />
              </div>
            </div>
          </div>

          <div className='col-start-1 col-end-4 row-span-2 mt-4 flex flex-col sm:col-span-2 sm:col-start-1 sm:col-end-6 md:col-start-6 md:col-end-8 md:mt-0'>
            <p className='text-lg font-medium text-white md:mb-4'>Office</p>
            <a
              target='_blank'
              href={office}
              className='cursor-pointer text-white hover:text-yt-gray-300'
            >
              <p className='mt-2 transition-all'>{t('LocaleLayout.company')}</p>
              <p className='cursor-pointer text-sm transition-all'>
                {t('LocaleLayout.address')}
              </p>
            </a>
          </div>
          <div className='col-start-1 col-end-4 row-span-2 mt-4 flex flex-col sm:col-span-2 sm:col-start-7 sm:col-end-13 md:col-start-9 md:col-end-13 md:mt-0 '>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15928.179655263206!2d98.5884993!3d3.5771512!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312f1f1acba163%3A0x808213a4cce4c8eb!2sYASIN%20TECH%20%7C%20Web%20Developer%20%7C%20CCTV%20%7C%20IT%20Solution!5e0!3m2!1sid!2sid!4v1692266298456!5m2!1sid!2sid'
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              // className='h-44 w-44'
              width='100%'
              height='100%'
            />
          </div>
        </div>
        <div className='mx-auto mt-6 flex w-full max-w-screen-xl flex-col-reverse items-center justify-between sm:px-8 md:mt-12 md:flex-row lg:px-16'>
          <p className='text-white'>
            ©{new Date().getFullYear()} - {t('LocaleLayout.title')}
          </p>
          <div className='flex flex-row flex-wrap items-center justify-center space-x-3'>
            <Link href='/privacy-and-policy'>
              <p className='text-sm text-white'>Privacy and policy</p>
            </Link>
            <Link href='/term-and-condition'>
              <p className='text-sm text-white'>Term and condition</p>
            </Link>
            <FooterSelectLang />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterHome;
