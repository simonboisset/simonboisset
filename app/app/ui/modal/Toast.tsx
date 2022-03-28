import { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type ToastProps = {
  open?: boolean;
  onClose?: () => void;

  className?: string;
};

export const Toast: FC<ToastProps> = ({
  children,
  className,
  open,

  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHiden] = useState(true);
  const [display, setDisplay] = useState(false);
  const element = useRef(document.createElement('div'));
  useEffect(() => {
    const handler = (event: any) => {
      if (open && onClose && (!ref.current || !event.target || !ref.current.contains(event.target))) {
        onClose();
      }
    };
    addEventListener('click', handler);
    return () => removeEventListener('click', handler);
  }, [open]);

  useEffect(() => {
    const modalRoot = document.getElementById('main-body');
    modalRoot?.appendChild(element.current);
    return () => {
      modalRoot?.removeChild(element.current);
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined;
    if (open) {
      setHiden(false);
      timeout = setTimeout(() => {
        setDisplay(true);
      }, 20);
    }
    if (!open) {
      setDisplay(false);
      timeout = setTimeout(() => {
        setHiden(true);
      }, 150);
    }
    return () => timeout && clearTimeout(timeout);
  }, [open]);

  if (hidden) {
    return null;
  }

  return createPortal(
    <div
      className={
        'transition-all absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-slate-700' +
        (display ? ' bg-opacity-10' : ' bg-opacity-0')
      }>
      <div
        ref={ref}
        className={
          (className || '') +
          ' transition-all p-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none' +
          (!display && ' translate-y-5 scale-50 opacity-0')
        }>
        {children}
      </div>
    </div>,
    element.current,
  );
};
