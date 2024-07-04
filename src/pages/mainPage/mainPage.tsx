import React from 'react';
import SearchScreen from './components/SearchScreen';
import CardSection from './components/CardSection';

interface MainPageProps {}

interface MainPageState {}

class MainPage extends React.Component<MainPageProps, MainPageState> {
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
