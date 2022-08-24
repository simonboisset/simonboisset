import { Link } from '@remix-run/react';
import { useTraduction } from '../traduction/useTraduction';

export const Footer = () => {
  const { t, lang } = useTraduction();
  return (
    <footer className='px-20 py-8 flex flex-col sm:flex-row sm:space-x-60 sm:space-y-0 space-y-10 justify-evenly border-t bg-blue-600 text-slate-100'>
      <div className='flex flex-col space-y-2 items-center sm:items-start'>
        <h5 className='font-semibold text-lg'>Site</h5>
        <Link className='hover:underline text-sm' to={`/${lang}`}>
          {t.home}
        </Link>
        <Link className='hover:underline text-sm' to={`/${lang}/blog`}>
          Blog
        </Link>
      </div>
      <div className='flex flex-col space-y-2 items-center sm:items-start'>
        <h5 className='font-semibold text-lg'>Sources</h5>
        <a className='hover:underline text-sm' href='https://github.com/simonboisset'>
          Github
        </a>
        <a className='hover:underline text-sm' href='https://github.com/simonboisset/website'>
          Code
        </a>
      </div>
      <div className='flex flex-col space-y-2 items-center sm:items-start'>
        <h5 className='font-semibold text-lg'>Contact</h5>
        <a className='hover:underline text-sm' href='https://www.linkedin.com/in/simon-boisset-733445138/'>
          Linkedin
        </a>
        <a className='hover:underline text-sm' href='https://twitter.com/simonboisset'>
          Twitter
        </a>
      </div>
    </footer>
  );
};
