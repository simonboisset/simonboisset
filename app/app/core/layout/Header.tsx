import { useLocation } from '@remix-run/react';

import { Link } from '../layout';
import { traduction } from '../traduction';
import { useTraduction } from '../traduction/useTraduction';
import { Menu, MenuItem } from './Menu';
import portrait from './portrait.jpg';
import { classNames } from './utils';

export const Header = () => {
  const location = useLocation();

  const { t, lang } = useTraduction();
  const pathWithoutLang = location.pathname.split('/').slice(2).join('/');

  return (
    <header
      className={classNames(
        'z-20 flex flex-row px-8 py-4 bg-blue-100 backdrop-blur-lg items-center bg-opacity-20 text-blue-500 sticky top-0 space-x-6 shadow-sm',
      )}>
      <img src={portrait} alt='portait' className='rounded-3xl absolute shadow-lg transition-all h-10' />
      <div className='w-4' />
      <div className='flex flex-row items-center space-x-4 flex-1'>
        <Link to={`/${lang}`}>{t.home}</Link>
        <Link to={`/${lang}/blog`}>Blog</Link>
      </div>
      <h4 className={'font-light text-xl duration-300 sm:inline hidden'}>Simon Boisset</h4>
      <Menu title={t.lang} placement='bottom-start'>
        <MenuItem href={`/fr/${pathWithoutLang}`}>{traduction.fr.lang}</MenuItem>
        <MenuItem href={`/en/${pathWithoutLang}`}>{traduction.en.lang}</MenuItem>
      </Menu>
    </header>
  );
};
