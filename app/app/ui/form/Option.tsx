import { FC } from 'react';
import { Item } from '../list';

type OptionProps = {
  active?: boolean;
  className?: string;
};

export const Option: FC<OptionProps> = ({ children }) => {
  return <Item>{children}</Item>;
};
