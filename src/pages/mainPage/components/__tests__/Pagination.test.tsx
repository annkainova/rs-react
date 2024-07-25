import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { storeTest } from './mockAnimeList';

import Pagination from '../../../../components/pagination/Pagination';

global.URL.createObjectURL = vi.fn();

describe('Pagination', () => {
  it('Clicking on the next button shows the next page', async () => {
    render(
      <Provider store={storeTest}>
        <MemoryRouter initialEntries={['/search/1']}>
          <Pagination totalItems={60} />
        </MemoryRouter>
      </Provider>
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);

    expect(storeTest.getState().anime.currentPage).toBe(2);
  });
  it('Clicking on the number button takes you to the desired page', async () => {
    render(
      <Provider store={storeTest}>
        <MemoryRouter initialEntries={['/search/1']}>
          <Pagination totalItems={60} />
        </MemoryRouter>
      </Provider>
    );

    const buttonNumber = screen.getByText('4');
    expect(buttonNumber).toBeInTheDocument();
    fireEvent.click(buttonNumber);

    expect(storeTest.getState().anime.currentPage).toBe(4);
  });

  it('If there is no data, pagination is not shown', async () => {
    render(
      <Provider store={storeTest}>
        <MemoryRouter initialEntries={['/search/1']}>
          <Pagination totalItems={0} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });
});
