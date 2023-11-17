import { useTranslations } from 'next-intl';
import Link from '@components/Link';
import { useRouter } from 'next/navigation';
import React from 'react';

const FormForgotPassword = () => {
  const t = useTranslations('Home');
  const router = useRouter();

  const onSubmit = (e: any) => {
    e.preventDefault();
    router.push('/auth/forgot-password/send-email-information');
  };
  return (
    <div className='mt-14 flex w-full flex-col justify-center overflow-y-auto'>
      <h2 className='text-3xl font-bold uppercase text-yt-gray-500'>
        {t('pages.forgot_password.forgot_password')}
      </h2>
      <div className='mt-2 flex flex-row items-center space-x-2 tracking-widest text-yt-gray-500'>
        <p>{t('pages.forgot_password.description')}</p>
      </div>
      <form className='w-f mt-6'>
        <div className='mb-6'>
          <label
            htmlFor='email'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('pages.forgot_password.label_email')}
          </label>
          <input
            type='email'
            id='email'
            className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
            placeholder='name@yasin-tech.com'
            required
          />
        </div>

        <button
          // type='submit'
          className='w-full rounded-lg bg-yt-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yt-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-yt-blue-600 dark:hover:bg-yt-blue-500 dark:focus:ring-blue-800 sm:w-full'
          onClick={onSubmit}
        >
          {t('pages.forgot_password.submit')}
        </button>
      </form>
      <div className='mt-2 flex flex-row items-center space-x-2 tracking-widest text-yt-gray-500'>
        <p>{t('pages.register.have_account')}</p>
        <Link
          className=' text-yt-blue-600 hover:text-yt-blue-500'
          href='/auth/signin'
        >
          {t('pages.register.sign_in')}
        </Link>
      </div>
    </div>
  );
};

export default FormForgotPassword;
