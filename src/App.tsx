import React from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchScreen from './pages/mainPage/components/SearchScreen';

const App: React.FC = () => (
  <ErrorBoundary>
    <SearchScreen />
  </ErrorBoundary>
);

export default App;
