import type { ReactNode } from 'react';
import { classNames } from './utils';

type TextProps = {
  children: ReactNode;
  As?: TextElement;
  font?: TextFont;
  color?: TextColor;
  gradient?: boolean;
  className?: string;
};

type TextColor = 'gradient' | 'black' | 'white' | 'primary' | 'secondary' | 'tertiary' | 'inherit';
type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
type TextFont = 'thin' | 'extralight' | 'light' | 'medium' | 'bold' | 'extrabold' | 'black' | 'inherit';

const colors: Record<TextColor, string> = {
  inherit: '',
  black: 'text-black',
  gradient: 'text-transparent bg-clip-text bg-gradient-to-l from-primary-500 to-secondary-500',
  primary: 'text-primary-500',
  secondary: 'text-secondary-500',
  tertiary: 'text-tertiary-500',
  white: 'text-white',
};

const fonts: Record<TextFont, string> = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  medium: 'font-medium',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
  inherit: '',
};

const textSizes: Record<TextElement, string> = {
  h1: 'text-7xl',
  h2: 'text-6xl',
  h3: 'text-4xl',
  h4: 'text-2xl',
  h5: 'text-xl',
  h6: 'text-lg',
  p: '',
  span: '',
  div: '',
};
export const Text = ({ As = 'p', children, font = 'inherit', color = 'inherit', className }: TextProps) => {
  return <As className={classNames(fonts[font], textSizes[As], colors[color], className)}>{children}</As>;
};
