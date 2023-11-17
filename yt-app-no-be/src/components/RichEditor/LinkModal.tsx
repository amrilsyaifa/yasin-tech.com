import React from 'react';
import ReactModal from 'react-modal';
import { ModalEditor } from '@components/Modal';

interface IProps extends ReactModal.Props {
  isOpen: boolean;
  url: string;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOk: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function LinkModal(props: IProps) {
  const { url, isOpen, onClose, onChange, onOk, onCancel } = props;
  return (
    <ModalEditor
      title='Edit Link'
      onClose={onClose}
      isOpen={isOpen}
      onOk={onOk}
      onCancel={onCancel}
    >
      <input
        value={url}
        type='text'
        id='last_name'
        className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-yt-blue-500 focus:ring-yt-blue-500 dark:border-yt-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-yt-blue-500 dark:focus:ring-yt-blue-500'
        placeholder='ex: doe'
        onChange={onChange}
      />
    </ModalEditor>
  );
}
