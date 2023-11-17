'use client';

import axios from '@utils/axios';
import { useTranslations } from 'next-intl';
import { createRef, ChangeEvent, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { AiOutlineEdit, AiOutlineUser } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTestimonyType, TestimonySchema } from '@validations/testimony';
import camelcaseKeys from 'camelcase-keys';
import Image from 'next/image';
import { isEmpty } from 'lodash';
import { useParams, useRouter } from 'next/navigation';
import { Payload } from './interface';
import useDisclosure from '@hooks/useDisclosure';
import getTestimony from '@hooks/api/useTestimony';

const FormTestimony = () => {
  const t = useTranslations();

  const errorToast = () =>
    toast(t('Components.rich_editor.error_upload_image'), { type: 'error' });

  const successCreateToast = () =>
    toast(t('Dashboard.testimony.create.toast.success'), { type: 'success' });
  const errorCreateToast = () =>
    toast(t('Dashboard.testimony.create.toast.error'), { type: 'error' });

  const successUpdateToast = () =>
    toast(t('Dashboard.testimony.edit.toast.success'), { type: 'success' });
  const errorUpdateToast = () =>
    toast(t('Dashboard.testimony.edit.toast.error'), { type: 'error' });

  const router = useRouter();
  const params = useParams();
  const loading = useDisclosure();

  const fileRef = createRef<HTMLInputElement>();

  const {
    watch,
    setValue,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTestimonyType>({
    resolver: zodResolver(TestimonySchema),
  });

  const errorTransform = camelcaseKeys(errors);
  const id = params?.id as string;

  const hasEdit = !isEmpty(id);

  const { testimony } = getTestimony({ id, isFetch: hasEdit });

  useEffect(() => {
    if (hasEdit && !isEmpty(testimony)) {
      setValue('image', testimony?.image);
      setValue('name', testimony?.name);
      setValue('company', testimony?.company);
      setValue('job_title', testimony?.jobTitle);
      setValue('desc_EN', testimony?.descEn);
      setValue('desc_ID', testimony?.descId);
      setValue('rating', testimony?.rating);
    }
  }, [testimony]);

  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      const data = new FormData();
      data.append('media', e?.target?.files[0]);
      axios
        .post('/upload/image', data, {
          params: {
            isFormData: true,
          },
        })
        .then((res) => {
          if (res.data.status === 'success') {
            setValue('image', res.data.data.url);
          }
        })
        .catch(() => {
          return errorToast();
        });
    }
  };

  const onCreate = (payload: Payload) => {
    axios
      .post('/testimony', payload)
      .then((res) => {
        if (res?.data?.status === 'success') {
          successCreateToast();
          loading.onClose();
          return router.push(`/${params?.locale}/dashboard/testimony`);
        }
      })
      .catch(() => {
        errorCreateToast();
        return loading.onClose();
      });
  };

  const onEdit = (payload: Payload) => {
    axios
      .put(`/testimony/${id}`, payload)
      .then((res) => {
        if (res?.data?.status === 'success') {
          successUpdateToast();
          loading.onClose();
          return router.push(`/${params?.locale}/dashboard/testimony`);
        }
      })
      .catch(() => {
        errorUpdateToast();
        return loading.onClose();
      });
  };

  const onSubmit: SubmitHandler<CreateTestimonyType> = async (data, e) => {
    const val: any = e;
    const status: string = val?.nativeEvent.submitter.id
      ? val?.nativeEvent.submitter.id
      : 'draft';

    const payload = {
      name: data.name,
      company: data.company,
      job_title: data.job_title,
      desc_ID: data.desc_ID,
      desc_EN: data.desc_EN,
      rating: data.rating,
      image: data.image,
      status: status.replace('-btn', ''),
    };
    if (hasEdit) {
      onEdit(payload);
    }

    if (!hasEdit) {
      onCreate(payload);
    }
  };

  const rating = watch('rating');

  return (
    <div className='w-full max-w-xl'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-center justify-center'>
          <Controller
            control={control}
            name='image'
            render={({ field: { value } }) => (
              <>
                <input
                  ref={fileRef}
                  id='select-image-primary'
                  hidden
                  type='file'
                  onChange={fileChange}
                  accept='image/png, image/gif, image/jpeg'
                />
                {!value && (
                  <div
                    onClick={() => fileRef?.current?.click()}
                    className='relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border'
                  >
                    <AiOutlineUser className='text-6xl' />
                  </div>
                )}
                {value && (
                  <div className='group relative'>
                    <Image
                      src={value}
                      alt='Profile'
                      className='flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border'
                      width={128}
                      height={128}
                    />
                    <div
                      onClick={() => fileRef?.current?.click()}
                      className='absolute bottom-0 right-0 hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full border group-hover:flex'
                    >
                      <AiOutlineEdit className='h-4 w-4' />
                    </div>
                  </div>
                )}
              </>
            )}
          />
          {errorTransform.image && (
            <p className='mt-2 text-xs italic text-red-500'>
              {errorTransform.image?.message}
            </p>
          )}
        </div>
        <div className='mb-2'>
          <label
            htmlFor='name'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('Dashboard.testimony.create.form.full_name')}
          </label>
          <input
            type='text'
            id='name'
            className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
            placeholder='ex: John Doe'
            required
            {...register('name')}
          />
          {errorTransform.name && (
            <p className='mt-2 text-xs italic text-red-500'>
              {errorTransform.name?.message}
            </p>
          )}
        </div>
        <div className='mb-2'>
          <label
            htmlFor='company'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('Dashboard.testimony.create.form.company')}
          </label>
          <input
            type='text'
            id='company'
            className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
            placeholder='ex: Yasin Tech'
            required
            {...register('company')}
          />
          {errorTransform.company && (
            <p className='mt-2 text-xs italic text-red-500'>
              {errorTransform.company?.message}
            </p>
          )}
        </div>
        <div className='mb-2'>
          <label
            htmlFor='job_title'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('Dashboard.testimony.create.form.job_title')}
          </label>
          <input
            type='text'
            id='job_title'
            className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
            placeholder='ex: Manager'
            required
            {...register('job_title')}
          />
          {errorTransform.jobTitle && (
            <p className='mt-2 text-xs italic text-red-500'>
              {errorTransform.jobTitle?.message}
            </p>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='desc_ID'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('Dashboard.testimony.create.form.desc_id')}
          </label>
          <textarea
            id='desc_ID'
            rows={4}
            className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
            placeholder={t('Dashboard.testimony.create.form.placeholder_desc')}
            {...register('desc_ID')}
          />
          {errorTransform.descID && (
            <p className='mt-2 text-xs italic text-red-500'>
              {errorTransform.descID?.message}
            </p>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='desc_EN'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('Dashboard.testimony.create.form.desc_en')}
          </label>
          <textarea
            id='desc_EN'
            rows={4}
            className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
            placeholder={t('Dashboard.testimony.create.form.placeholder_desc')}
            {...register('desc_EN')}
          />
          {errorTransform.descEN && (
            <p className='mt-2 text-xs italic text-red-500'>
              {errorTransform.descEN?.message}
            </p>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='rating'
            className='mb-2 block text-sm font-medium text-yt-gray-500 dark:text-yt-gray-500'
          >
            {t('Dashboard.testimony.create.form.rating')}
          </label>
          <p className='text-yt-gray-600'>{rating}</p>
          <input
            id='rating'
            type='range'
            min={0}
            max={5}
            step={0.1}
            defaultValue={4.9}
            className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700'
            {...register('rating')}
          />

          {errorTransform.rating && (
            <p className='mt-2 text-xs italic text-red-500'>
              {errorTransform.rating?.message}
            </p>
          )}
        </div>
        {loading.isOpen && (
          <div className='mb-2 flex w-full flex-row justify-center'>
            <p>Loading...</p>
          </div>
        )}
        <div className='flex w-full flex-row justify-end space-x-6'>
          <button
            id='draft-btn'
            className='flex w-full flex-row items-center justify-center rounded-lg bg-yt-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yt-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-yt-blue-600 dark:hover:bg-yt-blue-500 dark:focus:ring-blue-800 sm:w-full'
            disabled={loading.isOpen}
          >
            {t('Dashboard.testimony.create.form.save')}
          </button>
          <button
            id='publish-btn'
            className='flex w-full flex-row items-center justify-center rounded-lg bg-yt-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yt-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-yt-blue-600 dark:hover:bg-yt-blue-500 dark:focus:ring-blue-800 sm:w-full'
            disabled={loading.isOpen}
          >
            {t('Dashboard.testimony.create.form.publish')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTestimony;
