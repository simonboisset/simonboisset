import { classNames } from './utils';

type TextFieldProps = {
  label: string;
  error?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const TextField = ({ error, label, className, ...inputProps }: TextFieldProps) => {
  return (
    <div className={classNames('flex flex-col space-y-2', className)}>
      <label className='text-blue-500 pl-4'>{label}</label>
      <div
        className={classNames(
          'bg-white inline-flex justify-center px-4 py-2 rounded-xl border border-slate-300 focus-within:border-slate-300 text-slate-500',
        )}>
        <input placeholder={label} {...inputProps} className='appearance-none outline-none flex-1' />
      </div>
      {!!error && <div className='italic text-red-500'>{error}</div>}
    </div>
  );
};
