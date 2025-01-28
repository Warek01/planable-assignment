import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Folder } from '~/features/media/types/folder';
import type { MediaItem } from '~/features/media/types/media-item';
import type { RootState } from '~/store';
import { mockFolders } from '~/mocks/folders';

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
         action: PayloadAction<{ item: MediaItem; folder: Folder }>,
      ) {},
      deleteItem(state, action: PayloadAction<{ item: MediaItem }>) {},
      moveItem(
         state,
         action: PayloadAction<{
            item: MediaItem;
            srcFolder: Folder;
            dstFolder: Folder;
         }>,
      ) {},
      renameItem(
         state,
         action: PayloadAction<{ item: MediaItem; newName: string }>,
      ) {},
   },
});

export const mediaReducer = mediaSlice.reducer;
export const { deleteItem, renameItem, addItem, moveItem } = mediaSlice.actions;
export const selectFolder =
   (folderName: string) =>
   (state: RootState): Folder | undefined =>
      state.media.folders.find((f) => f.name === folderName);
