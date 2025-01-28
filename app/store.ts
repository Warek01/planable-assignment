import { configureStore } from '@reduxjs/toolkit';

import { mediaReducer } from '~/features/media/slice';

export const store = configureStore({
   reducer: {
      media: mediaReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
