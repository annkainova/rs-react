import { configureStore } from '@reduxjs/toolkit';
import { QueryClient } from 'react-query';

import '@testing-library/jest-dom';
import AnimeListSlice from '../../../../state/slice/AnimeListSlice';
import { Anime } from '../CardSection';
import { animeApi } from '../../../../api/getAnime';

export const mockAnimeList: Anime[] = [
  {
    id: '1',
    attributes: {
      canonicalTitle: 'Example Anime',
      description: 'Example description',
      totalLength: '24',
      startDate: '2021-01-01',
      averageRating: '8.5',
      posterImage: {
        large: 'https://example.com/image.jpg',
      },
      coverImage: {
        original: 'https://example.com/cover.jpg',
      },
    },
  },
  {
    id: '2',
    attributes: {
      canonicalTitle: 'Test Anime 2',
      description: 'Description for Test Anime 2',
      totalLength: '12',
      startDate: '2021-02-01',
      averageRating: '8.5',
      posterImage: {
        large: 'https://via.placeholder.com/150',
      },
      coverImage: {
        original: 'https://via.placeholder.com/300',
      },
    },
  },
  {
    id: '3',
    attributes: {
      canonicalTitle: 'Test Anime 3',
      description: 'Description for Test Anime 3',
      totalLength: '36',
      startDate: '2021-03-01',
      averageRating: '9.0',
      posterImage: {
        large: 'https://via.placeholder.com/150',
      },
      coverImage: {
        original: 'https://via.placeholder.com/300',
      },
    },
  },
];

export const queryClientTest = new QueryClient();

export const storeTest = configureStore({
  reducer: {
    anime: AnimeListSlice,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animeApi.middleware),
});
