import type { Folder } from '~/features/media/types/folder';
import { MediaItemType } from '~/features/media/config/media-item-type';

export const mockFolders: Folder[] = [
   {
      name: 'folder-1',
      items: [
         {
            name: 'img1.jpg',
            type: MediaItemType.IMAGE,
            url: 'https://picsum.photos/1/200/300',
            thumbnailUrl: 'https://picsum.photos/1/200/300',
         },
         {
            name: 'img2.jpg',
            type: MediaItemType.IMAGE,
            url: 'https://picsum.photos/2/200/300',
            thumbnailUrl: 'https://picsum.photos/2/200/300',
         },
         {
            name: 'img3.jpg',
            type: MediaItemType.IMAGE,
            url: 'https://picsum.photos/3/200/300',
            thumbnailUrl: 'https://picsum.photos/3/200/300',
         },
      ],
   },
   {
      name: 'folder-2',
      items: [
         {
            name: 'img1.jpg',
            type: MediaItemType.IMAGE,
            url: 'https://picsum.photos/4/200/300',
            thumbnailUrl: 'https://picsum.photos/4/200/300',
         },
      ],
   },
   {
      name: 'folder-3',
      items: [
         {
            name: 'img1.jpg',
            type: MediaItemType.IMAGE,
            url: 'https://picsum.photos/5/200/300',
            thumbnailUrl: 'https://picsum.photos/5/200/300',
         },
      ],
   },
];
