'use client';

import React, { FC, ReactNode } from 'react';
import LinkNext, { LinkProps } from 'next/link';
import { useParams } from 'next/navigation';

interface ILinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

const Link: FC<ILinkProps> = ({ children, href, ...props }) => {
  const params = useParams();
  return (
    <LinkNext href={`/${params?.locale}${href}`} {...props}>
      {children}
    </LinkNext>
  );
};

export default Link;
