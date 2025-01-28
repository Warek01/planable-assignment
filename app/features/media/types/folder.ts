import type { MediaItem } from '~/features/media/types/media-item';

export interface Folder {
   name: string;
   items: MediaItem[];
}
