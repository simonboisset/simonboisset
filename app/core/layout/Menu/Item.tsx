import { Menu } from '@headlessui/react';
import type { ReactNode } from 'react';
import { classNames } from '../utils';

function resolveClass({ active, disabled }: { active: boolean; disabled: boolean }) {
  return classNames(
    'flex justify-between w-full px-4 py-2 text-sm leading-5 text-left rounded-md',
    active ? 'text-transparent bg-clip-text bg-gradient-to-l from-primary-500 to-secondary-500' : 'text-white',
    disabled && 'cursor-not-allowed opacity-50',
  );
}

type ItemProps = {
  children: ReactNode;
  href: string;
};

export default function Item({ children, href, ...menuProps }: ItemProps) {
  return (
    <Menu.Item {...menuProps} as='a' href={href} className={resolveClass}>
      {children}
    </Menu.Item>
  );
}
