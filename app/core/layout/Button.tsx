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
        'inline-flex justify-center sm:px-4 px-1 py-2 text-primary-500 font-bold rounded-xl focus:outline-none transition-all',

        className,
      )}>
      <span>{children}</span>
    </button>
  );
};
