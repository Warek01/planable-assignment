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
import {
   getFoldersFromLocalStorage,
   getItemsFromLocalStorage,
   setFoldersToLocalStorage,
   setItemsToLocalStorage,
} from '~/features/media/utils/media-storage';


// In prod this should be normalized like this
// folders: { byId: Record<string, Folder>, allIds: string[] } ...
export interface MediaDataState {
   folders: Folder[];
   items: MediaItem[];
}

const initialState: MediaDataState = {
   folders: [],
   items: [],
};

export const MEDIA_DATA_SLICE_NAME = 'media-data';

// Mock storage, should be api calls instead, ideally RTK query
export const fetchFolders = createAsyncThunk<Folder[]>(
   `${MEDIA_DATA_SLICE_NAME}/fetch-folders`,
   async () => {
      return getFoldersFromLocalStorage();
   },
);

export const fetchItems = createAsyncThunk<MediaItem[]>(
   `${MEDIA_DATA_SLICE_NAME}/fetch-items`,
   async () => {
      return getItemsFromLocalStorage();
   },
);

// Mock POST-ing new items
export const addItems = createAsyncThunk<
   MediaDataState,
   {
      items: MediaItem[];
      folderId: string;
   }
>(`${MEDIA_DATA_SLICE_NAME}/add-items`, async ({ items, folderId }) => {
   // I could also call getState but the props are readonly
   let allItems = getItemsFromLocalStorage();
   let allFolders = getFoldersFromLocalStorage();

   allItems = allItems.concat(items);

   // If folder not found ideally should throw and add new case for rejected thunk, skipping for simplicity
   const folder = allFolders.find((folder) => folder.id === folderId)!;
   folder.itemIds = folder.itemIds.concat(items.map((i) => i.id));

   setItemsToLocalStorage(allItems);
   setFoldersToLocalStorage(allFolders);

   // In prod should return only new items and modify state on client instead of replacing the entire state
   return {
      items: allItems,
      folders: allFolders,
   };
});

export const mediaDataSlice = createSlice({
   initialState,
   name: MEDIA_DATA_SLICE_NAME,
   reducers: {
      // All these methods should be thunks as well in prod, with no side-effects
      deleteItems(
         state,
         action: PayloadAction<{ itemIds: string[]; folderId: string }>,
      ) {
         const { folderId, itemIds } = action.payload;

         const folder = state.folders.find(
            (stateFolder) => stateFolder.id === folderId,
         );
         if (!folder) {
            console.error(`[${deleteItems.name}] Folder ${folderId} not found`);
            return;
         }

         folder.itemIds = folder.itemIds.filter((id) => !itemIds.includes(id));
         state.items = state.items.filter(
            (stateItem) => !itemIds.includes(stateItem.id),
         );
         setFoldersToLocalStorage(state.folders);
         setItemsToLocalStorage(state.items);
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

         const srcFolder = state.folders.find(
            (stateFolder) => stateFolder.id === srcFolderId,
         );
         const dstFolder = state.folders.find(
            (stateFolder) => stateFolder.id === dstFolderId,
         );

         if (!srcFolder) {
            console.error(
               `[${moveItems.name}] Source folder ${srcFolderId} not found`,
            );
            return;
         }
         if (!dstFolder) {
            console.error(
               `[${moveItems.name}] Destination folder ${dstFolderId} not found`,
            );
            return;
         }

         srcFolder.itemIds = srcFolder.itemIds.filter(
            (id) => !itemIds.includes(id),
         );
         dstFolder.itemIds = dstFolder.itemIds.concat(itemIds);
         setFoldersToLocalStorage(state.folders);
      },
      renameItem(
         state,
         action: PayloadAction<{
            itemId: string;
            newName: string;
         }>,
      ) {
         const { newName, itemId } = action.payload;
         const item = state.items.find((stateItem) => stateItem.id === itemId);
         if (!item) {
            console.error(`[${renameItem.name}] Item ${itemId} not found`);
            return;
         }
         item.name = newName;
         setItemsToLocalStorage(state.items);
      },
      createFolder(
         state,
         action: PayloadAction<{
            folderName: string;
         }>,
      ) {
         const { folderName } = action.payload;
         const folderExists = state.folders.find((f) => f.name === folderName);
         if (folderExists) {
            console.error(
               `[${createFolder.name}] Folder ${folderName} already exists`,
            );
            return;
         }
         // I assume the props are already validated
         state.folders.push({
            name: folderName,
            itemIds: [],
            id: uuid.v4(),
         });
         setFoldersToLocalStorage(state.folders);
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
         setFoldersToLocalStorage(state.folders);
      },
   },
   extraReducers: (builder) => {
      // Skip errors and loading cases for simplicity
      builder
         .addCase(fetchFolders.fulfilled, (state, action) => {
            state.folders = action.payload;
         })
         .addCase(fetchItems.fulfilled, (state, action) => {
            state.items = action.payload;
         })
         .addCase(addItems.fulfilled, (state, action) => {
            const { items, folders } = action.payload;
            state.items = items;
            state.folders = folders;
         });
   },
});

export const mediaDataReducer = mediaDataSlice.reducer;
export const {
   deleteItems,
   renameItem,
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
