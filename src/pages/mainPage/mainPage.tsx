import React from 'react';
import SearchScreen from './components/SearchScreen';
import CardSection from './components/CardSection';

interface MainPageProps {}

interface MainPageState {}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <main>
        <SearchScreen />
        <CardSection />
      </main>
    );
  }
}

export default MainPage;
