import React from 'react';
import MainPage from './pages/mainPage/mainPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    );
  }
}

export default App;
