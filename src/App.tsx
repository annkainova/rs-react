import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchScreen from './pages/mainPage/components/SearchScreen';
import ErrorPage from './pages/errorPage/ErorrPage';
import DetailedInformation from './pages/mainPage/components/DetailedInformation';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    // element: <SearchScreen />,

    element: <Navigate to="/search/1" replace />,
  },
  {
    path: 'search/:pageNumber',
    element: <SearchScreen />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'card/:cardId',
        element: <DetailedInformation />,
      },
    ],
  },
]);

const App: React.FC = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      {/* <Counter /> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
