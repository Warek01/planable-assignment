import { type FC, useMemo } from 'react';
import { Box, Text } from '@radix-ui/themes';

import type { MediaItem } from '~/features/media/types/media-item';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import {
   addItemToSelection,
   removeItemFromSelection,
   selectSelectedItemIds,
} from '~/features/media/slices/media-ui-state-slice';

import ItemThumbnail from './ItemThumbnail';
import ItemName from './ItemName';
import { cn } from '~/utils/cn';

export interface MediaGridItemProps {
   item: MediaItem;
}

const MediaGridItem: FC<MediaGridItemProps> = ({ item }) => {
   const dispatch = useAppDispatch();
   const selectedItemIds = useAppSelector(selectSelectedItemIds);

   // The order in which the item was selected
   const selectOrder = useMemo(
      () =>
         selectedItemIds.findIndex(
            (selectedItemId) => selectedItemId === item.id,
         ),
      [selectedItemIds, item.id],
   );

   const isSelected = selectOrder !== -1;

   const handleSelection = () => {
      const action =
         selectOrder === -1
            ? addItemToSelection({ itemId: item.id })
            : removeItemFromSelection({ itemId: item.id });
      dispatch(action);
   };

   const selectBox = useMemo(
      () => (
         <div
            className={cn(
               'absolute left-1 bottom-1 cursor-pointer w-5 h-5 rounded-md flex items-center justify-center',
               'transition-[background] duration-100',
               isSelected
                  ? 'border-primary bg-primary'
                  : 'group-hover:border-[1.5px] group-hover:border-white',
            )}
            onClick={handleSelection}
         >
            <Text size="1" className="text-white">
               {isSelected ? selectOrder + 1 : ''}
            </Text>
         </div>
      ),
      [isSelected, selectOrder],
   );

   return (
      <Box width="100%">
         <Box position="relative" className="group">
            <ItemThumbnail src={item.thumbnailUrl} isSelected={isSelected} />
            {selectBox}
         </Box>
         <ItemName item={item} isSelected={isSelected} />
      </Box>
   );
};

export default MediaGridItem;
