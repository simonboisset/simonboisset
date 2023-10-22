import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { Button } from '@/ui/button';
import { Info, Mail } from 'lucide-react';
import Link from 'next/link';
import { Locale, getDictionary } from '../dictionaries';

export default async function Pricing({ params: { lang } }: { params: { lang: Locale } }) {
  const t = await getDictionary(lang);

  return (
    <div className='flex flex-col gap-24 w-full max-w-screen-lg mx-auto mt-32 px-12'>
      <div className='flex flex-col gap-12 items-center'>
        <h1 className='text-4xl font-black text-center'>{t.pricing.title}</h1>
        <p className='sm:text-xl text-lg text-center'>{t.pricing.description}</p>
        <Button asChild className='flex flex-row gap-4'>
          <Link href='mailto:simon@lezo.dev'>
            <Mail />
            <span>{t.home.contact_me}</span>
          </Link>
        </Button>
      </div>
      <div className='flex sm:flex-row flex-col gap-12 items-stretch'>
        <div className='flex flex-1 flex-col gap-4 items-center shadow-md rounded-lg p-4 bg-primary/5 hover:bg-primary/10 hover:scale-105 transition-all duration-300'>
          <h2 className='sm:text-2xl text-xl font-black'>{t.pricing.daily_rate.title}</h2>
          {/* <Button variant='secondary'>
            <CircleDollarSign className='w-4 h-4 mr-4' /> {t.pricing.project_rate.simulate_your_project}
          </Button> */}
          <div className='sm:text-xl text-lg bg-primary/20 py-1 px-4 flex flex-row items-end rounded-full gap-2'>
            <span>470€</span>
            <span className='text-sm italic'>{t.pricing.daily_rate.per_day}</span>
          </div>
          <p className='text-sm ml-auto italic'>* {t.pricing.daily_rate.pricing_without_vat}</p>
          <Alert>
            <Info className='h-4 w-4' />
            <AlertTitle>{t.pricing.use_case}</AlertTitle>
            <AlertDescription>{t.pricing.daily_rate.description}</AlertDescription>
          </Alert>
          <div className='w-full h-px bg-primary/40' />
          <h2 className='sm:text-xl text-xl font-bold'>{t.pricing.specifications}</h2>
          <ul className='flex flex-col gap-2 items-start w-full px-8'>
            <li className='flex flex-row gap-1'>
              <span className='pr-4'>✅</span>
              <span>{t.pricing.daily_rate.advise_on_technical_choices}</span>
            </li>
            <li className='flex flex-row gap-1'>
              <span className='pr-4'>✅</span>
              <span>{t.pricing.daily_rate.flexible_scope}</span>
            </li>
            <li className='flex flex-row gap-1'>
              <span className='pr-4'>❌</span>
              <span>{t.pricing.daily_rate.budget_is_not_defined}</span>
            </li>
          </ul>
        </div>
        <div className='flex flex-1 flex-col gap-4 items-center shadow-md rounded-lg p-4 bg-primary/5 hover:bg-primary/10 hover:scale-105 transition-all duration-300'>
          <h2 className='sm:text-2xl text-xl font-black'>{t.pricing.project_rate.title}</h2>
          {/* <Button variant='secondary'>
            <CircleDollarSign className='w-4 h-4 mr-4' /> {t.pricing.project_rate.simulate_your_project}
          </Button> */}
          <Alert>
            <Info className='h-4 w-4' />
            <AlertTitle>{t.pricing.use_case}</AlertTitle>
            <AlertDescription>{t.pricing.project_rate.description}</AlertDescription>
          </Alert>
          <div className='w-full h-px bg-primary/40' />
          <h2 className='sm:text-xl text-xl font-bold'>{t.pricing.specifications}</h2>
          <ul className='flex flex-col gap-2 items-start w-full px-8'>
            <li className='flex flex-row gap-1'>
              <span className='pr-4'>✅</span>
              <span className='flex-1'>{t.pricing.project_rate.advise_on_scope_definition}</span>
            </li>
            <li className='flex flex-row gap-1'>
              <span className='pr-4'>✅</span>
              <span>{t.pricing.project_rate.fixed_scope}</span>
            </li>
            <li className='flex flex-row gap-1'>
              <span className='pr-4'>✅</span>
              <span>{t.pricing.project_rate.fixed_price}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
