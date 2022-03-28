import { FC } from 'react';
import { TailwindSpace } from '../tailwind/spacing';

export const Row: FC<{ space: TailwindSpace }> = ({ space, children }) => {
  switch (space) {
    case 0:
      return <div className='flex flex-row items-center space-x-0'>{children}</div>;
    case 0.5:
      return <div className='flex flex-row items-center space-x-0.5'>{children}</div>;
    case 1:
      return <div className='flex flex-row items-center space-x-1'>{children}</div>;
    case 1.5:
      return <div className='flex flex-row items-center space-x-1.5'>{children}</div>;
    case 2:
      return <div className='flex flex-row items-center space-x-2'>{children}</div>;
    case 2.5:
      return <div className='flex flex-row items-center space-x-2.5'>{children}</div>;
    case 3:
      return <div className='flex flex-row items-center space-x-3'>{children}</div>;
    case 3.5:
      return <div className='flex flex-row items-center space-x-3.5'>{children}</div>;
    case 4:
      return <div className='flex flex-row items-center space-x-4'>{children}</div>;
    case 5:
      return <div className='flex flex-row items-center space-x-5'>{children}</div>;
    case 6:
      return <div className='flex flex-row items-center space-x-6'>{children}</div>;
    case 7:
      return <div className='flex flex-row items-center space-x-7'>{children}</div>;
    case 8:
      return <div className='flex flex-row items-center space-x-8'>{children}</div>;
    case 9:
      return <div className='flex flex-row items-center space-x-9'>{children}</div>;
    case 10:
      return <div className='flex flex-row items-center space-x-10'>{children}</div>;
    case 11:
      return <div className='flex flex-row items-center space-x-11'>{children}</div>;
    case 12:
      return <div className='flex flex-row items-center space-x-12'>{children}</div>;
    case 14:
      return <div className='flex flex-row items-center space-x-14'>{children}</div>;
    case 16:
      return <div className='flex flex-row items-center space-x-16'>{children}</div>;
    case 20:
      return <div className='flex flex-row items-center space-x-20'>{children}</div>;
    case 24:
      return <div className='flex flex-row items-center space-x-24'>{children}</div>;
    case 28:
      return <div className='flex flex-row items-center space-x-28'>{children}</div>;
    case 32:
      return <div className='flex flex-row items-center space-x-32'>{children}</div>;
    case 36:
      return <div className='flex flex-row items-center space-x-36'>{children}</div>;
    case 40:
      return <div className='flex flex-row items-center space-x-40'>{children}</div>;
    case 44:
      return <div className='flex flex-row items-center space-x-44'>{children}</div>;
    case 48:
      return <div className='flex flex-row items-center space-x-48'>{children}</div>;
    case 52:
      return <div className='flex flex-row items-center space-x-52'>{children}</div>;
    case 56:
      return <div className='flex flex-row items-center space-x-56'>{children}</div>;
    case 60:
      return <div className='flex flex-row items-center space-x-60'>{children}</div>;
    case 64:
      return <div className='flex flex-row items-center space-x-64'>{children}</div>;
    case 68:
      return <div className='flex flex-row items-center space-x-68'>{children}</div>;
    case 72:
      return <div className='flex flex-row items-center space-x-72'>{children}</div>;
    case 76:
      return <div className='flex flex-row items-center space-x-76'>{children}</div>;
    case 80:
      return <div className='flex flex-row items-center space-x-80'>{children}</div>;
    case 96:
      return <div className='flex flex-row items-center space-x-96'>{children}</div>;
  }
};
