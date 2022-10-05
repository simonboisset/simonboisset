import { Footer, SkillSection, Text, View } from '~/core/layout';
import { useTraduction } from '~/core/traduction/useTraduction';
import { AchievementItem } from './AchievementItem';
import amplitude from './assets/amplitude.png';
import bordeaux from './assets/bordeaux.png';
import chaban from './assets/chaban.jpeg';
import devops from './assets/docker.svg';
import lille from './assets/lille.svg';
import server from './assets/node.svg';
import mobile from './assets/react-native.svg';
import web from './assets/react.svg';
import silbo from './assets/silbo.webp';
import { BackgroundItem } from './BackgroundItem';

export default function Index() {
  const { t } = useTraduction();

  return (
    <View>
      <main className='flex-1 mt-24 px-20'>
        <Text As='div' color='gradient' className='flex flex-col justify-center space-y-8 pl-4 pr-4 pb-60 items-center'>
          <Text font='black' As='h1' color='gradient'>
            {t.fullStack}
          </Text>
          <Text As='h2' font='black'>
            Freelance
          </Text>
        </Text>
        <div className='flex justify-between'>
          <SkillSection
            src={web}
            alt='frontend-skill'
            title={t.skills.frontend.title}
            description={t.skills.frontend.description}
          />
          <SkillSection
            src={mobile}
            alt='mobile-skill'
            title={t.skills.mobile.title}
            description={t.skills.mobile.description}
          />
          <SkillSection
            src={devops}
            alt='devops-skill'
            title={t.skills.devops.title}
            description={t.skills.devops.description}
          />
          <SkillSection
            src={server}
            alt='backend-skill'
            title={t.skills.backend.title}
            description={t.skills.backend.description}
          />
        </div>

        <div className='mt-8 w-full h-px rounded-full bg-gradient-to-l from-primary-500 to-secondary-500' />
        <div className='py-24 flex flex-col items-center space-y-16 bg-opacity-5'>
          <Text As='h3' color='gradient' font='extrabold'>
            {t.achievements.label}
          </Text>
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
              link='https://pont-chaban-delmas.com/'
            />
          </div>
        </div>
        <div className='p-10 flex flex-col items-center space-y-16'>
          <Text As='h3' color='gradient' font='extrabold'>
            {t.background.label}
          </Text>
          <div className='flex flex-col space-y-28 w-full max-w-4xl items-center relative'>
            <div className='w-px bg-gradient-to-b via-primary-500 to-secondary-500 from-secondary-500 rounded-full absolute z-0 top-0 bottom-0' />
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
            <BackgroundItem
              alt={t.background.freelance.alt}
              description={t.background.freelance.description}
              year={2023}
              title={t.background.freelance.title}
              link='/'
              img={web}
            />
          </div>
        </div>
      </main>
      <div className='mt-24 w-full h-px rounded-full bg-gradient-to-l from-primary-500 to-secondary-500' />
      <Footer />
    </View>
  );
}
