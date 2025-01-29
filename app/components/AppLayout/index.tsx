import { type FC, type PropsWithChildren, useEffect } from 'react';
import { Box } from '@radix-ui/themes';
import { Outlet, useLocation, useParams } from 'react-router';

import { Sidebar, Topbar } from '~/components';
import { useAppDispatch } from '~/hooks/redux';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
   // const location = useLocation();
   // const dispatch = useAppDispatch();
   // const params = useParams();
   //
   // useEffect(() => {
   //    console.log(location, params);
   // }, [location]);

   return (
      <Box>
         <Box maxWidth="232px">
            <Sidebar />
         </Box>
         <Box>
            <Box>
               <Topbar />
            </Box>
            <Box height="300px" width="500px">
               <Outlet />
            </Box>
         </Box>
      </Box>
   );
};

export default AppLayout;
