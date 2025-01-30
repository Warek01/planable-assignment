import { type FC, memo } from 'react';
import { Button, DropdownMenu } from '@radix-ui/themes';

import type { Folder } from '~/features/media/types/folder';
import { FolderList } from '~/features/media/components';

export interface FolderSelectorProps {
   disabled: boolean;
   selected: Folder | undefined;
   onSelect: (folder: Folder) => void;
}

const FolderSelector: FC<FolderSelectorProps> = ({
   selected,
   disabled,
   onSelect,
}) => {
   return (
      <DropdownMenu.Root>
         <DropdownMenu.Trigger disabled={disabled}>
            <Button>
               {selected?.name ?? '-'}
               <DropdownMenu.TriggerIcon />
            </Button>
         </DropdownMenu.Trigger>
         <DropdownMenu.Content>
            <FolderList onSelect={onSelect} selected={selected} />
         </DropdownMenu.Content>
      </DropdownMenu.Root>
   );
};

export default memo(FolderSelector);
