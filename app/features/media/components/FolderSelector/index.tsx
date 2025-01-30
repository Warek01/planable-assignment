import { type FC, memo } from 'react';
import { Box, DropdownMenu, Flex, Text } from '@radix-ui/themes';

import type { Folder } from '~/features/media/types/folder';
import FolderIcon from '~/components/icons/Folder';
import { FolderList } from '~/features/media/components';
import { AppTooltip } from '~/components';

export interface FolderSelectorProps {
   disabled?: boolean;
   selected: Folder | undefined;
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
   return (
      <DropdownMenu.Root>
         <AppTooltip content={tooltip}>
            <DropdownMenu.Trigger disabled={disabled}>
               <button
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
                  <DropdownMenu.TriggerIcon />
               </button>
            </DropdownMenu.Trigger>
         </AppTooltip>
         <DropdownMenu.Content className="!rounded-lg">
            <Box
               style={{
                  width: `calc(${width} - 18px)`,
                  maxWidth: `calc(${width} - 18px)`,
               }}
            >
               <FolderList onSelect={onSelect} selected={selected} />
            </Box>
         </DropdownMenu.Content>
      </DropdownMenu.Root>
   );
};

export default memo(FolderSelector);
