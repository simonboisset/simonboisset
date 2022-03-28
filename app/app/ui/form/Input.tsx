import { FC } from 'react';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input: FC<InputProps> = ({ ...inputProps }) => {
  return (
    <input {...inputProps} className='border rounded-md text-sm p-2 border-slate-400 text-slate-500 outline-none' />
  );
};
