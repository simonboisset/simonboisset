import { Text } from '~/core/layout';

type BackgroundItemProps = {
  title: string;
  description: string;
  year: number;
  alt: string;
  img: string;
  link: string;
  reverse?: boolean;
};

export const BackgroundItem = ({ description, img, title, year, reverse, alt }: BackgroundItemProps) => {
  return (
    <div className='w-full flex flex-col items-center space-y-12'>
      <div className='z-10 flex items-center justify-center bg-primary-700 rounded-xl px-4 py-1'>
        <Text font='bold' As='h4' color='gradient'>
          {year}
        </Text>
      </div>
      {!reverse ? (
        <div className='flex flex-row w-full justify-between items-center'>
          <div className='sm:w-80 w-2/5 flex justify-center'>
            <img alt={alt} src={img} className='max-w-full max-h-40 rounded-3xl' />
          </div>
          <div className='sm:w-80 w-2/5 flex flex-col space-y-2'>
            <Text As='h4' font='extrabold' color='gradient'>
              {title}
            </Text>
            <Text className='text-justify text-sm' color='white'>
              {description}
            </Text>
          </div>
        </div>
      ) : (
        <div className='flex flex-row w-full justify-between items-center'>
          <div className='sm:w-80 w-2/5 flex flex-col space-y-2'>
            <Text As='h4' font='extrabold' color='gradient'>
              {title}
            </Text>
            <Text className='text-justify text-sm' color='white'>
              {description}
            </Text>
          </div>
          <div className='sm:w-80 w-2/5 flex justify-center'>
            <img alt={alt} src={img} className='max-w-full max-h-40 rounded-3xl' />
          </div>
        </div>
      )}
    </div>
  );
};
