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

         state.items = state.items.map((stateItem) =>
            stateItem.id === itemId
               ? {
                    ...stateItem,
                    name: newName,
                 }
               : stateItem,
         );
         setItemsToLocalStorage(state.items);
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
