import type { FC, PropsWithChildren } from 'react';

import { Sidebar } from '~/components';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
   return (
      <div>
         <Sidebar />
         Layout
         <main>{children}</main>
      </div>
   );
};

export default AppLayout;
