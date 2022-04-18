import { ReactElement } from 'react';
import { classNames } from '../utils';

type TextFieldProps = {
  variant?: keyof typeof textFieldClasses;
  color?: keyof typeof textFieldColors;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const textFieldClasses = {
  default: 'bg-white inline-flex justify-center px-4 py-2 rounded-md border border-slate-300',
};

export const textFieldColors = {
  light: 'focus-within:border-slate-300 text-slate-500',
  primary: 'focus-within:border-primary-300 text-primary-300',
};

export default function TextField({
  color = 'light',
  variant = 'default',
  leftIcon,
  rightIcon,
  ...inputProps
}: TextFieldProps) {
  return (
    <div className={classNames(textFieldClasses[variant], textFieldColors[color], inputProps.className)}>
      {leftIcon && <div className='mr-2 -ml-1 h-5 w-5'>{leftIcon}</div>}
      <input {...inputProps} className='appearance-none outline-none flex-1' />
      {rightIcon && <div className='ml-2 -mr-1 h-5 w-5'>{rightIcon}</div>}
    </div>
  );
}
