import { FC } from 'react';
import { Link } from 'remix';

type IconLinkProps = {
  href?: string;
};

export const IconLink: FC<IconLinkProps> = ({ children, href }) => {
  return (
    <Link
      to={href || '.'}
      className='w-10 h-10 bg-gray-400 bg-opacity-0 rounded-full p-2 hover:bg-opacity-10 active:bg-opacity-5'>
      {children}
    </Link>
  );
};
