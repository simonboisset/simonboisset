import { Text } from '~/core/layout';

type SkillSectionProps = {
  title: string;
  description: string;
  src: string;
  alt?: string;
};
export const SkillSection = ({ description, src, title, alt }: SkillSectionProps) => {
  return (
    <div className='group relative'>
      <div className='px-4 opacity-0 top-0 h-full ease-in-out duration-300 group-hover:translate-y-4 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all absolute w-full flex flex-col items-center space-y-2'>
        <Text color='gradient' As='h4' font='extrabold'>
          {title}
        </Text>
        <Text As='p' color='white' className='text-justify text-sm'>
          {description}
        </Text>
      </div>
      <img
        src={src}
        alt={alt}
        className='h-36 overflow-hidden group-hover:-translate-y-36 transition-transform ease-in-out duration-300 w-72'
      />
    </div>
  );
};
