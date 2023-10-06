'use client';

import { useTranslations } from 'next-intl';
import Link from '@components/Link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, RegisterSchemaType } from '@validations/auth';
import camelcaseKeys from 'camelcase-keys';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from '@utils/axios/axios';
import Spinner from '@components/Spinner';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import useDisclosure from '@hooks/useDisclosure';
import SocialMedia from './SocialMedia';

const FormRegister = () => {
  const t = useTranslations('Home');

  const router = useRouter();
  const loading = useDisclosure();
  const seePasswod = useDisclosure();
  const seePasswodConfirm = useDisclosure();

  const successToast = () =>
    toast(t('pages.register.toast.success'), { type: 'success' });
  const errorToast = () =>
    toast(t('pages.register.toast.error'), { type: 'error' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const errorTransform = camelcaseKeys(errors);

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    loading.onOpen();
    axios
      .post('/auth/register', data)
      .then((res) => {
        if (res?.data?.status === 'success') {
          successToast();
          loading.onClose();
          return router.push('signin');
        }
      })
      .catch(() => {
        errorToast();
        return loading.onClose();
      });
  };

  return (
    <div className='mt-14 flex w-full flex-col justify-center overflow-y-auto'>
      <h2 className='text-3xl font-bold uppercase text-yt-gray-500'>
        {t('pages.register.create_account')}
      </h2>
      <div className='mt-2 flex flex-row items-center space-x-2 tracking-widest text-yt-gray-500'>
        <p>{t('pages.register.have_account')}</p>
        <Link
          className=' text-yt-blue-600 hover:text-yt-blue-500'
          href='/auth/signin'
        >
          {t('pages.register.sign_in')}
        </Link>
      </div>
      <form className='w-f mt-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6'>
          <label
            htmlFor='email'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('pages.register.label_email')}
          </label>
          <input
            type='email'
            id='email'
            className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
            placeholder='name@yasin-tech.com'
            required
            {...register('email')}
          />
          {errorTransform.email && (
            <p className='mt-2 text-xs italic text-red-500'>
              {errorTransform.email?.message}
            </p>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='username'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('pages.register.label_username')}
          </label>
          <input
            type='text'
            id='username'
            className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
            placeholder='ex: john_doe'
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
            htmlFor='first_name'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('pages.register.label_first_name')}
          </label>
          <input
            type='text'
            id='first_name'
            className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
            placeholder='ex: john'
            required
            {...register('first_name')}
          />
          {errorTransform.firstName && (
            <p className='mt-2 text-xs italic text-red-500'>
              {errorTransform.firstName?.message}
            </p>
          )}
        </div>

        <div className='mb-6'>
          <label
            htmlFor='last_name'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('pages.register.label_last_name')}
          </label>
          <input
            type='text'
            id='last_name'
            className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
            placeholder='ex: doe'
            {...register('last_name')}
          />
          {errorTransform.lastName && (
            <p className='mt-2 text-xs italic text-red-500'>
              {errorTransform.lastName?.message}
            </p>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='phone_number'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('pages.register.label_phone_number')}
          </label>
          <input
            type='text'
            id='phone_number'
            className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
            placeholder='ex: 12345678'
            required
            {...register('phone_number')}
          />
          {errorTransform.phoneNumber && (
            <p className='mt-2 text-xs italic text-red-500'>
              {errorTransform.phoneNumber?.message}
            </p>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='password'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('pages.register.label_password')}
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

        <div className='mb-6'>
          <label
            htmlFor='confirm_password'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('pages.register.label_confirm_password')}
          </label>
          <div className='relative '>
            <input
              type={seePasswodConfirm.isOpen ? 'text' : 'password'}
              id='passwordConfirm'
              className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
              required
              {...register('password_confirm')}
            />
            <span
              className='absolute inset-y-0 right-2 flex items-center pl-2'
              onClick={seePasswodConfirm.onToggle}
            >
              {seePasswodConfirm.isOpen ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </span>
          </div>
          {errorTransform.passwordConfirm && (
            <p className='mt-2 text-xs italic text-red-500'>
              {errorTransform.passwordConfirm?.message}
            </p>
          )}
        </div>

        <button
          type='submit'
          className='flex w-full flex-row items-center justify-center rounded-lg bg-yt-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yt-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-yt-blue-600 dark:hover:bg-yt-blue-500 dark:focus:ring-blue-800 sm:w-full'
        >
          {loading.isOpen && <Spinner className='fill-white' />}
          {t('pages.register.sign_up')}
        </button>
      </form>
      <div className='mt-10'>
        <h2 className='m-[10px 0 20px] w-full border-b border-yt-blue-600 text-center leading-[0.1em]'>
          <span className='bg-white px-4 py-4'>
            {t('pages.register.continue_with')}
          </span>
        </h2>
      </div>
      <SocialMedia onStart={loading.onOpen} onEnd={loading.onClose} />
    </div>
  );
};

export default FormRegister;
