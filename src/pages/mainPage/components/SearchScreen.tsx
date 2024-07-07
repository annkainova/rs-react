import React from 'react';
import SearchBar from '../../../components/searchBar/searchBar';
import getAnime from '../../../api/getAnime';
import cl from '../mainPage.module.scss';
import { Anime } from './CardSection';
import Loader from '../../../components/loader/Loader';
import BuggyButton from '../../../components/buggyButton/buggyButton';

interface SearchScreenProps {
  // eslint-disable-next-line no-unused-vars
  onSearchResults: (animeList: Anime[]) => void;
}

interface SearchScreenState {
  animeList: Anime[];
  isLoading: boolean;
}

class SearchScreen extends React.Component<SearchScreenProps, SearchScreenState> {
  constructor(props: SearchScreenProps) {
    super(props);
    this.state = {
      animeList: [],
      isLoading: false,
    };
  }

  performSearch = async (query: string) => {
    this.setState({ isLoading: true });
    const animeList = await getAnime(query);
    this.setState({ animeList, isLoading: false });
    this.props.onSearchResults(animeList);
  };

  async componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    await this.performSearch(savedQuery);
  }

  handleClickonLogo = async () => {
    localStorage.setItem('searchQuery', '');
    await this.performSearch('');
  };

  render() {
    const { animeList, isLoading } = this.state;
    const defaultImage =
      '../../../../public/frieren-frieren-beyond-journeys-end-hd-wallpaper-uhdpaper.com-172@3@a.jpg';
    const coverImage =
      animeList.length > 0 && animeList[0].attributes.coverImage
        ? animeList[0].attributes.coverImage.original
        : defaultImage;

    return (
      <section className={cl.searchScreen}>
        <div className={cl.ButtomError}>
          <BuggyButton />
        </div>
        <h1 onClick={this.handleClickonLogo} className={cl.searchScreen__title}>
          anime.search
        </h1>
        {isLoading && <Loader />}

        <div className="grid">
          <div className={cl.searchBox}>
            <SearchBar onSearch={this.performSearch} />
          </div>
        </div>
        <div className="gradient gradient-top"></div>
        <div className="gradient gradient-left"></div>
        <div className="gradient gradient-bottom"></div>
        <img src={coverImage} alt="Anime Poster" />
      </section>
    );
  }
}

export default SearchScreen;
