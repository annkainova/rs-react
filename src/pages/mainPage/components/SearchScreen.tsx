import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/searchBar/searchBar';
import { getAnime } from '../../../api/getAnime';
import cl from '../mainPage.module.scss';
import CardSection, { Anime } from './CardSection';
import Loader from '../../../components/loader/Loader';
import BuggyButton from '../../../components/buggyButton/buggyButton';
import useLocalStorage from '../../../hooks/useLocalStorage';

const SearchScreen: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryLocal, , deleteValueLocalStorge] = useLocalStorage('searchQuery');
  const navigate = useNavigate();

  const performSearch = useCallback(
    async (searchQuery: string) => {
      setIsLoading(true);
      const animeListResponse = await getAnime(searchQuery);
      setIsLoading(false);
      setAnimeList(animeListResponse);
      navigate('/');
    },
    [navigate]
  );

  useEffect(() => {
    if (queryLocal) {
      performSearch(queryLocal);
    } else {
      performSearch('');
    }
  }, [performSearch, queryLocal]);

  const handleClickOnLogo = async () => {
    deleteValueLocalStorge();
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
        <h1 onClick={handleClickOnLogo} className={cl.searchScreen__title}>
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
      <section className={cn('container', cl.cardSection)}>
        <div className={cl.cardSection__wrapper}>
          <CardSection animeList={animeList} />
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default SearchScreen;
