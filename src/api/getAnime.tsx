import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Anime } from '../pages/mainPage/components/CardSection';

// export async function getAnime(request: string, offset: number) {
//   try {
//     const response = await fetch(
//       `https://kitsu.io/api/edge/anime?filter[text]=${request}&page[limit]=8&page[offset]=${offset}`,
//       {
//         headers: {
//           Accept: 'application/vnd.api+json',
//         },
//       }
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();

//     return data.data;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error('Error fetching anime data:', error);
//     }
//     return [];
//   }
// }

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
