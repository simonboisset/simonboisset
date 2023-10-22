import { Button } from '@/ui/button';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { Locale, getDictionary } from './dictionaries';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const t = await getDictionary(lang);

  return (
    <div className='flex flex-col gap-4 w-full max-w-screen-lg mx-auto mt-32 px-12'>
      <div className='flex flex-col gap-12 items-center'>
        <h1 className='text-4xl font-black text-center'>{t.home.title}</h1>
        <p className='text-xl text-center'>{t.home.description}</p>
        <Button asChild className='flex flex-row gap-4'>
          <Link href='mailto:simon@lezo.dev'>
            <Mail />
            <span>{t.home.contact_me}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
