import { Menu, Transition } from '@headlessui/react';
import { Placement } from '@popperjs/core';
import { ReactNode } from 'react';
import { buttonClasses, buttonColors } from '../../input/Button';
import { classNames, usePopper } from '../../utils';

type MenuProps = {
  children: ReactNode;
  placement?: Placement;
  title: string;
};

export default function MenuUi({ children, placement = 'bottom-end', title }: MenuProps) {
  let [trigger, container] = usePopper({
    placement,
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });

  return (
    <Menu>
      <span className='rounded-md'>
        <Menu.Button
          ref={trigger}
          className={classNames(buttonClasses.default, buttonColors.light, 'whitespace-nowrap')}>
          <span>{title}</span>
          <svg className='ml-2 -mr-1 h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </Menu.Button>
      </span>

      <div ref={container} className='sm:w-56 px-4 sm:px-0 w-full rounded-md overflow-hidden'>
        <Transition
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'>
          <Menu.Items className='rounded-md border border-gray-200 bg-white shadow-lg outline-none flex flex-col p-1'>
            {children}
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
}
