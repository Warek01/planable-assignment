import { type FC, useMemo } from 'react';
import { Flex, Grid } from '@radix-ui/themes';

import { useAppSelector } from '~/hooks/redux';
import type { Folder } from '~/features/media/types/folder';
import type { MediaItem } from '~/features/media/types/media-item';
import { selectActiveFilters } from '~/features/media/slices/media-ui-state-slice';
import { selectItems } from '~/features/media/slices/media-data-slice';

import MediaGridItem from './MediaGridItem';

export interface MediaItemsGridProps {
   folder: Folder;
}

const MediaGrid: FC<MediaItemsGridProps> = ({ folder }) => {
   const allItems = useAppSelector(selectItems);
   const activeFilters = useAppSelector(selectActiveFilters);

   const filteredItems = useMemo<MediaItem[]>(
      () =>
         allItems.filter(
            (item) =>
               folder.itemIds.includes(item.id) &&
               activeFilters.includes(item.type),
         ),
      [allItems, activeFilters, folder],
   );

   return (
      <Grid
         columns={{ sm: '3', md: '4', lg: '5', xl: '6' }}
         gap="4"
         p="2"
         align="center"
         justify="center"
      >
         {filteredItems.map((item) => (
            <Flex justify="center" p="1" key={item.id}>
               <MediaGridItem item={item} />
            </Flex>
         ))}
      </Grid>
   );
};

export default MediaGrid;
