import { Link as LinkBase } from '@remix-run/react';
import { buttonStyle } from './Button';
import { classNames } from './utils';

type LinkProps = {
  children: string;
  to: string;
  className?: string;
};

export const Link = ({ to, children, className }: LinkProps) => {
  return (
    <LinkBase to={to} className={classNames(buttonStyle, className)}>
      <span>{children}</span>
    </LinkBase>
  );
};
