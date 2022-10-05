import { Text } from '~/core/layout';

type AchievementItemProps = {
  title: string;
  description: string;
  link: string;
  img: string;
};

export const AchievementItem = ({ description, img, title, link }: AchievementItemProps) => {
  return (
    <a href={link} className='group relative flex justify-center'>
      <div className='px-4 opacity-0 top-0 h-full ease-in-out duration-300 group-hover:translate-y-12 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all absolute w-64 flex flex-col items-center space-y-2'>
        <Text color='gradient' As='h5' font='extrabold' className='text-center'>
          {title}
        </Text>
        <Text As='p' color='white' className='text-justify text-sm'>
          {description}
        </Text>
      </div>
      <img
        src={img}
        alt={title}
        className='h-44 overflow-hidden group-hover:-translate-y-24 group-hover:scale-50 transition-transform ease-in-out duration-300 w-44 rounded-2xl'
      />
    </a>
  );
};
