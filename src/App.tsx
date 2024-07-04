import React from 'react';
import MainPage from './pages/mainPage/mainPage';

interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <MainPage />;
  }
}

export default App;
