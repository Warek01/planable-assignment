import { configureStore } from '@reduxjs/toolkit';

import { mediaDataReducer } from '~/features/media/slices/media-data-slice';
import { mediaUiStateReducer } from '~/features/media/slices/media-ui-state-slice';

export const store = configureStore({
   reducer: {
      mediaData: mediaDataReducer,
      mediaUiState: mediaUiStateReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
