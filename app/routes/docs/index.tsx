import { Outlet, useOutletContext } from '@remix-run/react';
import { View } from '~/core/layout';
import type { RootContext } from '~/root';
export default function Docs() {
  const { isFirstRender } = useOutletContext<RootContext>();
  return (
    <View isFirstRender={isFirstRender}>
      <div className='prose mx-auto my-44 prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-l prose-headings:from-primary-500 prose-headings:to-secondary-500 prose-p:text-white prose-li:text-white prose-p:text-justify prose-a:underline prose-a:font-bold prose-a:text-white'>
        <Outlet />
      </div>
    </View>
  );
}
