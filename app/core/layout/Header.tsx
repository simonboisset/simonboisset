import { useLocation } from '@remix-run/react';

import { traduction } from '../traduction';
import { useTraduction } from '../traduction/useTraduction';
import { Link } from './Link';
import { Menu, MenuItem } from './Menu';
import { classNames } from './utils';

export const Header = () => {
  const { pathname } = useLocation();

  const { t, lang } = useTraduction();
  const pathWithoutLang = pathname.split('/').slice(2).join('/');

  return (
    <header
      className={classNames(
        'z-20 flex flex-row sm:px-8 px-4 py-4 backdrop-blur-md items-center sticky top-0 sm:space-x-6 space-x-2',
      )}>
      <div className='sm:w-4 w-8' />
      <div className='flex flex-row items-center space-x-1 sm:space-x-4 flex-1'>
        <Link active={pathname === `/${lang}`} to={`/${lang}`}>
          {t.home}
        </Link>
        <Link active={pathname === `/${lang}/blog`} to={`/${lang}/blog`}>
          Blog
        </Link>
      </div>
      <Menu title={t.lang} placement='bottom-start'>
        <MenuItem href={`/fr/${pathWithoutLang}`}>{traduction.fr.lang}</MenuItem>
        <MenuItem href={`/en/${pathWithoutLang}`}>{traduction.en.lang}</MenuItem>
      </Menu>
    </header>
  );
};
