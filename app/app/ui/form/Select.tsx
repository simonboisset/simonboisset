import { FC, useRef, useState } from 'react';
import { ArrowDown } from '../icon';
import { Menu } from '../modal';

type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

export const Select: FC<SelectProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const focusIndex = useRef(0)
  
  return (
    <Menu
      Label={
        <div
          ref={ref}
          tabIndex={0}
          className='border rounded-md text-sm p-2 border-slate-400 text-slate-500 bg-white cursor-pointer flex flex-row space-x-2 justify-between items-center'
          onClick={() => {
            setOpen(true);
          }}
          onKeyDown={(e) => {
            console.log(e.key);

            if (e.key === 'Enter' || e.key === 'ArrowDown') {
              setOpen(true);
            }
            if (e.key === 'Escape') {
              setOpen(false);
              e.currentTarget.blur();
            }
          }}>
          <span>Label</span>
          <div className='w-4'>
            <ArrowDown />
          </div>
        </div>
      }
      open={open}
      onClose={() => setOpen(false)}
      position='bottom'
      direction='left'
      trigger='click'>
      {children}
    </Menu>
  );
};
