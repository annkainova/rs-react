import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Card from '../Card';
import CardSection from '../../../pages/mainPage/components/CardSection';
import DetailedInformation from '../../../pages/mainPage/components/DetailedInformation';
import '@testing-library/jest-dom';
import { getAnimeById } from '../../../api/getAnime';

vi.mock('../../../api/getAnime', () => ({
  getAnimeById: vi.fn(() =>
    Promise.resolve({
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
    })
  ),
}));

const mockAnime = {
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
};

describe('Card', () => {
  it('renders the relevant card data', () => {
    render(
      <Card
        title={mockAnime.attributes.canonicalTitle}
        yearStart={mockAnime.attributes.startDate}
        rating={mockAnime.attributes.averageRating}
        imgLink={mockAnime.attributes.posterImage.large}
      />
    );

    expect(screen.getByText('Test Anime 1')).toBeInTheDocument();
    expect(screen.getByText('2021-01-01')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
    expect(screen.getByAltText('Test Anime 1 cover')).toBeInTheDocument();
  });

  it('validates that clicking on a card opens a detailed card component', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CardSection animeList={[mockAnime]} />} />
          <Route path="card/:cardId" element={<DetailedInformation />} />
        </Routes>
      </MemoryRouter>
    );

    const cardLink = screen.getByRole('link');
    fireEvent.click(cardLink);

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Test Anime 1')).toBeInTheDocument();
    expect(
      screen.getByText('Description for Test Anime 1')
    ).toBeInTheDocument();
  });

  it('checks that clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CardSection animeList={[mockAnime]} />} />
          <Route path="card/:cardId" element={<DetailedInformation />} />
        </Routes>
      </MemoryRouter>
    );

    const cardLink = screen.getByRole('link');
    fireEvent.click(cardLink);

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    expect(getAnimeById).toHaveBeenCalledWith('1');

    expect(screen.getByText('Test Anime 1')).toBeInTheDocument();
    expect(
      screen.getByText('Description for Test Anime 1')
    ).toBeInTheDocument();
  });
});
