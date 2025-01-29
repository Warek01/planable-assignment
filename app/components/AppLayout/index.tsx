import { type FC, type PropsWithChildren } from 'react';
import { Box, Flex, ScrollArea } from '@radix-ui/themes';
import { Outlet } from 'react-router';

import { Sidebar, Topbar } from '~/components';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
   return (
      <Flex width="100vw" height="100vh">
         <Box minWidth="232px" maxWidth="232px" position="relative">
            <Sidebar />
         </Box>
         <Flex direction="column" flexGrow="1">
            <Topbar />
            <Box overflowY="auto" flexGrow="1">
               <ScrollArea>
                  <Outlet />
               </ScrollArea>
            </Box>
         </Flex>
      </Flex>
   );
};

export default AppLayout;
