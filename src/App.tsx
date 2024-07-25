import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SearchScreen from './pages/mainPage/components/SearchScreen';
import ErrorPage from './pages/errorPage/ErorrPage';
import DetailedInformation from './pages/mainPage/components/DetailedInformation';
import ThemeContext from './ThemeContext';

import { store } from './state/store';

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
]);

const App: React.FC = () => {
  const choosenMode = localStorage.getItem('mode') || 'dark';

  const [mode, setIsDarkMode] = useState(choosenMode);

  const toggleTheme = () => {
    if (mode === 'dark') {
      setIsDarkMode('light');
      localStorage.setItem('mode', 'light');
    } else {
      setIsDarkMode('dark');
      localStorage.setItem('mode', 'dark');
    }
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
