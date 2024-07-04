import React from 'react';
import SearchBar from '../../../components/searchBar/searchBar';

import cl from '../mainPage.module.scss';
import image from '../../../../public/frieren-frieren-beyond-journeys-end-hd-wallpaper-uhdpaper.com-172@3@a.jpg';

interface SearchScreenProps {}

interface SearchScreenState {}

class SearchScreen extends React.Component<SearchScreenProps, SearchScreenState> {
  // eslint-disable-next-line class-methods-use-this
  render() {
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

          <img src={image} alt="/" />
        </div>
      </section>
    );
  }
}

export default SearchScreen;
