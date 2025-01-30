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

   const handleSelection = () => {
      const action =
         selectOrder === -1
            ? addItemToSelection({ itemId: item.id })
            : removeItemFromSelection({ itemId: item.id });
      dispatch(action);
   };

   return (
      <Box width="100%">
         <ItemThumbnail src={item.thumbnailUrl} />
         <ItemName item={item} />
         <Text onClick={handleSelection}>{selectOrder}</Text>
      </Box>
   );
};

export default MediaGridItem;
