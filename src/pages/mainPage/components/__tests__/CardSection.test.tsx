import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CardSection from '../CardSection';
import '@testing-library/jest-dom';

const mockAnimeList = [
  {
    id: '1',
    attributes: {
      canonicalTitle: 'Test Anime 1',
      description: 'Description for Test Anime 1',
      totalLength: '24',
      startDate: '2021-01-01',
      averageRating: '80',
      posterImage: {
        large: 'https://via.placeholder.com/150',
      },
      coverImage: {
        original: 'https://via.placeholder.com/300',
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
      averageRating: '85',
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
      averageRating: '90',
      posterImage: {
        large: 'https://via.placeholder.com/150',
      },
      coverImage: {
        original: 'https://via.placeholder.com/300',
      },
    },
  },
];

describe('CardSection', () => {
  it('renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <CardSection animeList={mockAnimeList} />
      </MemoryRouter>
    );
    const cards = screen.getAllByRole('link');
    expect(cards.length).toBe(mockAnimeList.length);
  });

  it('displays a message when no cards are present', () => {
    render(
      <MemoryRouter>
        <CardSection animeList={[]} />
      </MemoryRouter>
    );
    const message = screen.getByText(/unfortunately we didn't find anything/i);
    expect(message).toBeInTheDocument();
  });
});
