import { type FC, memo, useState } from 'react';
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
   const [isOpen, setIsOpen] = useState(false);

   const handleSelect = (folder: Folder) => {
      setIsOpen(false);
      onSelect(folder);
   };

   return (
      <DropdownMenu.Root open={isOpen}>
         <DropdownMenu.Trigger
            onClick={() => setIsOpen((v) => !v)}
            disabled={disabled}
         >
            <Button>
               {selected?.name ?? '-'}
               <DropdownMenu.TriggerIcon />
            </Button>
         </DropdownMenu.Trigger>
         <DropdownMenu.Content>
            <FolderList onSelect={handleSelect} selected={selected} />
         </DropdownMenu.Content>
      </DropdownMenu.Root>
   );
};

export default memo(FolderSelector);
