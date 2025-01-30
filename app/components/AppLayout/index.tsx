import { type FC } from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { Outlet } from 'react-router';

import { Sidebar, Topbar } from '~/components';

const AppLayout: FC = () => {
   return (
      <Flex width="100vw" height="100vh">
         <Box minWidth="232px" maxWidth="232px">
            <Box minWidth="232px" maxWidth="232px" position="fixed">
               <Sidebar />
            </Box>
         </Box>
         <Flex direction="column" flexGrow="1">
            <Topbar />
            <Box flexGrow="1">
               <Outlet />
            </Box>
         </Flex>
      </Flex>
   );
};

export default AppLayout;
