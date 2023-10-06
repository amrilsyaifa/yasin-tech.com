'use client';

import { RootLayout } from '@views/layouts';
import React from 'react';
import Card from './Card';
import { FiMonitor } from 'react-icons/fi';
import { BiMobile, BiCctv } from 'react-icons/bi';
import { CgIfDesign } from 'react-icons/cg';
import { BsHddNetwork } from 'react-icons/bs';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { useTranslations } from 'next-intl';

const ServiceView = () => {
  const t = useTranslations('Home');
  const ourSkillInclude = t('pages.service.our_skill_include');
  const lists = [
    {
      id: 1,
      title: t('pages.service.list.title.1'),
      description: t('pages.service.list.description.1'),
      icon: (
        <div className='mr-2 flex h-32 w-32 items-center justify-center rounded-full bg-yt-blue-600'>
          <FiMonitor className='text-6xl text-white' />
        </div>
      ),
      skillInclude: [
        t('pages.service.list.skill_include.react'),
        t('pages.service.list.skill_include.golang'),
        t('pages.service.list.skill_include.nodejs'),
      ],
    },
    {
      id: 2,
      title: t('pages.service.list.title.2'),
      description: t('pages.service.list.description.2'),
      icon: (
        <div className='mr-2 flex h-32 w-32 items-center justify-center rounded-full bg-yt-blue-600'>
          <BiMobile className='text-6xl text-white' />
        </div>
      ),
      skillInclude: [
        t('pages.service.list.skill_include.react_native'),
        t('pages.service.list.skill_include.golang'),
        t('pages.service.list.skill_include.nodejs'),
      ],
    },
    {
      id: 3,
      title: t('pages.service.list.title.3'),
      description: t('pages.service.list.description.3'),
      icon: (
        <div className='mr-2 flex h-32 w-32 items-center justify-center rounded-full bg-yt-blue-600'>
          <CgIfDesign className='text-6xl text-white' />
        </div>
      ),
      skillInclude: [
        t('pages.service.list.skill_include.product_design'),
        t('pages.service.list.skill_include.golang'),
      ],
    },
    {
      id: 4,
      title: t('pages.service.list.title.4'),
      description: t('pages.service.list.description.4'),
      icon: (
        <div className='mr-2 flex h-32 w-32 items-center justify-center rounded-full bg-yt-blue-600'>
          <BiCctv className='text-6xl text-white' />
        </div>
      ),
      skillInclude: [
        t('pages.service.list.skill_include.cctv'),
        t('pages.service.list.skill_include.hk'),
        t('pages.service.list.skill_include.dahua'),
      ],
    },
    {
      id: 5,
      title: t('pages.service.list.title.5'),
      description: t('pages.service.list.description.5'),
      icon: (
        <div className='mr-2 flex h-32 w-32 items-center justify-center rounded-full bg-yt-blue-600'>
          <BsHddNetwork className='text-6xl text-white' />
        </div>
      ),
      skillInclude: [
        t('pages.service.list.skill_include.cisco'),
        t('pages.service.list.skill_include.mikrotik'),
        t('pages.service.list.skill_include.tp_link'),
      ],
    },
    {
      id: 6,
      title: t('pages.service.list.title.6'),
      description: t('pages.service.list.description.6'),
      icon: (
        <div className='mr-2 flex h-32 w-32 items-center justify-center rounded-full bg-yt-blue-600'>
          <RiCustomerService2Fill className='text-6xl text-white' />
        </div>
      ),
      skillInclude: [t('pages.service.list.skill_include.service')],
    },
  ];

  return (
    <RootLayout>
      <div className='flex w-full flex-col items-center'>
        <div className='mt-24 flex max-w-screen-xl flex-col items-center'>
          <h3 className='text-center text-4xl font-bold text-yt-gray-600'>
            {t('pages.service.title')}
          </h3>
          <p className='mt-12 text-yt-gray-600'>
            {t('pages.service.description')}
          </p>
          <div className='mt-32 flex flex-col space-y-4'>
            {lists?.map((val) => (
              <Card
                key={val.id}
                title={val.title}
                description={val.description}
                skillInclude={val.skillInclude}
                icon={val.icon}
                textOurSkll={ourSkillInclude}
              />
            ))}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ServiceView;
