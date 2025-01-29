import { type FC } from 'react';
import { NavLink } from 'react-router';
import { Box, Flex, Avatar, Text } from '@radix-ui/themes';

import { AppRoute } from '~/config/app-route';
import { CreateFolderInput } from '~/features/media/components';

import FoldersList from './FoldersList';
import FilterList from './FilterList';

const Sidebar: FC = () => {
   return (
      <Box width="100%" py="4" pr="2" pl="4">
         <Flex direction="column" gapY="8">
            <NavLink to={AppRoute.HOME}>
               <Flex gapX="2">
                  <Avatar fallback="M" src="/icon.png" size="2" />
                  <Text size="3" weight="regular">
                     Media gallery
                  </Text>
               </Flex>
            </NavLink>

            <Box>
               <Text size="2" weight="medium" className="px-1">
                  Folders
               </Text>
               <FoldersList />
               <CreateFolderInput />
            </Box>

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
