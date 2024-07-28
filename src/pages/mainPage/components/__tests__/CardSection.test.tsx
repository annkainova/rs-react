import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import CardSection from '../CardSection';
import '@testing-library/jest-dom';
import { mockAnimeList, storeTest } from './mockAnimeList';

describe('CardSection', () => {
  it('renders the specified number of cards', () => {
    render(
      <Provider store={storeTest}>
        <MemoryRouter initialEntries={['/search/1']}>
          <CardSection animeList={mockAnimeList} />
        </MemoryRouter>
      </Provider>
    );
    const cards = screen.getAllByRole('link');
    expect(cards.length).toBe(mockAnimeList.length);
  });

  it('displays a message when no cards are present', () => {
    render(
      <Provider store={storeTest}>
        <MemoryRouter initialEntries={['/search/1']}>
          <CardSection animeList={[]} />
        </MemoryRouter>
      </Provider>
    );
    const message = screen.getByText(/unfortunately we didn't find anything/i);
    expect(message).toBeInTheDocument();
  });
});
