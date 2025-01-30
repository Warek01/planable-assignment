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
import { AppTooltip } from '~/components';

export interface ItemNameProps {
   item: MediaItem;
   isSelected: boolean;
}

const ItemName: FC<ItemNameProps> = ({ item, isSelected }) => {
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
            <input
               value={newName}
               onKeyUp={handleRenameKeyUp}
               onChange={handleRenameChange}
               className="text-center text-xs outline-none focus-within:outline-none max-w-full text-ellipsis
               whitespace-nowrap overflow-hidden text-secondary/80 rounded-xs hover:bg-secondary/5
               duration-100 w-[112px] p-1.5 focus-within:bg-secondary/5"
               ref={renameInputRef}
               onBlur={handleRenameBlur}
            />
         ) : (
            <AppTooltip content={item.name}>
               <Text
                  size="1"
                  onClick={handleNameClick}
                  className="max-w-full text-ellipsis whitespace-nowrap overflow-hidden text-secondary/80 rounded-xs
                  hover:bg-secondary/5 duration-100 min-w-[112px] text-center p-1.5"
               >
                  {item.name}
               </Text>
            </AppTooltip>
         )}
      </Flex>
   );
};

export default memo(ItemName);
