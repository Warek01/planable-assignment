import { type FC, memo } from 'react';
import { Flex } from '@radix-ui/themes';

import { useAppSelector } from '~/hooks/redux';
import { selectFolders } from '~/features/media/slices/media-data-slice';
import type { Folder } from '~/features/media/types/folder';

import FolderItem from './FolderItem';

export interface FolderListProps {
   onSelect: (folder: Folder) => void;
   selected?: Folder;
}

const FolderList: FC<FolderListProps> = ({ onSelect, selected }) => {
   const folders = useAppSelector(selectFolders);

   return (
      <Flex direction="column" gapY="1" overflow="hidden">
         {folders.map((folder) => (
            <FolderItem
               onSelect={onSelect}
               isSelected={folder === selected}
               folder={folder}
               key={folder.name}
            />
         ))}
      </Flex>
   );
};

export default memo(FolderList);
