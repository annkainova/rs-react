import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { queryClientTest, storeTest } from './mockAnimeList';
import SearchBar from '../../../../components/searchBar/searchBar';

describe('SearchBar Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves entered value to local storage when search button is clicked', () => {
    render(
      <Provider store={storeTest}>
        <QueryClientProvider client={queryClientTest}>
          <MemoryRouter initialEntries={['/search/1']}>
            <SearchBar />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search More');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);

    expect(localStorage.getItem('searchQuery')).toBe('test query');
  });

  it('retrieves value from local storage when component mounts', () => {
    localStorage.setItem('searchQuery', 'stored query');

    render(
      <Provider store={storeTest}>
        <QueryClientProvider client={queryClientTest}>
          <MemoryRouter initialEntries={['/search/1']}>
            <SearchBar />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search More');
    expect(input).toHaveValue('stored query');
  });
});
