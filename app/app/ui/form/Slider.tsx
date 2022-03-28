import { FC } from 'react';

type SliderProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export const Slider: FC<SliderProps> = ({ ...sliderProps }) => {
  return (
    <input
      type='range'
      {...sliderProps}
      className='appearance-none h-1 rounded-full flex items-stretch justify-items-stretch bg-blue-400'
    />
  );
};
