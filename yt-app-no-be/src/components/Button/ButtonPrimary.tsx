import React, { FC } from 'react';
import { ButtonPrimaryProps } from './interface';

const ButtonPrimary: FC<ButtonPrimaryProps> = ({ children, ...props }) => {
  return (
    <button
      className={
        'hover:shadow-orange-md rounded-lg bg-yt-blue-500 px-12 py-3 font-semibold text-white outline-none transition-all lg:px-16 lg:py-4 '
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
