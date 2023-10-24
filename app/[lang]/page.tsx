import { Button } from '@/ui/button';
import { Mail } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Locale, getDictionary } from './dictionaries';

type Params = { lang: Locale };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const t = await getDictionary(params.lang);

  return {
    title: `Simon Boisset | ${t.home.title}`,
    description: t.home.description,
    viewport: 'width=device-width, initial-scale=1',
  };
}

export default async function Home({ params: { lang } }: { params: Params }) {
  const t = await getDictionary(lang);

  return (
    <div className='flex flex-col gap-4 w-full max-w-screen-lg mx-auto mt-52 px-12'>
      <div className='flex flex-col gap-12 items-center'>
        <h1 className='text-4xl font-black text-center'>{t.home.title}</h1>
        <p className='text-xl text-center'>{t.home.description}</p>
        <Button asChild className='flex flex-row gap-4'>
          <Link href='mailto:simon@lezo.dev'>
            <Mail />
            <span>{t.home.contact_me}</span>
          </Link>
        </Button>
        <div className='mt-24 h-px w-full max-w-sm bg-foreground/30' />
        <h1 className=' text-3xl font-bold text-center'>{t.home.achievements}</h1>
        <p className='text-lg text-center'>{t.home.achievements_description}</p>
        <section className='gap-12 grid sm:grid-cols-3 grid-cols-1'>
          <AchievementCard
            title={t.home.silbo}
            description={t.home.silbo_description}
            image='https://lezo-files.s3.fr-par.scw.cloud/simon-blog/silbo.webp'
            link='https://silbo.com/fr/'
          />
          <AchievementCard
            title={t.home.linote}
            description={t.home.linote_description}
            image='https://lezo-files.s3.fr-par.scw.cloud/simon-blog/linote.webp'
            link='https://linote.fr/'
          />
          <AchievementCard
            title={t.home.mon_pont_chaban}
            description={t.home.mon_pont_chaban_description}
            image='https://lezo-files.s3.fr-par.scw.cloud/simon-blog/chaban.webp'
            link='https://pont-chaban-delmas.com/'
          />
          <AchievementCard
            title={t.home.atypique_radio}
            description={t.home.atypique_radio_description}
            image='https://lezo-files.s3.fr-par.scw.cloud/simon-blog/atypique.webp'
            link='https://www.atypiqueradio.fr/'
          />
          <AchievementCard
            title={t.home.questovery}
            description={t.home.questovery_description}
            image='https://lezo-files.s3.fr-par.scw.cloud/simon-blog/questovery.webp'
            link='https://www.questovery.com/'
          />
        </section>
      </div>
    </div>
  );
}

const AchievementCard = ({
  title,
  description,
  image,
  link,
}: {
  title: string;
  description: string;
  image: string;
  link: string;
}) => {
  return (
    <Link
      className='flex flex-col gap-4 items-center bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer shadow-lg rounded-xl overflow-hidden'
      href={link}>
      <Image className='w-full h-52 object-cover' src={image} width={200} height={200} alt={title} />
      <div className='flex flex-col gap-2 items-center p-4'>
        <span className='text-lg font-bold'>{title}</span>
        <span className='text-sm text-justify'>{description}</span>
      </div>
    </Link>
  );
};
