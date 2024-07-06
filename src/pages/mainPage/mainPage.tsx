import React from 'react';
import SearchScreen from './components/SearchScreen';
import CardSection, { Anime } from './components/CardSection';

interface MainPageProps {}

interface MainPageState {
  animeList: Anime[];
}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);
    this.state = {
      animeList: [],
    };
  }

  handleSearchResults = (animeList: Anime[]) => {
    this.setState({ animeList });
  };

  render() {
    const { animeList } = this.state;
    return (
      <main>
        <SearchScreen onSearchResults={this.handleSearchResults} />
        <CardSection animeList={animeList} />
      </main>
    );
  }
}

export default MainPage;
