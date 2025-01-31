import { type FC, memo } from 'react';
import { Box, Flex } from '@radix-ui/themes';

import { useAppSelector } from '~/hooks/redux';
import { selectFolders } from '~/features/media/slices/media-data-slice';
import type { Folder } from '~/features/media/types/folder';

import FolderItem from './FolderItem';

export interface FolderListProps {
   onSelect: (folder: Folder) => void;
   selected?: Folder;
   droppable?: boolean;
}

const FolderList: FC<FolderListProps> = ({
   onSelect,
   selected,
   droppable = false,
}) => {
   const folders = useAppSelector(selectFolders);

   return (
      <Box overflow="auto" className="hide-overflow-on-dnd">
         {folders.map((folder) => (
            <FolderItem
               droppable={droppable}
               onSelect={onSelect}
               isSelected={folder.id === selected?.id}
               folder={folder}
               key={folder.id}
            />
         ))}
      </Box>
   );
};

export default memo(FolderList);
