import { memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useOnClickOutside } from 'usehooks-ts';
import { useParams, useRouter, usePathname } from 'next/navigation';

const listDropdown = [
  { title: '🇮🇩 Indonesia', key: 'id' },
  { title: '🇺🇸 English', key: 'en' },
];

interface SelectedProps {
  title: string;
  key: string;
}

const FooterSelectLang = () => {
  const [selected, setSelected] = useState<SelectedProps>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const locale = params?.locale;
    const list = listDropdown.find((val) => val.key === locale);
    setSelected(list);
  }, []);

  useOnClickOutside(ref, () => setIsOpen(false));

  const onSelectLang = (v: SelectedProps) => {
    const list = listDropdown.find((val) => val.key === v.key);
    setSelected(list);
    setIsOpen(false);
    let url = '';
    if (list?.key === 'id') {
      url = pathname?.replace('/en', '/id') as string;
    } else {
      url = pathname?.replace('/id', '/en') as string;
    }
    router.replace(url, { scroll: false });
  };

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        id='dropdownDefaultButton'
        data-dropdown-toggle='dropdown'
        className=' m-0 inline-flex items-center rounded-lg bg-transparent p-0 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 hover:bg-transparent focus:outline-none focus:ring-transparent'
        type='button'
      >
        {selected?.title}
        <svg
          className='ml-2.5 h-2.5 w-2.5'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m1 1 4 4 4-4'
          />
        </svg>
      </button>
      <div
        ref={ref}
        id='dropdown'
        className={classNames(
          'absolute bottom-10 right-0 z-10  w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700',
          {
            flex: isOpen,
            hidden: !isOpen,
          }
        )}
      >
        <ul
          className='w-full py-2 text-sm text-gray-700 dark:text-gray-200'
          aria-labelledby='dropdownDefaultButton'
        >
          {listDropdown.map((val) => (
            <li
              onClick={() => onSelectLang(val)}
              key={val.key}
              className='block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            >
              {val.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default memo(FooterSelectLang);
