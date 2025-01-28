import type { Folder } from '~/features/media/types/folder';
import { MediaItemType } from '~/features/media/config/media-item-type';

export const mockFolders: Folder[] = [
   {
      name: 'folder-1',
      items: [
         {
            name: 'img1.jpg',
            type: MediaItemType.IMAGE,
         },
      ],
   },
   {
      name: 'folder-2',
      items: [
         {
            name: 'img1.jpg',
            type: MediaItemType.IMAGE,
         },
      ],
   },
   {
      name: 'folder-3',
      items: [
         {
            name: 'img1.jpg',
            type: MediaItemType.IMAGE,
         },
      ],
   },
];
