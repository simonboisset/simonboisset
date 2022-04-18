import { FC, ReactElement, useEffect, useRef, useState } from 'react';

type MenuProps = {
  Label: ReactElement;
  open?: boolean;
  onClose?: () => void;
  position?: 'top' | 'bottom' | 'left' | 'right';
  direction?: 'top' | 'bottom' | 'left' | 'right'; //| 'center';
  trigger?: 'hover' | 'click';
  popperClassName?: string;
};

export const Menu: FC<MenuProps> = ({
  popperClassName,
  children,
  Label,
  open,
  position = 'bottom',
  direction = 'right',
  onClose,
  trigger = 'click',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [hidden, setHiden] = useState(true);
  const [display, setDisplay] = useState(false);
  const prevHover = useRef(false);
  const hoverTimeout = useRef<NodeJS.Timeout>();
  const shoudDisplay = (trigger === 'hover' && hover) || (trigger === 'click' && open);

  useEffect(() => {
    if (trigger === 'click') {
      const handler = (event: any) => {
        if (onClose && (!ref.current || !event.target || !ref.current.contains(event.target))) {
          onClose();
        }
      };
      addEventListener('click', handler);
      return () => removeEventListener('click', handler);
    }
    return;
  }, [trigger]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined;
    if (shoudDisplay && hidden) {
      setHiden(false);
      timeout = setTimeout(() => {
        setDisplay(true);
      }, 20);
    }
    if (!shoudDisplay && !hidden) {
      setDisplay(false);
      timeout = setTimeout(() => {
        setHiden(true);
      }, 150);
    }
    return () => timeout && clearTimeout(timeout);
  }, [hover, open]);

  useEffect(() => {
    return () => hoverTimeout.current && clearTimeout(hoverTimeout.current);
  }, []);

  const handlHover = () => {
    if (trigger === 'hover') {
      hoverTimeout.current && clearTimeout(hoverTimeout.current);
      prevHover.current = true;
      setHover(true);
    }
  };
  const handlLeave = () => {
    if (trigger === 'hover') {
      hoverTimeout.current && clearTimeout(hoverTimeout.current);
      prevHover.current = false;
      hoverTimeout.current = setTimeout(() => {
        if (!prevHover.current) {
          setHover(false);
        }
      }, 200);
    }
  };

  return (
    <div
      ref={ref}
      className={'relative' + (position === 'bottom' || position === 'top' ? ' inline-block' : ' inline')}
      onMouseEnter={handlHover}
      onMouseLeave={handlLeave}>
      {Label}
      {!hidden && (
        <div
          className={
            (popperClassName || '') +
            ' transition-all absolute p-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none' +
            (((!open && trigger == 'click') || (!hover && trigger === 'hover') || !display) && ' scale-95 opacity-0') +
            (position === 'bottom' ? ' mt-2' + (open || trigger === 'hover' ? '' : ' translate-y-2') : '') +
            (position === 'top' ? ' bottom-full mb-2' + (open || trigger === 'hover' ? '' : ' -translate-y-2') : '') +
            (direction === 'right' ? ' left-0' : '') +
            (direction === 'left' ? ' right-0' : '') +
            (position === 'left' ? ' right-full mr-2' + (open || trigger === 'hover' ? '' : ' -translate-x-2') : '') +
            (position === 'right' ? ' left-full ml-2' + (open || trigger === 'hover' ? '' : ' translate-x-2') : '') +
            (direction === 'top' ? ' bottom-0' : '') +
            (direction === 'bottom' ? ' top-0' : '')
          }>
          {children}
        </div>
      )}
    </div>
  );
};
