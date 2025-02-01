import type { Folder } from '~/features/media/types/folder';
import type { MediaItem } from '~/features/media/types/media-item';
import { mockFolders } from '~/mocks/folders';
import { mockItems } from '~/mocks/items';

const ITEMS_KEY = 'media-items';
const FOLDERS_KEY = 'media-folders';

export const setFoldersToLocalStorage = (folders: Folder[]) =>
   localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));

export const setItemsToLocalStorage = (items: MediaItem[]) =>
   localStorage.setItem(ITEMS_KEY, JSON.stringify(items));

export const getFoldersFromLocalStorage = (): Folder[] => {
   let foldersStr = localStorage.getItem(FOLDERS_KEY);
   if (!foldersStr) {
      setFoldersToLocalStorage(mockFolders);
      return mockFolders;
   }
   return JSON.parse(foldersStr);
};

export const getItemsFromLocalStorage = (): MediaItem[] => {
   let itemsStr = localStorage.getItem(ITEMS_KEY);
   if (!itemsStr) {
      setItemsToLocalStorage(mockItems);
      return mockItems;
   }
   return JSON.parse(itemsStr);
};
