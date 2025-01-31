import { type FC, useEffect } from 'react';
import { NavLink } from 'react-router';
import { Box, Flex, Avatar, Text } from '@radix-ui/themes';

import { AppRoute } from '~/config/app-route';
import {
   CreateFolderInput,
   FilterList,
   FolderNavigation,
} from '~/features/media/components';
import { useAppDispatch } from '~/hooks/redux';
import {
   fetchFolders,
   fetchItems,
} from '~/features/media/slices/media-data-slice';

const Sidebar: FC = () => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchItems());
      dispatch(fetchFolders());
   }, []);

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

            <Flex direction="column" gapY="4" overflow="auto">
               <Text size="2" weight="medium" className="px-2">
                  Folders
               </Text>
               <FolderNavigation />
               <CreateFolderInput />
            </Flex>

            <Flex direction="column" gapY="4">
               <Text size="2" weight="medium" className="px-2">
                  Filters
               </Text>
               <FilterList />
            </Flex>
         </Flex>
      </Box>
   );
};

export default Sidebar;
