import { Outlet, useOutletContext } from '@remix-run/react';
import { View } from '~/core/layout';
import type { RootContext } from '~/root';

export default function Docs() {
  const { isFirstRender } = useOutletContext<RootContext>();
  return (
    <View isFirstRender={isFirstRender}>
      <div className='prose mx-auto my-44 prose-headings:text-primary-500 prose-p:text-white prose-li:text-white prose-p:text-justify prose-a:underline prose-a:font-bold prose-a:text-white'>
        <Outlet />
      </div>
    </View>
  );
}
