import { FC } from 'react';

type SwitchProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export const Switch: FC<SwitchProps> = ({ ...switchProps }) => {
  return <input type='checkbox' {...switchProps} />;
};
