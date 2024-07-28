import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { queryClientTest, storeTest } from './mockAnimeList';

import ErrorPage from '../../../errorPage/ErorrPage';

describe('ErrorPage', () => {
  it('Displays an error message when an error occurs', async () => {
    const routes = [
      {
        path: '*',
        element: <ErrorPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/error'],
    });

    render(
      <Provider store={storeTest}>
        <QueryClientProvider client={queryClientTest}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, an unexpected error has occurred.')
    ).toBeInTheDocument();
  });
});
