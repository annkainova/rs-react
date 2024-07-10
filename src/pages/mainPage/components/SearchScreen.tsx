import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import SearchBar from '../../../components/searchBar/searchBar';
import getAnime from '../../../api/getAnime';
import cl from '../mainPage.module.scss';
import CardSection, { Anime } from './CardSection';
import Loader from '../../../components/loader/Loader';
import BuggyButton from '../../../components/buggyButton/buggyButton';

const SearchScreen: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = async (query: string) => {
    setIsLoading(true);
    const animeListResponse = await getAnime(query);
    setIsLoading(false);
    setAnimeList(animeListResponse);
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    performSearch(savedQuery);
  }, []);

  const handleClickonLogo = async () => {
    localStorage.clear();
    performSearch('');
  };

  const defaultImage = 'https://i.imgur.com/i9anCwy.jpg';
  const coverImage =
    animeList.length > 0 && animeList[0].attributes.coverImage
      ? animeList[0].attributes.coverImage.original
      : defaultImage;

  return (
    <main>
      <section className={cl.searchScreen}>
        <div className={cl.ButtomError}>
          <BuggyButton />
        </div>
        <h1 onClick={handleClickonLogo} className={cl.searchScreen__title}>
          anime.search
        </h1>
        {isLoading && <Loader />}

        <div className="grid">
          <div className={cl.searchBox}>
            <SearchBar onSearch={performSearch} />
          </div>
        </div>
        <div className="gradient gradient-top"></div>
        <div className="gradient gradient-left"></div>
        <div className="gradient gradient-bottom"></div>
        <img src={coverImage} alt="Anime Poster" />
      </section>
      <CardSection animeList={animeList} />

      <nav>
        <ul>
          <li>
            <Link to={`contacts/1`}>Your Name</Link>
          </li>
          <li>
            <Link to={`contacts/2`}>Your Friend</Link>
          </li>
        </ul>
      </nav>

      <div id="detail">
        <Outlet />
      </div>
    </main>
  );
};

export default SearchScreen;
