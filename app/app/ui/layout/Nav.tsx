import { FC } from 'react';

type NavProps = {};

export const Nav: FC<NavProps> = ({ children }) => {
  return <nav className='max-w-xs flex-1'>{children}</nav>;
};
