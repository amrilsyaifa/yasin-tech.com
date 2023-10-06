'use client';

import { useTranslations } from 'next-intl';
import Link from '@components/Link';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import useDisclosure from '@hooks/useDisclosure';
import { LoginSchemaType, LoginSchema } from '@validations/auth';
import camelcaseKeys from 'camelcase-keys';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@utils/axios/axios';
import { toast } from 'react-toastify';
import { useRouter, useParams } from 'next/navigation';
import Spinner from '@components/Spinner';
import SocialMedia from '../Register/SocialMedia';
import cookie from 'cookie-cutter';
import {
  identityToken,
  identityRefreshToken,
  tokenMaxAge,
  refreshTokenMaxAge,
} from '@constant/token';
import { ModeProd } from '@helpers/isProd';

const FormLogin = () => {
  const t = useTranslations('Home');

  const router = useRouter();
  const params = useParams();
  const seePasswod = useDisclosure();
  const loading = useDisclosure();

  const successToast = () =>
    toast(t('pages.login.toast.success'), { type: 'success' });
  const errorToast = () =>
    toast(t('pages.login.toast.error'), { type: 'error' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    loading.onOpen();
    axios
      .post('/auth/login', data)
      .then((res) => {
        if (res?.data?.status === 'success') {
          const token = res?.data?.data?.token ?? '';
          const refreshToken = res?.data?.data?.refresh_token ?? '';
          cookie.set(identityToken, token, {
            maxAge: tokenMaxAge,
            secure: ModeProd(),
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
          });
          cookie.set(identityRefreshToken, refreshToken, {
            maxAge: refreshTokenMaxAge,
            secure: ModeProd(),
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
          });
          successToast();
          loading.onClose();
          return router.push(`/${params?.locale}/dashboard`);
        }
      })
      .catch(() => {
        errorToast();
        return loading.onClose();
      });
  };

  const errorTransform = camelcaseKeys(errors);

  return (
    <div className='flex w-full flex-col justify-center'>
      <h2 className='text-3xl font-bold uppercase text-yt-gray-500'>
        {t('pages.login.welcome')}
      </h2>
      <div className='mt-2 flex flex-row items-center space-x-2 tracking-widest text-yt-gray-500'>
        <p>{t('pages.login.dont_have_account')}</p>
        <Link
          className=' text-yt-blue-600 hover:text-yt-blue-500'
          href='/auth/signup'
        >
          {t('pages.login.sign_up')}
        </Link>
      </div>
      <form className='w-f mt-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6'>
          <label
            htmlFor='email'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('pages.login.label_email')}
          </label>
          <input
            type='username'
            id='username'
            className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
            placeholder='name@yasin-tech.com'
            required
            {...register('username')}
          />
          {errorTransform.username && (
            <p className='mt-2 text-xs italic text-red-500'>
              {errorTransform.username?.message}
            </p>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='password'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('pages.login.label_password')}
          </label>
          <div className='relative '>
            <input
              type={seePasswod.isOpen ? 'text' : 'password'}
              id='password'
              className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
              required
              {...register('password')}
            />
            <span
              className='absolute inset-y-0 right-2 flex items-center pl-2'
              onClick={seePasswod.onToggle}
            >
              {seePasswod.isOpen ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          {errorTransform.password && (
            <p className='mt-2 text-xs italic text-red-500'>
              {errorTransform.password?.message}
            </p>
          )}
        </div>
        <div className='mb-6 flex flex-row items-start justify-between'>
          <div className='flex flex-row items-center'>
            <div className='flex h-5 items-center'>
              <input
                id='remember'
                type='checkbox'
                value=''
                className='focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-yt-blue-500 dark:focus:ring-offset-gray-800'
              />
            </div>
            <label
              htmlFor='remember'
              className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              {t('pages.login.remember_me')}
            </label>
          </div>
          <Link
            className=' text-yt-blue-600 hover:text-yt-blue-500'
            href='/auth/forgot-password'
          >
            {t('pages.login.forget_password')}
          </Link>
        </div>
        <button
          disabled={loading.isOpen}
          type='submit'
          className='flex w-full flex-row items-center justify-center rounded-lg bg-yt-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yt-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-yt-blue-600 dark:hover:bg-yt-blue-500 dark:focus:ring-blue-800 sm:w-full'
        >
          {loading.isOpen && <Spinner className='fill-white' />}
          {t('pages.login.submit')}
        </button>
      </form>
      <div className='mt-10'>
        <h2 className='m-[10px 0 20px] w-full border-b border-yt-blue-600 text-center leading-[0.1em]'>
          <span className='bg-white px-4 py-4'>
            {t('pages.login.continue_with')}
          </span>
        </h2>
      </div>
      <SocialMedia onStart={loading.onOpen} onEnd={loading.onClose} />
    </div>
  );
};

export default FormLogin;
