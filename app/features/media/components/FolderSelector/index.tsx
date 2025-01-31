import { type FC, memo } from 'react';
import { Flex, Select, Text } from '@radix-ui/themes';

import type { Folder } from '~/features/media/types/folder';
import FolderIcon from '~/components/icons/Folder';
import { AppTooltip } from '~/components';
import { useAppSelector } from '~/hooks/redux';
import { selectFolders } from '~/features/media/slices/media-data-slice';

export interface FolderSelectorProps {
   disabled?: boolean;
   selected: Folder;
   onSelect: (folder: Folder) => void;
   tooltip?: string;
   width?: string;
}

const FolderSelector: FC<FolderSelectorProps> = ({
   selected,
   disabled,
   onSelect,
   tooltip,
   width = '150px',
}) => {
   const folders = useAppSelector(selectFolders);

   return (
      <Select.Root
         value={selected.id}
         onValueChange={(v) => onSelect(folders.find((f) => f.id === v)!)}
      >
         <AppTooltip content={tooltip}>
            <Select.Trigger
               disabled={disabled}
               style={{ width }}
               className="bg-transparent px-3 py-1 rounded-md text-secondary border border-secondary/10 flex items-center
                  justify-between cursor-pointer hover:border-secondary/20 duration-100 box-border"
            >
               <Flex align="center" gap="2">
                  <FolderIcon />
                  <Text className="!leading-[22px]">
                     {selected?.name ?? '-'}
                  </Text>
               </Flex>
            </Select.Trigger>
         </AppTooltip>
         <Select.Content position="item-aligned">
            {folders.map((folder) => (
               <Select.Item value={folder.id} key={folder.id}>
                  <Flex align="center" justify="start" gap="1">
                     <FolderIcon />
                     <Text className="text-ellipsis whitespace-nowrap overflow-hidden max-w-[150px]">
                        {folder.name}
                     </Text>
                  </Flex>
               </Select.Item>
            ))}
         </Select.Content>
      </Select.Root>
   );
};

export default memo(FolderSelector);
