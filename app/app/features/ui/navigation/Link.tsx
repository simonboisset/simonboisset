import { Link } from '@remix-run/react';
import { ReactElement } from 'react';
import { buttonClasses, buttonColors } from '../input/Button';
import { classNames } from '../utils';

type LinkProps = {
  children: string;
  variant?: keyof typeof buttonClasses;
  color?: keyof typeof buttonColors;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  to: string;
  active?: boolean;
  className?: string;
};

export default function LinkUi({
  to,
  children,
  color = 'dark',
  variant = 'default',
  leftIcon,
  rightIcon,
  active,
  className,
}: LinkProps) {
  return (
    <Link to={to} className={classNames(buttonClasses[active ? 'active' : variant], buttonColors[color], className)}>
      {leftIcon && <div className='mr-2 -ml-1 h-5 w-5'>{leftIcon}</div>}
      <span>{children}</span>
      {rightIcon && <div className='ml-2 -mr-1 h-5 w-5'>{rightIcon}</div>}
    </Link>
  );
}
