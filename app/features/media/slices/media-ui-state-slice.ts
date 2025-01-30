import {
   createSelector,
   createSlice,
   type PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '~/store';
import { MediaItemType } from '~/features/media/config/media-item-type';
import { allMediaTypes } from '~/features/media/config/all-media-types';
import { selectFolders } from '~/features/media/slices/media-data-slice';

export interface MediaUiState {
   selectedFolderId: string | undefined;
   activeFilters: MediaItemType[];
   selectedItemIds: string[];
}

const initialState: MediaUiState = {
   selectedItemIds: [],
   selectedFolderId: undefined,
   activeFilters: [MediaItemType.IMAGE, MediaItemType.VIDEO, MediaItemType.GIF],
};

export const MEDIA_UI_STATE_SLICE_NAME = 'media-ui-state';

export const mediaUiStateSlice = createSlice({
   initialState,
   name: MEDIA_UI_STATE_SLICE_NAME,
   reducers: {
      setActiveFolder(
         state,
         action: PayloadAction<{ folderId: string | undefined }>,
      ) {
         const { folderId } = action.payload;
         state.selectedFolderId = folderId;
      },
      applyFilter(state, action: PayloadAction<{ filter: MediaItemType }>) {
         const { filter } = action.payload;
         if (state.activeFilters.includes(filter)) {
            return;
         }
         state.activeFilters = state.activeFilters.concat(filter);
      },
      clearFilters(state) {
         state.activeFilters = [];
      },
      fillFilters(state) {
         state.activeFilters = allMediaTypes.concat();
      },
      addItemToSelection(state, action: PayloadAction<{ itemId: string }>) {
         const { itemId } = action.payload;
         if (state.selectedItemIds.includes(itemId)) {
            return;
         }
         state.selectedItemIds = state.selectedItemIds.concat(itemId);
      },
      removeItemFromSelection(
         state,
         action: PayloadAction<{ itemId: string }>,
      ) {
         const { itemId } = action.payload;
         state.selectedItemIds = state.selectedItemIds.filter(
            (stateItemId) => stateItemId !== itemId,
         );
      },
      clearItemSelection(state) {
         state.selectedItemIds = [];
      },
      removeFilter(state, action: PayloadAction<{ filter: MediaItemType }>) {
         const { filter } = action.payload;
         state.activeFilters = state.activeFilters.filter((f) => f !== filter);
      },
   },
});

export const mediaUiStateReducer = mediaUiStateSlice.reducer;
export const {
   fillFilters,
   clearFilters,
   setActiveFolder,
   removeItemFromSelection,
   clearItemSelection,
   addItemToSelection,
   removeFilter,
   applyFilter,
} = mediaUiStateSlice.actions;

export const selectSelectedItemIds = (state: RootState): string[] =>
   state.mediaUiState.selectedItemIds;

export const selectSelectedFolderId = (state: RootState): string | undefined =>
   state.mediaUiState.selectedFolderId;

// Memorise with reselect expensive operations
export const selectSelectedFolder = createSelector(
   [selectFolders, selectSelectedFolderId],
   (folders, selectedFolderId) =>
      folders.find((folder) => folder.id === selectedFolderId),
);

export const selectActiveFilters = (state: RootState): MediaItemType[] =>
   state.mediaUiState.activeFilters;
