import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Locale, getDictionary } from '../dictionaries';

export const Footer = async ({ lang }: { lang: Locale }) => {
  const t = await getDictionary(lang);
  return (
    <footer className='w-full p-4 mt-12 bg-gradient-to-t from-foreground/25 to-transparent pt-24'>
      <div className='flex sm:flex-row gap-8 flex-col justify-between items-center sm:items-start w-full max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-2 flex-[2] sm:items-start items-center'>
          <span className='text-lg font-bold'>{t.footer.site}</span>
          <Link href={`/${t.locale}`} className='text-primary'>
            {t.footer.home}
          </Link>
          <Link href={`/${t.locale}/blog`} className='text-primary'>
            {t.footer.blog}
          </Link>
        </div>
        <div className='flex flex-col flex-[2] sm:items-center items-center'>
          <div className='flex flex-col gap-2  sm:items-start items-center'>
            <span className='text-lg font-bold'>{t.footer.docs}</span>
            <Link href={`/${t.locale}/legal`} className='text-primary'>
              {t.footer.legal}
            </Link>
            <Link href={`/${t.locale}/privacy`} className='text-primary'>
              {t.footer.privacy}
            </Link>
          </div>
        </div>
        <div className='flex flex-col flex-[2] sm:items-end items-center'>
          <div className='flex flex-col gap-2  sm:items-start items-center'>
            <span className='text-lg font-bold'>{t.footer.links}</span>
            <Link
              href='https://www.linkedin.com/in/simon-boisset-733445138/'
              className='text-primary flex flex-row items-center gap-2'>
              <Linkedin className='w-4 h-4' />
              <span>Linkedin</span>
            </Link>
            <Link href='https://github.com/simonboisset' className='text-primary flex flex-row items-center gap-2'>
              <Github className='w-4 h-4' />
              <span>Github</span>
            </Link>
            <Link
              href='https://www.malt.fr/profile/simonboisset'
              className='text-primary flex flex-row items-center gap-2'>
              <Malt className='w-4 h-4' />
              <span>Malt</span>
            </Link>
            <Link href='https://twitter.com/simonboisset' className='text-primary flex flex-row items-center gap-2'>
              <Twitter className='w-4 h-4' />
              <span>Twitter</span>
            </Link>
            <Link href='mailto:simon@lezo.dev' className='text-primary flex flex-row items-center gap-2'>
              <Mail className='w-4 h-4' />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Malt = ({ className }: { className?: string }) => {
  return (
    <svg viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path
        d='M15.5801 4.03455C16.792 2.82259 18.7216 1.64252 20.5395 3.46046C22.3575 5.2784 21.1774 7.20797 19.9654 8.41993L8.53156 19.8538C7.3196 21.0658 5.48571 22.3415 3.57209 20.4279C1.67442 18.5143 2.93422 16.6804 4.14618 15.4684L15.5801 4.03455Z'
        fill='currentColor'
      />
      <path
        d='M12.0399 5.42193L9.61595 2.99801C9.42458 2.80665 9.24917 2.64718 9.05781 2.48771C9.31296 1.18007 10.0625 0 12.0399 0C14.0173 0 14.7668 1.18007 15.0219 2.48771L15.0219 2.48772C14.8465 2.63124 14.6711 2.77476 14.5116 2.95017L12.0399 5.42193Z'
        fill='currentColor'
      />
      <path
        d='M12.0239 18.5302L14.4957 21.002C14.6711 21.1615 14.8306 21.305 14.99 21.4645C14.7189 22.788 13.9375 24.0159 12.0239 24.0159C10.1262 24.0159 9.3289 22.788 9.05781 21.4645C9.23322 21.305 9.40864 21.1455 9.6 20.9542L12.0239 18.5302Z'
        fill='currentColor'
      />
      <path
        d='M3.90698 8.86645H8.5794C8.5794 8.86645 2.72691 14.7668 2.5515 14.9262C1.22791 14.6552 0 13.8738 0 11.9601C0 9.40864 2.20066 8.86645 3.90698 8.86645Z'
        fill='currentColor'
      />
      <path
        d='M15.4844 15.0698C15.4844 15.0698 21.3688 9.16943 21.5123 8.99402C22.8199 9.24917 24 9.99867 24 11.9761C24 14.6711 21.7993 15.0698 20.093 15.0698H15.4844Z'
        fill='currentColor'
      />
      <path
        d='M10.9395 6.50631L10.1103 7.33555C10.1103 7.33555 3.44452 7.3515 3.20532 7.36744C2.47176 6.26711 2.15282 4.91163 3.55615 3.50831C5.46977 1.61063 7.30365 2.87043 8.51561 4.08239L10.9395 6.50631Z'
        fill='currentColor'
      />
      <path
        d='M13.1243 17.4299L13.9535 16.6007C13.9535 16.6007 20.6033 16.5847 20.8425 16.5688C21.592 17.701 21.911 19.1203 20.5555 20.4757C18.7375 22.2777 16.808 21.1136 15.596 19.9017L13.1243 17.4299Z'
        fill='currentColor'
      />
    </svg>
  );
};
