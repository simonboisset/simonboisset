import { FC, useRef } from 'react';

type RadioProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export const Radio: FC<RadioProps> = ({ children, ...inputProps }) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleLabelClick = () => {
    ref.current?.click();
  };
  return (
    <div className='flex felx-row space-x-2 items-center'>
      <div className='h-3 w-3 flex justify-center items-center'>
        <input
          ref={ref}
          {...inputProps}
          type='radio'
          className='appearance-none bg-white w-1.5 h-1.5 rounded-full transition-all ring-2 ring-slate-500 ring-opacity-20 checked:ring-blue-500 checked:ring-opacity-20 checked:bg-blue-500'
        />
      </div>
      <label onClick={handleLabelClick}>{children}</label>
    </div>
  );
};
