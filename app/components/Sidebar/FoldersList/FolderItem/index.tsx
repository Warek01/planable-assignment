import { type FC, useMemo } from 'react';
import { generatePath, NavLink } from 'react-router';
import { Flex, Text } from '@radix-ui/themes';

import { Folder as FolderIcon } from '~/components/icons';
import { AppRoute } from '~/config/app-route';
import type { Folder } from '~/features/media/types/folder';
import { cn } from '~/utils/cn';

export interface FolderItemProps {
   folder: Folder;
}

const FolderItem: FC<FolderItemProps> = ({ folder }) => {
   const url = useMemo<string>(
      () => generatePath(AppRoute.FOLDER, { folderId: folder.id }),
      [folder],
   );

   return (
      <NavLink
         to={url}
         className={({ isActive }) => cn(isActive ? 'bg-gray-400' : '')}
      >
         <Flex gapX="2" align="center">
            <FolderIcon />
            <Text>{folder.name}</Text>
            <Text>{folder.itemIds.length}</Text>
         </Flex>
      </NavLink>
   );
};

export default FolderItem;
