import { Button } from '@/ui/button';
import { CircleDollarSign, Code2, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { Locale, getDictionary } from '../dictionaries';
import { LocalSelect } from './local-select';
import { ToggleThemeButton } from './toggle-theme-button';

export const Header = async ({ params, theme }: { params: { lang: Locale }; theme: 'light' | 'dark' }) => {
  const t = await getDictionary(params.lang);
  return (
    <header className='flex z-40 fixed top-0 left-0 right-0 justify-between items-center px-4 sm:gap-4 gap-2 h-16 bg-foreground/10 backdrop-blur-md'>
      <Link
        href={`/${params.lang}`}
        className='sm:text-2xl text-xl font-bold flex flex-row items-center gap-4'
        aria-label='Simon Boisset'>
        <Code2 className='sm:w-8 sm:h-8 w-6 h-6' />
        <span className='hidden sm:inline'>Simon Boisset</span>
        <span className='sm:hidden'>SB</span>
      </Link>
      <div className='flex-1' />
      <Button variant='ghost' asChild className='flex flex-row gap-4'>
        <Link href={`/${params.lang}/pricing`} aria-label={t.footer.pricing}>
          <CircleDollarSign />
          <span className='hidden sm:inline'>{t.footer.pricing}</span>
        </Link>
      </Button>
      <Button variant='ghost' asChild className='flex flex-row gap-4'>
        <Link href={`/${params.lang}/blog`} aria-label={t.footer.blog}>
          <Newspaper />
          <span className='hidden sm:inline'>{t.footer.blog}</span>
        </Link>
      </Button>
      <LocalSelect value={params.lang} />
      <ToggleThemeButton theme={theme} />
    </header>
  );
};
