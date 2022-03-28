import { FC } from 'react';
import { TailwindSpace } from '../tailwind/spacing';

export const Column: FC<{ space: TailwindSpace }> = ({ space, children }) => {
  switch (space) {
    case 0:
      return <div className='flex flex-col items-center space-y-0'>{children}</div>;
    case 0.5:
      return <div className='flex flex-col items-center space-y-0.5'>{children}</div>;
    case 1:
      return <div className='flex flex-col items-center space-y-1'>{children}</div>;
    case 1.5:
      return <div className='flex flex-col items-center space-y-1.5'>{children}</div>;
    case 2:
      return <div className='flex flex-col items-center space-y-2'>{children}</div>;
    case 2.5:
      return <div className='flex flex-col items-center space-y-2.5'>{children}</div>;
    case 3:
      return <div className='flex flex-col items-center space-y-3'>{children}</div>;
    case 3.5:
      return <div className='flex flex-col items-center space-y-3.5'>{children}</div>;
    case 4:
      return <div className='flex flex-col items-center space-y-4'>{children}</div>;
    case 5:
      return <div className='flex flex-col items-center space-y-5'>{children}</div>;
    case 6:
      return <div className='flex flex-col items-center space-y-6'>{children}</div>;
    case 7:
      return <div className='flex flex-col items-center space-y-7'>{children}</div>;
    case 8:
      return <div className='flex flex-col items-center space-y-8'>{children}</div>;
    case 9:
      return <div className='flex flex-col items-center space-y-9'>{children}</div>;
    case 10:
      return <div className='flex flex-col items-center space-y-10'>{children}</div>;
    case 11:
      return <div className='flex flex-col items-center space-y-11'>{children}</div>;
    case 12:
      return <div className='flex flex-col items-center space-y-12'>{children}</div>;
    case 14:
      return <div className='flex flex-col items-center space-y-14'>{children}</div>;
    case 16:
      return <div className='flex flex-col items-center space-y-16'>{children}</div>;
    case 20:
      return <div className='flex flex-col items-center space-y-20'>{children}</div>;
    case 24:
      return <div className='flex flex-col items-center space-y-24'>{children}</div>;
    case 28:
      return <div className='flex flex-col items-center space-y-28'>{children}</div>;
    case 32:
      return <div className='flex flex-col items-center space-y-32'>{children}</div>;
    case 36:
      return <div className='flex flex-col items-center space-y-36'>{children}</div>;
    case 40:
      return <div className='flex flex-col items-center space-y-40'>{children}</div>;
    case 44:
      return <div className='flex flex-col items-center space-y-44'>{children}</div>;
    case 48:
      return <div className='flex flex-col items-center space-y-48'>{children}</div>;
    case 52:
      return <div className='flex flex-col items-center space-y-52'>{children}</div>;
    case 56:
      return <div className='flex flex-col items-center space-y-56'>{children}</div>;
    case 60:
      return <div className='flex flex-col items-center space-y-60'>{children}</div>;
    case 64:
      return <div className='flex flex-col items-center space-y-64'>{children}</div>;
    case 68:
      return <div className='flex flex-col items-center space-y-68'>{children}</div>;
    case 72:
      return <div className='flex flex-col items-center space-y-72'>{children}</div>;
    case 76:
      return <div className='flex flex-col items-center space-y-76'>{children}</div>;
    case 80:
      return <div className='flex flex-col items-center space-y-80'>{children}</div>;
    case 96:
      return <div className='flex flex-col items-center space-y-96'>{children}</div>;
  }
};
