import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../../../../components/card/Card';
import { mockAnimeList } from './mockAnimeList';

vi.mock('../../../api/getAnime', async () => ({
  useGetAnimeByIdQuery: vi.fn().mockReturnValue({
    data: {
      data: {
        id: '1',
        attributes: {
          canonicalTitle: 'Example Anime',
          description: 'Example description',
          totalLength: '24',
          startDate: '2021-01-01',
          averageRating: '8.5',
          posterImage: {
            large: 'https://example.com/image.jpg',
          },
        },
      },
    },
    isFetching: false,
  }),
}));

describe('Card', () => {
  it('renders the relevant card data', () => {
    render(
      <Card
        title={mockAnimeList[0].attributes.canonicalTitle}
        yearStart={mockAnimeList[0].attributes.startDate}
        rating={mockAnimeList[0].attributes.averageRating}
        imgLink={mockAnimeList[0].attributes.posterImage?.large ?? ''}
      />
    );

    expect(screen.getByText('Example Anime')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByAltText('Example Anime cover')).toBeInTheDocument();
  });
});
