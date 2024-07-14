import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../../../components/searchBar/searchBar';
import { getAnime } from '../../../api/getAnime';
import cl from '../mainPage.module.scss';
import CardSection, { Anime } from './CardSection';
import Loader from '../../../components/loader/Loader';
import BuggyButton from '../../../components/buggyButton/buggyButton';
import useLocalStorage from '../../../hooks/useLocalStorage';
import Button from '../../../components/ui/button/Button';

const SearchScreen: React.FC = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(Number(pageNumber) || 1);

  const [queryLocal, , deleteValueLocalStorge] = useLocalStorage('searchQuery');
  const navigate = useNavigate();

  const performSearch = useCallback(
    async (searchQuery: string, page: number = 1) => {
      setIsLoading(true);
      const limit = 8;
      const offset = page * limit;
      const animeListResponse = await getAnime(searchQuery, limit, offset);
      setIsLoading(false);
      setAnimeList(animeListResponse);
      if (page === 1) {
        navigate(`/`);
      } else {
        navigate(`/search/${page}`);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (queryLocal) {
      performSearch(queryLocal, currentPage);
    } else {
      performSearch('', currentPage);
    }
  }, [performSearch, queryLocal, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleClickOnLogo = async () => {
    deleteValueLocalStorge();
    performSearch('');
    setCurrentPage(1);
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
          {isLoading ? <Loader /> : <CardSection animeList={animeList} />}
          <Outlet />
        </div>
        {animeList.length !== 0 ? (
          <div className={cl.paginationButtons}>
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button onClick={handleNextPage}>Next</Button>
          </div>
        ) : (
          <></>
        )}
      </section>
    </main>
  );
};

export default SearchScreen;
