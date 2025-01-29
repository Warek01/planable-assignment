import { type FC, useMemo } from 'react';
import { Grid } from '@radix-ui/themes';

import { useAppSelector } from '~/hooks/redux';
import type { Folder } from '~/features/media/types/folder';
import { selectActiveFilters, selectItems } from '~/features/media/slice';
import type { MediaItem } from '~/features/media/types/media-item';

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
      <Grid>
         {filteredItems.map((item) => (
            <MediaGridItem item={item} key={item.id} />
         ))}
      </Grid>
   );
};

export default MediaGrid;
