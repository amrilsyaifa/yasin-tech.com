import { useTranslations } from 'next-intl';
import { FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useIsMounted, useOnClickOutside } from 'usehooks-ts';
import { AiOutlineClose } from 'react-icons/ai';

interface ModalEditorProps {
  cancelText?: string;
  okText?: string;
  title: string;
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ModalEditor: FC<ModalEditorProps> = ({
  isOpen,
  title,
  cancelText,
  okText,
  children,
  onClose,
  onCancel,
  onOk,
}) => {
  const t = useTranslations('Components');
  const isMounted = useIsMounted();

  const ref = useRef<HTMLDivElement | null>(null);
  const refContainer = useRef<HTMLDivElement>(null);
  useOnClickOutside(refContainer, () => onClose?.());

  useEffect(() => {
    ref.current = document.querySelector<HTMLDivElement>('#portal');
  }, [isMounted]);

  const escFunction = useCallback((event: { key: string }) => {
    if (event.key === 'Escape') {
      onClose?.();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  if (isMounted() && !isOpen) return null;

  const buttonCancel = cancelText || t('modal.modal_editor.cancel');
  const buttonOk = okText || t('modal.modal_editor.ok');
  return isMounted() && ref.current && isOpen
    ? createPortal(
        <div className='yt-backdrop fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0'>
          <div
            ref={refContainer}
            className='relative max-h-full w-full max-w-2xl'
          >
            {/* <!-- Modal content --> */}
            <div className='relative rounded-lg bg-white  shadow'>
              {/* <!-- Modal header --> */}
              <div className='flex items-start justify-between rounded-t border-b p-3 dark:border-gray-600'>
                <h3 className='e text-xl font-semibold text-yt-gray-600'>
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  type='button'
                  className='ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                  data-modal-hide='defaultModal'
                >
                  <AiOutlineClose />
                  <span className='sr-only'>Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className='space-y-6 p-6'>{children}</div>
              {/* <!-- Modal footer --> */}
              <div className='flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 p-3 dark:border-gray-600'>
                <button
                  onClick={onCancel}
                  data-modal-hide='defaultModal'
                  type='button'
                  className='-4 focus:yt-gray-500 rounded-lg bg-yt-gray-200 px-5 py-2.5 text-center text-sm font-medium  text-yt-gray-600 hover:bg-yt-gray-300 focus:outline-none focus:ring-4  dark:bg-yt-gray-200  dark:hover:bg-yt-gray-300  dark:focus:ring-yt-gray-400'
                >
                  {buttonCancel}
                </button>
                <button
                  onClick={onOk}
                  data-modal-hide='defaultModal'
                  type='button'
                  className='rounded-lg bg-yt-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white  hover:bg-yt-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300  dark:bg-yt-blue-600  dark:hover:bg-yt-blue-500  dark:focus:ring-blue-800'
                >
                  {buttonOk}
                </button>
              </div>
            </div>
          </div>
        </div>,
        ref.current
      )
    : null;
};

export default ModalEditor;
