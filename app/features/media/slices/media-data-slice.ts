import {
   createAsyncThunk,
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

// Mock storage
const ITEMS_KEY = 'media-items';
const FOLDERS_KEY = 'media-folders';

const setFolders = (folders: Folder[]) =>
   localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));

const setItems = (items: MediaItem[]) =>
   localStorage.setItem(ITEMS_KEY, JSON.stringify(items));

export const fetchFolders = createAsyncThunk('media/fetch-folders', () => {
   let foldersStr = localStorage.getItem(FOLDERS_KEY);
   if (!foldersStr) {
      setFolders(mockFolders);
      return mockFolders;
   }
   return JSON.parse(foldersStr);
});

export const fetchItems = createAsyncThunk('media/fetch-items', () => {
   let itemsStr = localStorage.getItem(ITEMS_KEY);
   if (!itemsStr) {
      setItems(mockItems);
      return mockItems;
   }
   return JSON.parse(itemsStr);
});

export interface MediaDataState {
   folders: Folder[];
   items: MediaItem[];
}

const initialState: MediaDataState = {
   folders: [],
   items: [],
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
         setFolders(state.folders);
         setItems(state.items);
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
         setFolders(state.folders);
         setItems(state.items);
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
         setFolders(state.folders);
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
         setItems(state.items);
      },
      createFolder(
         state,
         action: PayloadAction<{
            folderName: string;
         }>,
      ) {
         const { folderName } = action.payload;
         if (state.folders.find((f) => f.name === folderName)) {
            return;
         }
         state.folders = state.folders.concat({
            name: folderName,
            itemIds: [],
            id: uuid.v4(),
         });
         setFolders(state.folders);
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
         setFolders(state.folders);
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchFolders.fulfilled, (state, action) => {
            state.folders = action.payload;
         })
         .addCase(fetchItems.fulfilled, (state, action) => {
            state.items = action.payload;
         });
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
