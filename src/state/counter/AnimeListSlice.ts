import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Anime } from '../../pages/mainPage/components/CardSection';

interface AnimeListSlice {
  animeListOnPage: Anime[];
  detailCard: Anime | null;
  searchQuery: string;
  currentPage: number;
}

const initialState: AnimeListSlice = {
  animeListOnPage: [],
  detailCard: null,
  searchQuery: '',
  currentPage: 1,
};

const animeListSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setAnimeListOnPage(state, action: PayloadAction<Anime[]>) {
      const newState = state;
      newState.animeListOnPage = action.payload;
    },
    setDetailCard(state, action: PayloadAction<Anime>) {
      const newState = state;
      newState.detailCard = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      const newState = state;
      newState.searchQuery = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      const newState = state;
      newState.currentPage = action.payload;
    },
  },
});

export const { setSearchQuery, setCurrentPage, setAnimeListOnPage, setDetailCard } =
  animeListSlice.actions;
export default animeListSlice.reducer;
