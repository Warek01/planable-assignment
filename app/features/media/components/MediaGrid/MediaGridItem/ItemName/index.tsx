import {
   type ChangeEventHandler,
   type FC,
   type KeyboardEventHandler,
   memo,
   useEffect,
   useRef,
   useState,
} from 'react';
import { Flex, Text, TextField } from '@radix-ui/themes';

import type { MediaItem } from '~/features/media/types/media-item';
import { renameItem } from '~/features/media/slices/media-data-slice';
import { useAppDispatch } from '~/hooks/redux';

export interface ItemNameProps {
   item: MediaItem;
}

const ItemName: FC<ItemNameProps> = ({ item }) => {
   const dispatch = useAppDispatch();
   const [isRenaming, setIsRenaming] = useState(false);
   const [newName, setNewName] = useState('');
   const renameInputRef = useRef<HTMLInputElement>(null);

   const cancelRenaming = () => {
      setIsRenaming(false);
   };

   const applyRenaming = () => {
      setIsRenaming(false);

      if (!newName) {
         return;
      }

      dispatch(renameItem({ newName, itemId: item.id }));
   };

   const handleNameClick = () => {
      setIsRenaming(true);
      setNewName(item.name);
   };

   const handleRenameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setNewName(event.target.value);
   };

   const handleRenameBlur = () => {
      applyRenaming();
   };

   const handleRenameKeyUp: KeyboardEventHandler<HTMLInputElement> = (
      event,
   ) => {
      switch (event.key) {
         case 'Enter':
            applyRenaming();
            break;
         case 'Escape':
            cancelRenaming();
            break;
      }
   };

   useEffect(() => {
      if (isRenaming) {
         renameInputRef.current?.focus();
      }
   }, [isRenaming]);

   return (
      <Flex justify="center">
         {isRenaming ? (
            <TextField.Root
               value={newName}
               onKeyUp={handleRenameKeyUp}
               onChange={handleRenameChange}
               style={{ textAlign: 'center' }}
               ref={renameInputRef}
               onBlur={handleRenameBlur}
            />
         ) : (
            <Text
               onClick={handleNameClick}
               className="max-w-full text-ellipsis whitespace-nowrap overflow-hidden"
            >
               {item.name}
            </Text>
         )}
      </Flex>
   );
};

export default memo(ItemName);
