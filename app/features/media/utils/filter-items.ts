import type { MediaItem } from '~/features/media/types/media-item';
import { MediaItemType } from '~/features/media/config/media-item-type';
import type { Folder } from '~/features/media/types/folder';

export const filterItems = (
   items: MediaItem[],
   filters: { type?: MediaItemType[]; name?: string; folder?: Folder },
) => {
   const { type, name, folder } = filters;
   let filtered = items.concat();

   if (folder) {
      filtered = filtered.filter((item) => folder.itemIds.includes(item.id));
   }

   if (type) {
      filtered = filtered.filter((item) => type.includes(item.type));
   }

   if (name) {
      filtered = filtered.filter((item) => item.name.includes(name));
   }

   return filtered;
};
