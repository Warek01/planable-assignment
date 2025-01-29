import type { FC } from 'react';
import { Box } from '@radix-ui/themes';

import type { MediaItem } from '~/features/media/types/media-item';

export interface MediaGridItemProps {
   item: MediaItem;
}

const MediaGridItem: FC<MediaGridItemProps> = ({ item }) => {
   return <Box>{item.name}</Box>;
};

export default MediaGridItem;
