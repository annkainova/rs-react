import React from 'react';
import SearchBar from '../../../components/searchBar/searchBar';
import getAnime from '../../../api/getAnime';
import cl from '../mainPage.module.scss';
import { Anime } from './CardSection';
// import image from '../../../../public/frieren-frieren-beyond-journeys-end-hd-wallpaper-uhdpaper.com-172@3@a.jpg';

interface SearchScreenProps {
  // eslint-disable-next-line no-unused-vars
  onSearchResults: (animeList: Anime[]) => void;
}

interface SearchScreenState {
  animeList: Anime[];
}

class SearchScreen extends React.Component<SearchScreenProps, SearchScreenState> {
  constructor(props: SearchScreenProps) {
    super(props);
    this.state = {
      animeList: [],
    };
  }

  performSearch = async (query: string) => {
    const animeList = await getAnime(query);
    // console.log('animeList');
    this.setState({ animeList });
    this.props.onSearchResults(animeList);
  };

  async componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    await this.performSearch(savedQuery);
  }

  render() {
    const { animeList } = this.state;

    return (
      <section>
        <div className={cl.searchScreen}>
          <h1 className={cl.searchScreen__title}>anime.search</h1>
          <div className="grid">
            <div className={cl.searchBox}>
              <SearchBar onSearch={this.performSearch} />
            </div>
          </div>
          <div className="gradient gradient-top"></div>
          <div className="gradient gradient-left"></div>
          <div className="gradient gradient-bottom"></div>
          {animeList.length > 0 ? (
            <img src={animeList[0].attributes.coverImage.original} alt="Anime Poster" />
          ) : (
            <img
              src="../../../../public/frieren-frieren-beyond-journeys-end-hd-wallpaper-uhdpaper.com-172@3@a.jpg"
              alt="Anime Poster"
            />
          )}
        </div>
      </section>
    );
  }
}

export default SearchScreen;
