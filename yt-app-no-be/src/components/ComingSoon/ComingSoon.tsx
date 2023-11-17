import { useTranslations } from 'next-intl';

const ComingSoon = () => {
  const t = useTranslations('Components');
  return (
    <div className='h-[calc(100vh-7rem)] w-full '>
      <div className='h-[calc(100vh-7rem)] w-full flex-col items-center justify-center '>
        <div className='flex h-[calc(100vh-7rem)] flex-1 flex-col items-center justify-center'>
          <h1 className='text-center font-serif text-6xl font-bold tracking-wider text-yt-blue-500 lg:text-7xl xl:text-8xl'>
            {t('coming_soon.title')}
          </h1>
          <div className='mt-10 flex flex-col items-center space-y-4'>
            <p className='text-sm uppercase text-yt-gray-500'>
              {t('coming_soon.description')}
            </p>
            <form className='flex w-full items-center'>
              <input
                type='email'
                name='email'
                id='email'
                className='block w-full rounded-l-lg border-b border-l border-t border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
                placeholder='Email'
                autoComplete='off'
              />
              <button className='rounded-br rounded-tr border border-yt-blue-600 bg-yt-blue-600 px-6 py-2.5 text-sm text-gray-100 hover:bg-blue-700'>
                {t('coming_soon.subscribe')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
