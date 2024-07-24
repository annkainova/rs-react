import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';

import CardSection from '../CardSection';
import '@testing-library/jest-dom';
import { mockAnimeList, queryClientTest, storeTest } from './mockAnimeList';

describe('CardSection', () => {
  it('renders the specified number of cards', () => {
    render(
      <Provider store={storeTest}>
        <QueryClientProvider client={queryClientTest}>
          <MemoryRouter initialEntries={['/search/1']}>
            <CardSection animeList={mockAnimeList} />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const cards = screen.getAllByRole('link');
    expect(cards.length).toBe(mockAnimeList.length);
  });

  it('displays a message when no cards are present', () => {
    render(
      <Provider store={storeTest}>
        <QueryClientProvider client={queryClientTest}>
          <MemoryRouter initialEntries={['/search/1']}>
            <CardSection animeList={[]} />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const message = screen.getByText(/unfortunately we didn't find anything/i);
    expect(message).toBeInTheDocument();
  });
});
