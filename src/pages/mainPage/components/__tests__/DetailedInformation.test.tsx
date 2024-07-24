import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { queryClientTest, storeTest } from './mockAnimeList';
import DetailedInformation from '../DetailedInformation';

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

describe('DetailedInformation', () => {
  it('displays a loading indicator while fetching data', async () => {
    render(
      <Provider store={storeTest}>
        <QueryClientProvider client={queryClientTest}>
          <MemoryRouter initialEntries={['/card/1']}>
            <Routes>
              <Route path="/card/:cardId" element={<DetailedInformation />} />
            </Routes>{' '}
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  it('hides the component when clicking the close button', async () => {
    render(
      <Provider store={storeTest}>
        <QueryClientProvider client={queryClientTest}>
          <MemoryRouter initialEntries={['/card/1']}>
            <Routes>
              <Route path="/card/:cardId" element={<DetailedInformation />} />
            </Routes>{' '}
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
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
      <Provider store={storeTest}>
        <QueryClientProvider client={queryClientTest}>
          <MemoryRouter initialEntries={['/card/1']}>
            <Routes>
              <Route path="/card/:cardId" element={<DetailedInformation />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    fireEvent.mouseDown(document);

    expect(screen.queryByText('Test Anime 1')).not.toBeInTheDocument();
  });
});
