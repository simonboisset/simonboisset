import { useLocation } from '@remix-run/react';

import { useTraduction } from '../traduction/useTraduction';
import { Link } from './Link';
import { classNames } from './utils';

export const Header = () => {
  const { pathname } = useLocation();

  const { t } = useTraduction();

  return (
    <header
      className={classNames(
        'z-20 flex flex-row sm:px-8 px-2 py-4 backdrop-blur-md items-center sticky top-0 sm:space-x-6 space-x-2',
      )}>
      <div className='flex flex-row items-center space-x-1 sm:space-x-4 flex-1'>
        <Link active={pathname === '/'} to={`/`}>
          {t.home}
        </Link>
        <Link active={pathname === '/blog'} to={`/blog`}>
          {t.blog.page}
        </Link>
      </div>
    </header>
  );
};
