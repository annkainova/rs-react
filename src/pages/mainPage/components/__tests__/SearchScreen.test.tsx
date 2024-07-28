import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { storeTest } from './mockAnimeList';

import SearchScreen from '../SearchScreen';
import ThemeContext from '../../../../ThemeContext';
import { animeApi } from '../../../../api/getAnime';

describe('SearchScreen', () => {
  it('Switches between dark and light theme', async () => {
    const toggleTheme = vi.fn();

    render(
      <ThemeContext.Provider value={{ mode: 'dark', toggleTheme }}>
        <Provider store={storeTest}>
          <MemoryRouter initialEntries={['/search/1']}>
            <SearchScreen />
          </MemoryRouter>
        </Provider>
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('themeButton');
    fireEvent.click(button);
    expect(toggleTheme).toHaveBeenCalled();
  });

  it('Displays loading state correctly', async () => {
    vi.spyOn(animeApi, 'useGetAnimeQuery').mockReturnValue({
      data: null,
      isLoading: true,
      isFetching: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <Provider store={storeTest}>
        <MemoryRouter initialEntries={['/search/1']}>
          <SearchScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
