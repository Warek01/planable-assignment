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
import { mockItems } from '~/mocks/items';

export interface MediaDataState {
   folders: Folder[];
   items: MediaItem[];
}

const initialState: MediaDataState = {
   folders: mockFolders,
   items: mockItems,
};

export const MEDIA_DATA_SLICE_NAME = 'media-data';

export const mediaDataSlice = createSlice({
   initialState,
   name: MEDIA_DATA_SLICE_NAME,
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
            itemId: string;
            newName: string;
         }>,
      ) {
         const { newName, itemId } = action.payload;

         state.items = state.items.map((stateItem) =>
            stateItem.id === itemId
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
   },
});

export const mediaDataReducer = mediaDataSlice.reducer;
export const {
   deleteItem,
   renameItem,
   addItem,
   moveItem,
   createFolder,
   deleteFolder,
} = mediaDataSlice.actions;

export const selectFolders = (state: RootState): Folder[] =>
   state.mediaData.folders;

export const selectItems = (state: RootState): MediaItem[] =>
   state.mediaData.items;

export const selectFolder = createSelector(
   [selectFolders, (state: RootState, folderId: string) => folderId],
   (folders, folderId) =>
      folders.find((stateFolder) => stateFolder.id === folderId),
);

export const selectItem = createSelector(
   [selectItems, (state: RootState, itemId: string) => itemId],
   (items, itemId) => items.find((stateItem) => stateItem.id === itemId),
);

export const selectAllFolderNames = createSelector([selectFolders], (folders) =>
   folders.map((f) => f.name),
);
