import { type FC, useMemo, useState } from 'react';
import { Box, Text } from '@radix-ui/themes';

import type { MediaItem } from '~/features/media/types/media-item';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import {
   addItemToSelection,
   removeItemFromSelection,
   selectSelectedItemIds,
} from '~/features/media/slices/media-ui-state-slice';
import { cn } from '~/utils/cn';
import { Expand } from '~/components/icons';

import ItemThumbnail from './ItemThumbnail';
import ItemName from './ItemName';
import BackdropMediaPlayer from '~/features/media/components/BackdropMediaPlayer';

export interface MediaGridItemProps {
   item: MediaItem;
}

const MediaGridItem: FC<MediaGridItemProps> = ({ item }) => {
   const dispatch = useAppDispatch();
   const selectedItemIds = useAppSelector(selectSelectedItemIds);
   const [expanded, setExpanded] = useState(false);

   // The order in which the item was selected
   const selectOrder = useMemo(
      () =>
         selectedItemIds.findIndex(
            (selectedItemId) => selectedItemId === item.id,
         ),
      [selectedItemIds, item.id],
   );

   const isSelected = selectOrder !== -1;

   const handleExpand = () => {
      setExpanded(true);
   };

   const handleSelection = () => {
      const action =
         selectOrder === -1
            ? addItemToSelection({ itemId: item.id })
            : removeItemFromSelection({ itemId: item.id });
      dispatch(action);
   };

   const expandElement = useMemo(
      () => (
         <div
            className="absolute opacity-0 group-hover:opacity-100 duration-100 left-1 top-1 cursor-pointer w-4 h-4
            flex items-center justify-center"
            onClick={handleExpand}
         >
            <Expand />
         </div>
      ),
      [],
   );

   const selectBoxElement = useMemo(
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
            <ItemThumbnail item={item} isSelected={isSelected} />
            {expandElement}
            {selectBoxElement}
            {expanded && (
               <BackdropMediaPlayer
                  item={item}
                  onClose={() => setExpanded(false)}
               />
            )}
         </Box>
         <ItemName item={item} isSelected={isSelected} />
      </Box>
   );
};

export default MediaGridItem;
