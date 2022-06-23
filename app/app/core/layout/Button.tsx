import { classNames } from './utils';

export const buttonStyle =
  'inline-flex justify-center px-4 py-2 text-sm bg-blue-500 font-medium rounded-xl bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-5 focus:outline-none';

type ButtonProps = {
  children: string;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({ children, className, ...buttonProps }: ButtonProps) => {
  return (
    <button {...buttonProps} className={classNames(buttonStyle, className)}>
      <span>{children}</span>
    </button>
  );
};
