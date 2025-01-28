import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Folder } from '~/features/media/types/folder';
import type { MediaItem } from '~/features/media/types/media-item';
import type { RootState } from '~/store';
import { mockFolders } from '~/mocks/folders';

// Simple hierarchy by direct reference
// A more fine-grained and performant approach would be having a separate slice for media items
// and keeping the reference by ID in the folder
interface MediaState {
   folders: Folder[];
}

const initialState: MediaState = {
   folders: mockFolders,
};

export const MEDIA_SLICE_NAME = 'media';

export const mediaSlice = createSlice({
   initialState,
   name: MEDIA_SLICE_NAME,
   reducers: {
      addItem(
         state,
         action: PayloadAction<{ item: MediaItem; folderName: string }>,
      ) {
         const { folderName, item } = action.payload;
         state.folders = state.folders.map((folder) =>
            folder.name === folderName
               ? { ...folder, items: folder.items.concat(item) }
               : folder,
         );
      },
      deleteItem(
         state,
         action: PayloadAction<{ item: MediaItem; folderName: string }>,
      ) {
         const { folderName, item } = action.payload;
         state.folders = state.folders.map((folder) =>
            folder.name === folderName
               ? {
                    ...folder,
                    item: folder.items.filter((i) => i !== item),
                 }
               : folder,
         );
      },
      moveItem(
         state,
         action: PayloadAction<{
            item: MediaItem;
            srcFolderName: string;
            dstFolderName: string;
         }>,
      ) {
         const { item, dstFolderName, srcFolderName } = action.payload;
         state.folders = state.folders.map((folder) => {
            if (folder.name === srcFolderName) {
               return {
                  ...folder,
                  items: folder.items.filter((i) => i.name !== item.name),
               };
            }
            if (folder.name === dstFolderName) {
               return {
                  ...folder,
                  items: folder.items.concat(item),
               };
            }

            return folder;
         });
      },
      renameItem(
         state,
         action: PayloadAction<{
            itemName: string;
            folderName: string;
            newName: string;
         }>,
      ) {
         const { itemName, newName, folderName } = action.payload;
         state.folders = state.folders.map((folder) =>
            folder.name === folderName
               ? {
                    ...folder,
                    items: folder.items.map((item) =>
                       item.name === itemName
                          ? { ...item, name: newName }
                          : item,
                    ),
                 }
               : folder,
         );
      },
      createFolder(
         state,
         action: PayloadAction<{
            folderName: string;
         }>,
      ) {
         const { folderName } = action.payload;
         state.folders = state.folders.concat({ name: folderName, items: [] });
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

export const mediaReducer = mediaSlice.reducer;
export const {
   deleteItem,
   renameItem,
   addItem,
   moveItem,
   createFolder,
   deleteFolder,
} = mediaSlice.actions;

export const selectFolders = (state: RootState) => state.media.folders;

export const selectFolder =
   (folderName: string) =>
   (state: RootState): Folder | undefined =>
      state.media.folders.find((f) => f.name === folderName);

export const selectItem =
   (itemName: string, folderName: string) =>
   (state: RootState): MediaItem | undefined =>
      state.media.folders
         .find((f) => f.name === folderName)
         ?.items.find((i) => i.name === itemName);
