import { FC } from 'react';

type BoxProps = {};

export const Box: FC<BoxProps> = ({ children }) => {
  return <div className='text-lg text-red-500'>{children}</div>;
};
