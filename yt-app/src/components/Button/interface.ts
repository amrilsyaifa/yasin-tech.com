import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonPrimaryProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
