import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Anime } from '../pages/mainPage/components/CardSection';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://kitsu.io/api/edge/' }),
  endpoints: (builder) => ({
    getAnime: builder.query<
      { data: Anime[] },
      { request: string; offset: number }
    >({
      query: ({ request, offset }) =>
        `anime?filter[text]=${request}&page[limit]=12&page[offset]=${offset}`,
    }),
    getAnimeById: builder.query<
      { data: Anime },
      { animeId: string | undefined }
    >({
      query: ({ animeId }) => `anime/${animeId}`,
    }),
  }),
});

export const { useGetAnimeQuery, useGetAnimeByIdQuery } = animeApi;
