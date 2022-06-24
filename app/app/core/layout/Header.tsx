import { useLocation, useParams } from '@remix-run/react';
import { t } from '~/core/traduction';
import { Link } from '../layout';
import { Menu, MenuItem } from './Menu';
import portrait from './portrait.jpg';
import { classNames } from './utils';

export const Header = () => {
  const location = useLocation();
  const params = useParams<{ lang: keyof typeof t }>();
  const lang = params.lang || 'en';
  const pathWithoutLang = location.pathname.split('/').slice(2).join('/');

  return (
    <header
      className={classNames(
        'z-20 flex flex-row px-8 py-4 bg-blue-100 backdrop-blur-lg items-center bg-opacity-20 text-blue-500 sticky top-0 space-x-6 shadow-sm',
      )}>
      <img src={portrait} alt='portait' className='rounded-3xl absolute shadow-lg transition-all h-10' />
      <div className='w-4' />
      <div className='flex flex-row items-center space-x-4 flex-1'>
        <Link to={`/${lang}`}>{t[lang || 'en'].home}</Link>
        <Link to={`/${lang}/blog`}>Blog</Link>
      </div>
      <h4 className={'font-light text-xl duration-300 sm:inline hidden'}>Simon Boisset</h4>
      <Menu title={t[lang || 'fr'].lang} placement='bottom-start'>
        <MenuItem href={`/fr/${pathWithoutLang}`}>{t.fr.lang}</MenuItem>
        <MenuItem href={`/en/${pathWithoutLang}`}>{t.en.lang}</MenuItem>
      </Menu>
    </header>
  );
};
