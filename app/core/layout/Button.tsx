import { classNames } from './utils';

export const buttonStyle =
  'inline-flex justify-center sm:px-4 px-1 py-2 text-sm bg-blue-500 font-medium rounded-xl bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-5 focus:outline-none';

type ButtonProps = {
  children: string;
  active?: boolean;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({ children, active, className, ...buttonProps }: ButtonProps) => {
  return (
    <button
      {...buttonProps}
      className={classNames(
        'inline-flex justify-center sm:px-4 px-1 py-2 text-transparent bg-clip-text bg-gradient-to-l from-primary-500 hover:to-secondary-500 font-bold rounded-xl bg-opacity-0 focus:outline-none transition-all',
        active ? ' to-secondary-500' : 'to-primary-500',
        className,
      )}>
      <span>{children}</span>
    </button>
  );
};
