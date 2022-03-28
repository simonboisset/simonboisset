import { FC } from 'react';

type ListProps = {};

export const List: FC<ListProps> = ({ children }) => {
  return <ul className='space-y-2 p-2'>{children}</ul>;
};
