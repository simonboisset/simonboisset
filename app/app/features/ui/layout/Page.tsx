import { ReactNode } from 'react';

export default function Page({ children }: { children: ReactNode }) {
  return <div className='flex-1 flex flex-col'>{children}</div>;
}
