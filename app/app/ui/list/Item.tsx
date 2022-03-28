import { FC } from 'react';
import { Button, ButtonProps } from '../button';

type ItemProps = ButtonProps;
export const Item: FC<ItemProps> = ({ children, className, iconLeft, iconRight, active, ...buttonProps }) => {
  return (
    <li className={'flex-1 flex ' + className}>
      <Button {...buttonProps} className='flex-1' iconLeft={iconLeft} iconRight={iconRight} active={active}>
        {children}
      </Button>
    </li>
  );
};
