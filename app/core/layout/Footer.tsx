import { Link } from '@remix-run/react';
import { useTraduction } from '../traduction/useTraduction';

export const Footer = () => {
  const { t } = useTraduction();
  return (
    <footer className='px-20 py-8 flex flex-col sm:flex-row sm:space-x-60 sm:space-y-0 space-y-10 justify-evenly text-slate-100'>
      <div className='flex flex-col space-y-2 items-center sm:items-start'>
        <h5 className='font-semibold text-lg'>Site</h5>
        <Link className='hover:underline text-sm' to={`/`}>
          {t.home}
        </Link>
        <Link className='hover:underline text-sm' to={`/blog`}>
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
        <h5 className='font-semibold text-lg'>{t.legal}</h5>
        <Link className='hover:underline text-sm' to='/docs/legal'>
          Mentions légales
        </Link>
        <Link className='hover:underline text-sm' to='/docs/privacy'>
          Politique de confidentialité
        </Link>
      </div>
      <div className='flex flex-col space-y-2 items-center sm:items-start'>
        <h5 className='font-semibold text-lg'>{t.links}</h5>
        <a className='hover:underline text-sm' href='https://www.linkedin.com/in/simon-boisset-733445138/'>
          Linkedin
        </a>
        <a className='hover:underline text-sm' href='https://twitter.com/simonboisset'>
          Twitter
        </a>
        <a className='hover:underline text-sm' href='https://dev.to/simonboisset'>
          Dev
        </a>
        <a className='hover:underline text-sm' href='https://www.malt.fr/profile/simonboisset'>
          Malt
        </a>
      </div>
    </footer>
  );
};
