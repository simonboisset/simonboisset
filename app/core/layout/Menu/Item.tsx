import { Menu } from '@headlessui/react';
import { Link } from '@remix-run/react';
import type { ReactNode } from 'react';
import { classNames } from '../utils';

function resolveClass({ active, disabled }: { active: boolean; disabled: boolean }) {
  return classNames(
    'flex w-full px-4 py-2 text-sm leading-5 text-left rounded-md',
    active ? 'text-secondary-500' : 'text-white',
    disabled && 'cursor-not-allowed opacity-50',
  );
}

type ItemProps = {
  children: ReactNode;
  href: string;
};

export default function Item({ children, href, ...menuProps }: ItemProps) {
  return (
    <Menu.Item {...menuProps} as={Link} to={href} className={resolveClass}>
      {children}
    </Menu.Item>
  );
}
