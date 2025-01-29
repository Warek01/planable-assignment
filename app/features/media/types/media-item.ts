import type { MediaItemType } from '~/features/media/config/media-item-type';

export interface MediaItem {
   type: MediaItemType;
   name: string;
   url: string;
   thumbnailUrl: string;
   id: string;
}
