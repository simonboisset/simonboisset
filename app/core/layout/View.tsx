import { Transition } from '@headlessui/react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
type ViewProps = {
  children: ReactNode;
  isFirstRender: boolean;
};
export const View = ({ children, isFirstRender }: ViewProps) => {
  const [show, setShow] = useState(isFirstRender);
  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  }, []);
  return (
    <Transition
      show={show}
      enter='transition duration-500 ease-out'
      enterFrom='transform translate-y-5 opacity-0'
      enterTo='transform translate-y-0 opacity-100'
      leave='transition duration-500 ease-out'
      leaveFrom='transform opacity-100'
      leaveTo='transform opacity-0'>
      {children}
    </Transition>
  );
};
