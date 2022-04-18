import { FC, useRef } from 'react';
import { Check } from '../icon';

type CheckboxProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Checkbox: FC<CheckboxProps> = ({ children, ...checkboxProps }) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleLabelClick = () => {
    ref.current?.click();
  };
  return (
    <div className='flex felx-row space-x-2 items-center cursor-pointer' onClick={handleLabelClick}>
      <input
        ref={ref}
        {...checkboxProps}
        type='checkbox'
        className='appearance-none bg-white rounded-sm h-3 w-3 checked:bg-blue-500'
      />
      <div className='w-3 absolute -translate-x-2 text-white'>
        <Check />
      </div>
      <label>{children}</label>
    </div>
  );
};
