import { type FC } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';

import { Folder as FolderIcon } from '~/components/icons';
import type { Folder } from '~/features/media/types/folder';
import { cn } from '~/utils/cn';
import { useDroppable } from '@dnd-kit/core';

export interface FolderItemProps {
   folder: Folder;
   onSelect: (folder: Folder) => void;
   isSelected: boolean;
   droppable?: boolean;
}

const FolderItem: FC<FolderItemProps> = ({
   folder,
   isSelected,
   onSelect,
   droppable = false,
}) => {
   const { isOver, setNodeRef } = useDroppable({
      id: folder.id,
      disabled: !droppable,
   });

   return (
      <div
         ref={setNodeRef}
         className={cn(
            'duration-100 hover:bg-secondary/5 rounded-md overflow-hidden mb-1',
            isSelected && 'bg-secondary/5 hover:bg-secondary/10',
            isOver && 'bg-primary',
         )}
      >
         <Flex
            gapX="2"
            align="center"
            px="2"
            py="1"
            className="cursor-pointer overflow-hidden max-w-full"
            onClick={() => onSelect(folder)}
         >
            <FolderIcon className="flex-shrink-0" />
            <Text className="text-secondary overflow-hidden whitespace-nowrap text-ellipsis flex-grow min-w-0">
               {folder.name}
            </Text>
            <Text className="text-secondary/40">{folder.itemIds.length}</Text>
         </Flex>
      </div>
   );
};

export default FolderItem;
