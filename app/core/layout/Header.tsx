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
        'z-20 flex flex-row sm:px-8 px-2 py-4 backdrop-blur-md items-center sticky top-0 sm:space-x-6 space-x-2',
      )}>
      <div className='flex flex-row items-center space-x-1 sm:space-x-4 flex-1'>
        <Link active={pathWithoutLang === ''} to={`/${lang}`}>
          {t.home}
        </Link>
        <Link active={pathWithoutLang === 'blog'} to={`/${lang}/blog`}>
          {t.blog.page}
        </Link>
      </div>
      <Menu flag={t.flag} title={t.lang} placement='bottom-start'>
        <MenuItem href={`/fr/${pathWithoutLang}`}>
          <span className='pr-4'>{traduction.fr.flag}</span>
          <span>{traduction.fr.lang}</span>
        </MenuItem>
        <MenuItem href={`/en/${pathWithoutLang}`}>
          <span className='pr-4'>{traduction.en.flag}</span>
          <span>{traduction.en.lang}</span>
        </MenuItem>
      </Menu>
    </header>
  );
};
