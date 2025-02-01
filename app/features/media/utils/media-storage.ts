import { type WritableDraft, isDraft } from 'immer';
import { current } from '@reduxjs/toolkit';

import type { Folder } from '~/features/media/types/folder';
import type { MediaItem } from '~/features/media/types/media-item';
import { mockFolders } from '~/mocks/folders';
import { mockItems } from '~/mocks/items';

const ITEMS_KEY = 'media-items';
const FOLDERS_KEY = 'media-folders';

const serialize = <T>(obj: WritableDraft<T> | T) =>
   JSON.stringify(isDraft(obj) ? current(obj) : obj);

export const setFoldersToLocalStorage = (folders: WritableDraft<Folder[]>) =>
   localStorage.setItem(FOLDERS_KEY, serialize(folders));

export const setItemsToLocalStorage = (items: WritableDraft<MediaItem[]>) =>
   localStorage.setItem(ITEMS_KEY, serialize(items));

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
