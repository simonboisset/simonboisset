import { FC } from 'react';

type BodyProps = {};

export const Body: FC<BodyProps> = ({ children }) => {
  return (
    <div id='main-body' className='flex flex-col font-sans min-h-screen'>
      {children}
    </div>
  );
};
