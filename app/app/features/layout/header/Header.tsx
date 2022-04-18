import { useLocation, useParams } from '@remix-run/react';
import { t } from '~/features/traduction';
import { classNames, Link, Menu, MenuItem } from '~/features/ui';

import portrait from './portrait.jpg';

const getProfilePictureHeight = () => {
  if (window.scrollY > 200) {
    return 40;
  } else {
    return 178;
  }
};

export const Header = ({ extended }: { extended?: boolean }) => {
  const location = useLocation();
  const params = useParams<{ lang: keyof typeof t }>();
  const lang = params.lang || 'en';
  const pathWithoutLang = location.pathname.split('/').slice(2).join('/');

  return (
    <>
      {extended && (
        <header className='z-20 flex-col bg-blue-500  text-white hidden sm:flex'>
          <div className='flex flex-col justify-center space-y-2 pl-4 pr-4 pt-2 pb-2 items-center h-72'>
            <h1 className='font-semibold text-5xl'>{t[lang].fullStack}</h1>
            <h3 className='font-semibold text-2xl'>React, Node, Typescript ...</h3>
          </div>
        </header>
      )}
      <div
        className={classNames(
          'z-20 flex flex-row px-8 py-4 bg-blue-500 items-center text-white sticky top-0 space-x-6 ',
        )}>
        <img src={portrait} alt='portait' className='rounded-3xl absolute shadow-lg transition-all h-10' />
        <div className='w-4' />
        <div className='flex flex-row items-center space-x-4 flex-1'>
          <Link color='light' to={`/${lang}`}>
            {t[lang || 'en'].home}
          </Link>
          <Link color='light' to={`/${lang}/blog`}>
            Blog
          </Link>
        </div>
        <h4 className={'font-light text-xl duration-300 sm:inline hidden'}>Simon Boisset</h4>
        <Menu title={t[lang || 'fr'].lang} placement='bottom-start'>
          <MenuItem href={`/fr/${pathWithoutLang}`}>{t.fr.lang}</MenuItem>
          <MenuItem href={`/en/${pathWithoutLang}`}>{t.en.lang}</MenuItem>
        </Menu>
      </div>
    </>
  );
};
