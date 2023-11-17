'use client';

import { TipTap } from '@components/RichEditor';
import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { AiOutlineSave, AiOutlineEye } from 'react-icons/ai';
import { BsDatabaseCheck } from 'react-icons/bs';
import Tippy from '@tippyjs/react';
import { useTranslations } from 'next-intl';
import Select from 'react-select';
import getAllTags from '@hooks/api/useTags';
import getPost from '@hooks/api/usePost';
import { CreateFormProps, Payload } from './interface';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { PostSchema, PostSchemaType } from '@validations/post';
import { zodResolver } from '@hookform/resolvers/zod';
import camelcaseKeys from 'camelcase-keys';
import axios from '@utils/axios';
import { toast } from 'react-toastify';
import useDisclosure from '@hooks/useDisclosure';
import { useRouter, useParams } from 'next/navigation';
import slug from 'slug';
import { isEmpty } from 'lodash';
import { Tags } from '@hooks/api/usePosts/interface';

const CreateForm: FC<CreateFormProps> = ({ title: titleProps }) => {
  const t = useTranslations('Dashboard');

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const successCreateToast = () =>
    toast(t('content.create.toast.success'), { type: 'success' });
  const errorCreateToast = () =>
    toast(t('content.create.toast.error'), { type: 'error' });

  const successUpdateToast = () =>
    toast(t('content.edit.toast.success'), { type: 'success' });
  const errorUpdateToast = () =>
    toast(t('content.edit.toast.error'), { type: 'error' });

  const router = useRouter();
  const params = useParams();
  const loading = useDisclosure();
  const id = params?.id as string;

  const hasEdit = !isEmpty(id);

  const { tags } = getAllTags({
    status: 'publish',
  });
  const { post } = getPost({ id, isFetch: hasEdit });

  const {
    setValue,
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });

  const mappingTags = (tags: Tags[], id: string) => {
    const tagsIds = tags.map((val) => val._id);
    return tagsIds.includes(id);
  };

  const options = tags?.map((val) => {
    return { ...val, value: val.id, label: val.name };
  });

  useEffect(() => {
    if (hasEdit && !isEmpty(post)) {
      setValue('title', post?.title);
      setValue('description', post?.description);
      setValue('slug', post?.slug);

      const value = options.filter((val) => mappingTags(post.tags, val.id));
      setValue('tags', value);
      // State Default
      setTitle(post?.title);
      setDesc(post?.description);
    }
  }, [post]);

  const onUploadImageUrl = (e: string, isPrimary?: boolean) => {
    const imageLinks = getValues('imageLinks') || [];
    setValue('imageLinks', [...imageLinks, e]);
    if (isPrimary) {
      setValue('thumbnail', e);
    }
  };

  const onCreate = (payload: Payload) => {
    axios
      .post('/post', payload)
      .then((res) => {
        if (res?.data?.status === 'success') {
          successCreateToast();
          loading.onClose();
          return router.push(`/${params?.locale}/dashboard/content`);
        }
      })
      .catch(() => {
        errorCreateToast();
        return loading.onClose();
      });
  };

  const onEdit = (payload: Payload) => {
    axios
      .put(`/post/${id}`, payload)
      .then((res) => {
        if (res?.data?.status === 'success') {
          successUpdateToast();
          loading.onClose();
          return router.push(`/${params?.locale}/dashboard/content`);
        }
      })
      .catch(() => {
        errorUpdateToast();
        return loading.onClose();
      });
  };

  const onSubmit: SubmitHandler<PostSchemaType> = async (data, e) => {
    const val: any = e;
    const status: string = val?.nativeEvent.submitter.id
      ? val?.nativeEvent.submitter.id
      : 'draft';
    const slugGetValue = getValues('slug') || '';
    const slugText = slug(slugGetValue);
    const payload = {
      title: data.title,
      description: data.description,
      tag_ids: data.tags.map((val) => val.value),
      status: status.replace('-btn', ''),
      temp_images: data.imageLinks,
      thumbnail: data.thumbnail,
      slug: slugText,
    };
    if (hasEdit) {
      onEdit(payload);
    }

    if (!hasEdit) {
      onCreate(payload);
    }
  };

  const onPreview = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const errorTransform = camelcaseKeys(errors);
  return (
    <div className='w-full '>
      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center justify-between'>
          <h4 className='mb-4 text-xl font-semibold'>{titleProps}</h4>
          <div className='flex flex-row items-center space-x-2'>
            <Tippy content={t('content.create.form.preview')}>
              <button
                onClick={onPreview}
                className='mb-2 flex flex-row items-center space-x-2 rounded-lg bg-yt-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-yt-blue-500 focus:outline-none focus:ring-4 focus:ring-yt-blue-300 dark:bg-yt-blue-600 dark:hover:bg-yt-blue-600 dark:focus:ring-yt-blue-600'
              >
                <AiOutlineEye className='text-xl text-white' />
              </button>
            </Tippy>
            <Tippy content={t('content.create.form.save')}>
              <button
                id='draft-btn'
                type='submit'
                className='mb-2 flex flex-row items-center space-x-2 rounded-lg bg-yt-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-yt-blue-500 focus:outline-none focus:ring-4 focus:ring-yt-blue-300 dark:bg-yt-blue-600 dark:hover:bg-yt-blue-600 dark:focus:ring-yt-blue-600'
              >
                <AiOutlineSave className='text-xl text-white' />
              </button>
            </Tippy>
            <Tippy content={t('content.create.form.publish')}>
              <button
                id='publish-btn'
                type='submit'
                className='mb-2 flex flex-row items-center space-x-2 rounded-lg bg-yt-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-yt-blue-500 focus:outline-none focus:ring-4 focus:ring-yt-blue-300 dark:bg-yt-blue-600 dark:hover:bg-yt-blue-600 dark:focus:ring-yt-blue-600'
              >
                <BsDatabaseCheck className='text-xl text-white' />
              </button>
            </Tippy>
          </div>
        </div>
        <Controller
          control={control}
          name='tags'
          render={({ field: { onChange, value } }) => (
            <Select
              isMulti
              name='colors'
              options={options}
              className='basic-multi-select'
              classNamePrefix='select'
              placeholder='Select Tag'
              value={value}
              onChange={onChange}
            />
          )}
        />
        {errorTransform.tags && (
          <p className='mt-2 text-xs italic text-red-500'>
            {errorTransform.tags?.message}
          </p>
        )}
        <Controller
          control={control}
          name='title'
          render={({ field: { onChange } }) => (
            <TipTap
              defaultValue={title}
              placeholder={t('content.create.form.title')}
              onChange={(e, text) => {
                onChange(e);
                setValue('slug', text);
              }}
            />
          )}
        />
        {errorTransform.title && (
          <p className='mt-2 text-xs italic text-red-500'>
            {errorTransform.title?.message}
          </p>
        )}
        <Controller
          control={control}
          name='description'
          render={({ field: { onChange } }) => (
            <TipTap
              defaultValue={desc}
              placeholder={t('content.create.form.description')}
              withFloatingMenu
              withBubleMenu
              onChange={(e) => onChange(e)}
              onUploadImageUrl={onUploadImageUrl}
            />
          )}
        />

        {errorTransform.description && (
          <p className='mt-2 text-xs italic text-red-500'>
            {errorTransform.description?.message}
          </p>
        )}
        {errorTransform.imageLinks && !errorTransform.description && (
          <p className='mt-2 text-xs italic text-red-500'>
            {errorTransform.imageLinks?.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateForm;
