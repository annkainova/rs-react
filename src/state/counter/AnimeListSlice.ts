import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Anime } from '../../pages/mainPage/components/CardSection';

interface AnimeListSlice {
  animeList: Anime[];
  searchQuery: string;
  currentPage: number;
}

const initialState: AnimeListSlice = {
  animeList: [],
  searchQuery: '',
  currentPage: 0,
};

const animeListSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
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

export const { setSearchQuery, setCurrentPage } = animeListSlice.actions;
export default animeListSlice.reducer;
