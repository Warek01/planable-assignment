import type { MediaItem } from '~/features/media/types/media-item';
import { MediaItemType } from '~/features/media/config/media-item-type';

export const mockItems: MediaItem[] = [
   {
      name: 'img1.jpg',
      type: MediaItemType.IMAGE,
      url: 'https://picsum.photos/1/200/300',
      thumbnailUrl: 'https://picsum.photos/1/200/300',
      id: '7b577a7d-a708-4628-8ee4-0fb5b5d0f3d6',
   },
   {
      name: 'img2.jpg',
      type: MediaItemType.IMAGE,
      url: 'https://picsum.photos/2/200/300',
      thumbnailUrl: 'https://picsum.photos/2/200/300',
      id: '0388dd3d-1d76-40f3-8fbe-5de1c3dca13c',
   },
   {
      name: 'img3.jpg',
      type: MediaItemType.IMAGE,
      url: 'https://picsum.photos/3/200/300',
      thumbnailUrl: 'https://picsum.photos/3/200/300',
      id: '463821e4-ccb4-4619-a3fb-fd598b45816b',
   },
   {
      name: 'img1.jpg',
      type: MediaItemType.IMAGE,
      url: 'https://picsum.photos/4/200/300',
      thumbnailUrl: 'https://picsum.photos/4/200/300',
      id: '43b33bdb-37e0-4846-a54f-511eb23e1d36',
   },
   {
      name: 'img1.jpg',
      type: MediaItemType.IMAGE,
      url: 'https://picsum.photos/5/200/300',
      thumbnailUrl: 'https://picsum.photos/5/200/300',
      id: '4c18510e-378e-4dc2-b30e-9e70f1409355',
   },
];
