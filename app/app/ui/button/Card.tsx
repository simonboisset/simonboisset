import { FC, ReactElement } from 'react';

export type CardProps = {
  Icon: ReactElement;
  title: string;
  subtitle: string;
};

export const Card: FC<CardProps> = ({ subtitle, Icon, title }) => {
  return (
    <button className=' p-3 flex items-start rounded-lg hover:bg-gray-50'>
      <div className='flex-shrink-0 h-6 w-6 text-blue-600'>{Icon}</div>
      <div className='ml-4 text-left'>
        <p className='text-base font-medium text-gray-900'>{title}</p>
        <p className='mt-1 text-sm text-gray-500'>{subtitle}</p>
      </div>
    </button>
  );
};
