import { configureStore } from '@reduxjs/toolkit';
import AnimeListReduser from './counter/AnimeListSlice';
import { animeApi } from '../api/getAnime';

export const store = configureStore({
  reducer: {
    anime: AnimeListReduser,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
