import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SearchScreen from './pages/mainPage/components/SearchScreen';
import ErrorPage from './pages/errorPage/ErorrPage';
import DetailedInformation from './pages/mainPage/components/DetailedInformation';
import ThemeContext from './ThemeContext';

import { store } from './state/store';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchScreen />,
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
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

const App: React.FC = () => {
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'dark');

  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeContext.Provider>
  );
};

export default App;
