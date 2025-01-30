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
      addItems(
         state,
         action: PayloadAction<{ items: MediaItem[]; folderId: string }>,
      ) {
         const { items, folderId } = action.payload;

         // Add to folder
         state.folders = state.folders.map((folder) =>
            folder.id === folderId
               ? {
                    ...folder,
                    itemIds: folder.itemIds.concat(items.map((i) => i.id)),
                 }
               : folder,
         );

         // Add to items list
         state.items = state.items.concat(items);
      },
      deleteItems(
         state,
         action: PayloadAction<{ itemIds: string[]; folderId: string }>,
      ) {
         const { folderId, itemIds } = action.payload;

         // Remove from folder
         state.folders = state.folders.map((folder) =>
            folder.id === folderId
               ? {
                    ...folder,
                    itemIds: folder.itemIds.filter(
                       (id) => !itemIds.includes(id),
                    ),
                 }
               : folder,
         );

         // Remove from items list
         state.items = state.items.filter(
            (stateItem) => !itemIds.includes(stateItem.id),
         );
      },
      moveItems(
         state,
         action: PayloadAction<{
            itemIds: string[];
            srcFolderId: string;
            dstFolderId: string;
         }>,
      ) {
         const { itemIds, dstFolderId, srcFolderId } = action.payload;

         state.folders = state.folders.map((folder) => {
            // Remove from initial folder
            if (folder.id === srcFolderId) {
               return {
                  ...folder,
                  itemIds: folder.itemIds.filter((id) => !itemIds.includes(id)),
               };
            }

            // Add to new folder
            if (folder.id === dstFolderId) {
               return {
                  ...folder,
                  itemIds: folder.itemIds.concat(itemIds),
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
   deleteItems,
   renameItem,
   addItems,
   moveItems,
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
