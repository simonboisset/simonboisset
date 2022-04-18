import { FC } from 'react';

type MainProps = {
  className?: string;
};

export const Main: FC<MainProps> = ({ children, className }) => {
  return <main className={'flex-1 ' + className}>{children}</main>;
};
