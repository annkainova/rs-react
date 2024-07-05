import React from 'react';
import SearchBar from '../../../components/searchBar/searchBar';
import getAnime from '../../../api/getAnime';

import cl from '../mainPage.module.scss';

interface Anime {
  id: string;
  attributes: {
    canonicalTitle: string;
    startDate: string;
    averageRating: string;
    posterImage: {
      large: string;
    };
    coverImage: {
      // original: string;
    };
  };
}

interface SearchScreenProps {}

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

  async componentDidMount() {
    const animeList = await getAnime('One Piece Film: Z');

    this.setState({ animeList });
  }

  render() {
    const { animeList } = this.state;

    return (
      <section>
        <div className={cl.searchScreen}>
          <h1 className={cl.searchScreen__title}>anime.search</h1>
          <div className="grid">
            <div className={cl.searchBox}>
              <SearchBar />
            </div>
          </div>
          <div className="gradient gradient-top"></div>
          <div className="gradient gradient-left"></div>
          <div className="gradient gradient-bottom"></div>
          {animeList.length > 0 && <img src={animeList[0].attributes.coverImage.original} alt="Anime Poster" />}{' '}
        </div>
      </section>
    );
  }
}

export default SearchScreen;
