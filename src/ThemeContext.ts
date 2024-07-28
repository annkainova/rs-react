import { createContext } from 'react';

const ThemeContext = createContext({
  mode: 'dark' || 'light',
  toggleTheme: () => {},
});

export default ThemeContext;
