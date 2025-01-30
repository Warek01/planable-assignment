import { type FC } from 'react';
import { NavLink } from 'react-router';
import { Box, Flex, Avatar, Text, ScrollArea } from '@radix-ui/themes';

import { AppRoute } from '~/config/app-route';
import {
   CreateFolderInput,
   FilterList,
   FolderNavigation,
} from '~/features/media/components';

const Sidebar: FC = () => {
   return (
      <Box pt="4" pb="8" pr="2" pl="4" height="100vh" maxHeight="100vh">
         <Flex height="100%" direction="column" gapY="8">
            <NavLink to={AppRoute.HOME}>
               <Flex gapX="2" align="center">
                  <Avatar fallback="M" src="/icon.png" size="2" />
                  <Text size="3" weight="regular">
                     Media gallery
                  </Text>
               </Flex>
            </NavLink>

            <Flex direction="column" overflowY="auto" gapY="2">
               <Box overflowY="auto" flexGrow="1">
                  <ScrollArea type="hover">
                     <Text size="2" weight="medium" className="px-1">
                        Folders
                     </Text>
                     <FolderNavigation />
                  </ScrollArea>
               </Box>
               <CreateFolderInput />
            </Flex>

            <Box>
               <Text size="2" weight="medium" className="px-1">
                  Filters
               </Text>
               <FilterList />
            </Box>
         </Flex>
      </Box>
   );
};

export default Sidebar;
