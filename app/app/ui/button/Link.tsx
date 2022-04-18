import { FC, ReactElement } from 'react';
import { Link as RemixLink } from 'remix';
export type LinkProps = {
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  className?: string;
  active?: boolean;
  href?: string;
};

export const Link: FC<LinkProps> = ({ children, iconLeft, iconRight, className, active, href }) => {
  return (
    <RemixLink
      to={href || '.'}
      className={
        (active ? 'bg-opacity-5' : 'bg-opacity-0') +
        ' flex flex-row space-x-2 items-center bg-gray-400 text-sm bg-opacity-0 rounded-lg py-2 hover:bg-opacity-10 active:bg-opacity-5 cursor-pointer ' +
        className
      }
      style={{ paddingLeft: iconLeft ? 8 : 16, paddingRight: iconRight ? 8 : 16 }}>
      {iconLeft && <div className='w-4'>{iconLeft}</div>}
      <span className='flex-1 flex'>{children}</span>
      {iconRight && <div className='w-4'>{iconRight}</div>}
    </RemixLink>
  );
};
