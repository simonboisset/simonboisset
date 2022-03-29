import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'remix';
import { t } from '~/features/traduction';
import portrait from './portrait.jpg';

const getProfilePictureHeight = () => {
  if (window.scrollY > 200) {
    return 40;
  } else {
    return 178;
  }
};

export const Header = ({ extended }: { extended?: boolean }) => {
  const [profilePictureHeight, setProfilePictureHeight] = useState(extended ? 178 : 40);
  const location = useLocation();
  const params = useParams<{ lang: keyof typeof t }>();
  console.log(location.pathname);

  useEffect(() => {
    if (extended) {
      setProfilePictureHeight(getProfilePictureHeight());

      const handleScroll = () => {
        setProfilePictureHeight(getProfilePictureHeight());
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [extended]);
  return (
    <>
      {extended && (
        <header className='z-20 flex flex-col bg-blue-500  text-white'>
          <div className='flex flex-col justify-center space-y-2 pl-4 pr-4 pt-2 pb-2 items-center h-72'>
            <h1 className='font-semibold text-5xl'>Développeur full stack</h1>
            <h3 className='font-semibold text-2xl'>React, Node, Typescript ...</h3>
          </div>
        </header>
      )}
      <div className='z-20 flex flex-row px-8 py-4 bg-blue-500 items-center text-white sticky top-0 space-x-6'>
        <img
          src={portrait}
          alt='portait'
          className='rounded-3xl absolute shadow-lg transition-all'
          style={{ height: profilePictureHeight }}
        />
        <div />
        <div
          style={{ marginLeft: profilePictureHeight }}
          className='flex flex-row items-center space-x-4 flex-1 transition-all'>
          <Link className='hover:underline' to='/fr'>
            Accueil
          </Link>
          <Link to='/fr/blog' className='flex-1 hover:underline'>
            Blog
          </Link>
          <h4
            className={
              'font-light text-xl transition-opacity duration-300' +
              (profilePictureHeight < 50 ? ' opacity-100' : ' opacity-0')
            }>
            Développeur full stack
          </h4>
          <div>{t[params.lang || 'fr'].lang}</div>
        </div>
      </div>
    </>
  );
};
