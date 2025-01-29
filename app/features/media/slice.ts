import {
   createSelector,
   createSlice,
   type PayloadAction,
} from '@reduxjs/toolkit';
import * as uuid from 'uuid';

import type { Folder } from '~/features/media/types/folder';
import type { MediaItem } from '~/features/media/types/media-item';
import type { RootState } from '~/store';
import { mockFolders } from '~/mocks/folders';
import { MediaItemType } from '~/features/media/config/media-item-type';
import { mockItems } from '~/mocks/items';
import { allMediaTypes } from '~/features/media/config/all-media-types';

interface MediaState {
   folders: Folder[];
   items: MediaItem[];
   selectedFolderId: string | undefined;
   activeFilters: MediaItemType[];
   selectedItemIds: string[];
}

const initialState: MediaState = {
   folders: mockFolders,
   items: mockItems,
   selectedItemIds: [],
   selectedFolderId: undefined,
   activeFilters: [MediaItemType.IMAGE, MediaItemType.VIDEO, MediaItemType.GIF],
};

export const MEDIA_SLICE_NAME = 'media';

export const mediaSlice = createSlice({
   initialState,
   name: MEDIA_SLICE_NAME,
   reducers: {
      addItem(
         state,
         action: PayloadAction<{ item: MediaItem; folderId: string }>,
      ) {
         const { item, folderId } = action.payload;

         // Add to folder
         state.folders = state.folders.map((folder) =>
            folder.id === folderId
               ? { ...folder, itemIds: folder.itemIds.concat(item.id) }
               : folder,
         );

         // Add to items list
         state.items = state.items.concat(item);
      },
      deleteItem(
         state,
         action: PayloadAction<{ item: MediaItem; folderId: string }>,
      ) {
         const { folderId, item } = action.payload;

         // Remove from folder
         state.folders = state.folders.map((folder) =>
            folder.id === folderId
               ? {
                    ...folder,
                    itemIds: folder.itemIds.filter((id) => id !== item.id),
                 }
               : folder,
         );

         // Remove from items list
         state.items = state.items.filter(
            (stateItem) => stateItem.id !== item.id,
         );
      },
      moveItem(
         state,
         action: PayloadAction<{
            item: MediaItem;
            srcFolderId: string;
            dstFolderId: string;
         }>,
      ) {
         const { item, dstFolderId, srcFolderId } = action.payload;

         state.folders = state.folders.map((folder) => {
            // Remove from initial folder
            if (folder.id === srcFolderId) {
               return {
                  ...folder,
                  itemsIds: folder.itemIds.filter((id) => id !== item.id),
               };
            }

            // Add to new folder
            if (folder.name === dstFolderId) {
               return {
                  ...folder,
                  items: folder.itemIds.concat(item.id),
               };
            }

            return folder;
         });
      },
      renameItem(
         state,
         action: PayloadAction<{
            item: MediaItem;
            newName: string;
         }>,
      ) {
         const { newName, item } = action.payload;

         state.items = state.items.map((stateItem) =>
            stateItem.id === item.id
               ? {
                    ...stateItem,
                    name: newName,
                 }
               : stateItem,
         );
      },
      createFolder(
         state,
         action: PayloadAction<{
            folderName: string;
         }>,
      ) {
         const { folderName } = action.payload;
         state.folders = state.folders.concat({
            name: folderName,
            itemIds: [],
            id: uuid.v4(),
         });
      },
      deleteFolder(
         state,
         action: PayloadAction<{
            folderName: string;
         }>,
      ) {
         const { folderName } = action.payload;
         state.folders = state.folders.filter(
            (folder) => folder.name !== folderName,
         );
      },
      setActiveFolder(
         state,
         action: PayloadAction<{ folderId: string | undefined }>,
      ) {
         const { folderId } = action.payload;
         state.selectedFolderId = folderId;
      },
      applyFilter(state, action: PayloadAction<{ filter: MediaItemType }>) {
         const { filter } = action.payload;
         state.activeFilters = state.activeFilters.concat(filter);
      },
      clearFilters(state) {
         state.activeFilters = [];
      },
      fillFilters(state) {
         state.activeFilters = allMediaTypes.concat();
      },
      removeFilter(state, action: PayloadAction<{ filter: MediaItemType }>) {
         const { filter } = action.payload;
         state.activeFilters = state.activeFilters.filter((f) => f !== filter);
      },
   },
});

export const mediaReducer = mediaSlice.reducer;
export const {
   deleteItem,
   renameItem,
   addItem,
   moveItem,
   createFolder,
   deleteFolder,
   fillFilters,
   clearFilters,
   setActiveFolder,
   removeFilter,
   applyFilter,
} = mediaSlice.actions;

export const selectFolders = (state: RootState): Folder[] =>
   state.media.folders;

export const selectItems = (state: RootState): MediaItem[] => state.media.items;

export const selectSelectedItemIds = (state: RootState): string[] =>
   state.media.selectedItemIds;

export const selectSelectedFolderId = (state: RootState): string | undefined =>
   state.media.selectedFolderId;

export const selectSelectedFolder = createSelector(
   [selectFolders, selectSelectedFolderId],
   (folders, selectedFolderId) =>
      folders.find((folder) => folder.id === selectedFolderId),
);

export const selectFolder = createSelector(
   [selectFolders, (state: RootState, folderId: string) => folderId],
   (folders, folderId) =>
      folders.find((stateFolder) => stateFolder.id === folderId),
);

export const selectActiveFilters = (state: RootState): MediaItemType[] =>
   state.media.activeFilters;

export const selectItem = createSelector(
   [selectItems, (state: RootState, itemId: string) => itemId],
   (items, itemId) => items.find((stateItem) => stateItem.id === itemId),
);

export const selectAllFolderNames = createSelector([selectFolders], (folders) =>
   folders.map((f) => f.name),
);
