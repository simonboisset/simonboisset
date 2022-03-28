import { FC, ReactElement } from 'react';

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  className?: string;
  active?: boolean;
};

export const Button: FC<ButtonProps> = ({ children, iconLeft, iconRight, className, active, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className={
        (active ? 'bg-opacity-5' : 'bg-opacity-0') +
        ' flex flex-row space-x-2 items-center bg-gray-400 text-sm bg-opacity-0 rounded-md py-2 hover:bg-opacity-10 active:bg-opacity-5 ' +
        className
      }
      style={{ paddingLeft: iconLeft ? 6 : 12, paddingRight: iconRight ? 6 : 12 }}>
      {iconLeft && <div className='w-4'>{iconLeft}</div>}
      <span className='flex-1 flex'>{children}</span>
      {iconRight && <div className='w-4'>{iconRight}</div>}
    </button>
  );
};
