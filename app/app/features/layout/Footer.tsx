import { Link } from 'remix';

export const Footer = () => {
  return (
    <footer className='px-20 py-8 flex flex-row space-x-60 justify-evenly border-t bg-slate-600 text-slate-200'>
      <div className='flex flex-col space-y-2'>
        <h5 className='font-semibold text-lg'>Site</h5>
        <Link className='hover:underline text-sm' to='/fr'>
          Home
        </Link>
        <Link className='hover:underline text-sm' to='/fr/blog'>
          Blog
        </Link>
      </div>
      <div className='flex flex-col space-y-2'>
        <h5 className='font-semibold text-lg'>Sources</h5>
        <Link className='hover:underline text-sm' to='https://github.com/simonboisset'>
          Github
        </Link>
        <Link className='hover:underline text-sm' to='https://github.com/simonboisset/website'>
          Repos
        </Link>
      </div>
      <div className='flex flex-col space-y-2'>
        <h5 className='font-semibold text-lg'>Contact</h5>
        <Link className='hover:underline text-sm' to='https://www.linkedin.com/in/simon-boisset-733445138/'>
          Linkedin
        </Link>
      </div>
    </footer>
  );
};
