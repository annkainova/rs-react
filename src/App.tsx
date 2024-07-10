import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchScreen from './pages/mainPage/components/SearchScreen';
import ErrorPage from './pages/errorPage/ErorrPage';
import CardInfo from './pages/CardInfo/CardInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchScreen />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: 'contacts/:contactId',
        element: <CardInfo />,
      },
    ],
  },
]);

const App: React.FC = () => (
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
);

export default App;
