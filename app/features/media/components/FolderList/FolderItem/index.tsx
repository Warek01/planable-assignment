import { type FC } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';

import { Folder as FolderIcon } from '~/components/icons';
import type { Folder } from '~/features/media/types/folder';
import { cn } from '~/utils/cn';

export interface FolderItemProps {
   folder: Folder;
   onSelect: (folder: Folder) => void;
   isSelected: boolean;
}

const FolderItem: FC<FolderItemProps> = ({ folder, isSelected, onSelect }) => {
   return (
      <Box className={cn(isSelected && 'bg-gray-300')}>
         <Flex
            gapX="2"
            align="center"
            className="cursor-pointer"
            onClick={() => onSelect(folder)}
         >
            <FolderIcon />
            <Text>{folder.name}</Text>
            <Text>{folder.itemIds.length}</Text>
         </Flex>
      </Box>
   );
};

export default FolderItem;
