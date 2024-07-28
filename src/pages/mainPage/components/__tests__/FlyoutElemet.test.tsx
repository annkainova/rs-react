import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { mockAnimeList, queryClientTest, storeTest } from './mockAnimeList';

import FlyoutElement from '../../../../components/FlyoutElement/FlyoutElement';
import { setSelectedElements } from '../../../../state/slice/AnimeListSlice';

global.URL.createObjectURL = vi.fn();

describe('DetailedInformation', () => {
  it('shows how many items are selected', async () => {
    mockAnimeList.forEach((anime) =>
      storeTest.dispatch(setSelectedElements(anime))
    );

    render(
      <Provider store={storeTest}>
        <QueryClientProvider client={queryClientTest}>
          <MemoryRouter initialEntries={['/search/1']}>
            <FlyoutElement />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.queryByText('3 items selected')).toBeInTheDocument();
  });

  it('unselects all items when "Unselect all" button is clicked', async () => {
    mockAnimeList.forEach((anime) =>
      storeTest.dispatch(setSelectedElements(anime))
    );

    render(
      <Provider store={storeTest}>
        <QueryClientProvider client={queryClientTest}>
          <MemoryRouter initialEntries={['/search/1']}>
            <FlyoutElement />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);

    expect(screen.queryByText('3 items selected')).not.toBeInTheDocument();
  });
});
