import { Link as LinkBase } from '@remix-run/react';
import { classNames } from './utils';

type LinkProps = {
  children: string;
  to: string;
  active?: boolean;
  className?: string;
};

export const Link = ({ to, children, active, className }: LinkProps) => {
  return (
    <LinkBase
      to={to}
      className={classNames(
        classNames(
          'inline-flex justify-center sm:px-4 px-1 py-2 text-primary-500 hover:to-secondary-500 font-bold rounded-xl focus:outline-none',
          className,
        ),
      )}>
      <span>{children}</span>
    </LinkBase>
  );
};
