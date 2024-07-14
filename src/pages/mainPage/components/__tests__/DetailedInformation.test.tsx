import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailedInformation from '../DetailedInformation';

vi.mock('../../../../api/getAnime', () => ({
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

describe('DetailedInformation', () => {
  it('displays a loading indicator while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/card/1']}>
        <Routes>
          <Route path="/card/:cardId" element={<DetailedInformation />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  it('hides the component when clicking the close button', async () => {
    render(
      <MemoryRouter initialEntries={['/card/1']}>
        <Routes>
          <Route path="/card/:cardId" element={<DetailedInformation />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Test Anime 1')).not.toBeInTheDocument();
  });

  it('hides the component when clicking outside the card', async () => {
    render(
      <MemoryRouter initialEntries={['/card/1']}>
        <Routes>
          <Route path="/card/:cardId" element={<DetailedInformation />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    fireEvent.mouseDown(document);

    expect(screen.queryByText('Test Anime 1')).not.toBeInTheDocument();
  });
});
