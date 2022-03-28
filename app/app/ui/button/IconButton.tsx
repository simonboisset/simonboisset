import { FC } from 'react';

type IconButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const IconButton: FC<IconButtonProps> = ({ children, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className='w-10 h-10 bg-gray-400 bg-opacity-0 rounded-full p-2 hover:bg-opacity-10 active:bg-opacity-5'>
      {children}
    </button>
  );
};
