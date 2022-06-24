import { useEffect, useRef, useState } from 'react';
import { Footer, Header } from '~/core/layout';
import { useTraduction } from '~/core/traduction/useTraduction';
import { AchievementItem } from './AchievementItem';
import amplitude from './assets/amplitude.png';
import bordeaux from './assets/bordeaux.jpeg';
import chaban from './assets/chaban.jpeg';
import lille from './assets/lille.jpeg';
import silbo from './assets/silbo.jpeg';
import { BackgroundItem } from './BackgroundItem';
export default function Index() {
  const parcoursRef = useRef<HTMLDivElement>(null);
  const [timelinePosition, setTimelinePosition] = useState([0, 0]);

  const { t, lang } = useTraduction();
  useEffect(() => {
    const handleResize = () => {
      const body = document.getElementById('main-body');
      setTimelinePosition([
        (parcoursRef.current?.getBoundingClientRect().top || 0) - (body?.getBoundingClientRect().top || 0),
        window.innerHeight -
          (body?.getBoundingClientRect().height || 0) -
          ((parcoursRef.current?.getBoundingClientRect().bottom || 0) - (body?.getBoundingClientRect().bottom || 0)),
      ]);
    };
    handleResize();
    addEventListener('resize', handleResize);
    return () => removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id='main-body' className='flex flex-col font-sans min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='z-20 flex-col bg-blue-100  text-blue-600 hidden sm:flex rounded-xl m-8'>
          <div className='flex flex-col justify-center space-y-2 pl-4 pr-4 pt-2 pb-2 items-center h-72'>
            <h1 className='font-semibold text-5xl'>{t.fullStack}</h1>
            <h3 className='font-semibold text-2xl'>React, Node, Typescript ...</h3>
          </div>
        </div>
        <div className='py-10 flex flex-col items-center space-y-16 bg-opacity-5'>
          <h2 className='font-semibold text-3xl'>{t.achievements.label}</h2>
          <div className='flex flex-col sm:flex-row space-y-10 sm:space-y-0 sm:space-x-40 justify-center px-10'>
            <AchievementItem
              title={t.achievements.silbo.title}
              description={t.achievements.silbo.description}
              img={silbo}
              link='https://silbo.com/'
            />
            <AchievementItem
              title={t.achievements.chaban.title}
              description={t.achievements.chaban.description}
              img={chaban}
              link='https://horaires-pont-chaban-delmas.simonboisset.com/'
            />
          </div>
        </div>
        <div className='p-10 flex flex-col items-center space-y-16'>
          <h2 className='font-semibold text-3xl'>{t.background.label}</h2>
          <div ref={parcoursRef} className='flex flex-col space-y-28 w-full max-w-4xl items-center'>
            <div
              className='w-px bg-blue-500 rounded-full absolute z-0'
              style={{ top: timelinePosition[0], bottom: timelinePosition[1] }}
            />
            <BackgroundItem
              alt={t.background.licence.alt}
              description={t.background.licence.description}
              year={2012}
              title={t.background.licence.title}
              link='https://www.u-bordeaux.fr/'
              img={bordeaux}
            />
            <BackgroundItem
              alt={t.background.master.alt}
              description={t.background.master.description}
              year={2014}
              title={t.background.master.title}
              link='https://www.univ-lille.fr/'
              img={lille}
              reverse
            />
            <BackgroundItem
              alt={t.background.amplitude.alt}
              description={t.background.amplitude.description}
              year={2015}
              title={t.background.amplitude.title}
              link='https://amplitude-laser.com/'
              img={amplitude}
            />
            <BackgroundItem
              alt={t.background.silbo.alt}
              description={t.background.silbo.description}
              year={2020}
              title={t.background.silbo.title}
              link='https://silbo.com/'
              img={silbo}
              reverse
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
