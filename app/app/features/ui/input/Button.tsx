import { ReactElement } from 'react';
import { classNames } from '../utils';

type ButtonProps = {
  children: string;
  variant?: keyof typeof buttonClasses;
  color?: keyof typeof buttonColors;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  active?: boolean;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const buttonClasses = {
  default:
    'inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-5 focus:outline-none',
  active:
    'inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md bg-opacity-10 hover:bg-opacity-10 active:bg-opacity-5 focus:outline-none',
};

export const buttonColors = {
  light: 'text-white bg-white',
  dark: 'text-black bg-black',
};

export default function Button({
  children,
  color = 'dark',
  variant = 'default',
  leftIcon,
  rightIcon,
  active,
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      className={classNames(buttonClasses[active ? 'active' : variant], buttonColors[color], className)}>
      {leftIcon && <div className='mr-2 -ml-1 h-5 w-5'>{leftIcon}</div>}
      <span>{children}</span>
      {rightIcon && <div className='ml-2 -mr-1 h-5 w-5'>{rightIcon}</div>}
    </button>
  );
}
