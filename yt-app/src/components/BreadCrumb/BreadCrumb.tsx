import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AiFillHome, AiOutlineRight } from 'react-icons/ai';
import { BreadcrumbSelectLang } from '@components/SelectLang';

const excludePathname = ['', 'en', 'id'];

const BreadCrumb = () => {
  const t = useTranslations('Dashboard');

  const pathname = usePathname();
  const pathArray = pathname
    ?.replace('-', '_')
    ?.split('/')
    .filter((val) => !excludePathname.includes(val)) as string[];

  return (
    <nav
      className='item-center flex flex-row justify-between rounded-lg px-5 py-3 text-gray-700'
      aria-label='Breadcrumb'
    >
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        {pathArray?.map((val, idx) => {
          const text = t(`common.${val}`).replace('Dashboard.common.', '');
          return (
            <li key={`${val}-${idx}`} className='inline-flex items-center'>
              <div className='inline-flex items-center text-sm font-medium capitalize text-yt-gray-500 hover:text-yt-gray-600 dark:text-yt-gray-500 dark:hover:text-yt-gray-600'>
                {idx === 0 && <AiFillHome className='mr-2 h-4 w-4' />}
                {idx > 0 && <AiOutlineRight className='mr-2 h-4 w-4' />}
                {text}
              </div>
            </li>
          );
        })}
      </ol>
      <BreadcrumbSelectLang />
    </nav>
  );
};

export default BreadCrumb;
