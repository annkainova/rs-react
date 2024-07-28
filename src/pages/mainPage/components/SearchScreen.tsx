import cn from 'classnames';
import React, { Suspense, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../state/store';
import {
  clearSearchQuery,
  setCurrentPage,
  setSearchQuery,
} from '../../../state/counter/AnimeListSlice';
import { useGetAnimeQuery } from '../../../api/getAnime';

import useLocalStorage from '../../../hooks/useLocalStorage';

import SearchBar from '../../../components/searchBar/searchBar';
import CardSection from './CardSection';
import Loader from '../../../components/loader/Loader';
import Pagination from '../../../components/pagination/Pagination';

import cl from '../mainPage.module.scss';
import Button from '../../../components/ui/button/Button';
import ThemeContext from '../../../ThemeContext';
import Moon from '../../../components/icons/moon';
import Sun from '../../../components/icons/sun';

const SearchScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pageNumber } = useParams<{ pageNumber?: string }>();
  const [queryLocal, setValueLocalStorge, deleteValueLocalStorge] =
    useLocalStorage('searchQuery');
  const { mode, toggleTheme } = useContext(ThemeContext);

  const currentPage = useSelector(
    (state: RootState) => state.anime.currentPage
  );
  const searchQuery = useSelector(
    (state: RootState) => state.anime.searchQuery
  );

  const limit = 12;
  const offset = currentPage * limit;

  const { data, isLoading, isFetching } = useGetAnimeQuery({
    request: searchQuery,
    offset,
  });

  useMemo(() => {
    if (queryLocal) {
      dispatch(setSearchQuery(queryLocal));
    }
    if (pageNumber) {
      dispatch(setCurrentPage(Number(pageNumber)));
    }
  }, [dispatch, pageNumber, queryLocal]);

  useEffect(() => {
    if (searchQuery) {
      setValueLocalStorge(searchQuery);
    }
  }, [setValueLocalStorge, searchQuery]);

  useEffect(() => {
    navigate(`/search/${currentPage}`);
  }, [navigate, currentPage]);

  const handleClickOnLogo = () => {
    dispatch(clearSearchQuery());
    dispatch(setCurrentPage(1));
    navigate(`/search/1`);
    deleteValueLocalStorge();
  };

  const totalItems = data?.meta.count || 0;
  const defaultImage = 'https://i.imgur.com/i9anCwy.jpg';
  const coverImage = data?.data.length
    ? data.data[0].attributes.coverImage?.original
    : defaultImage;

  const isDarkMode = mode === 'dark';

  return (
    <main className={cn(isDarkMode ? 'darkMode' : 'lightMode')}>
      <div className={cl.topBox}>
        <h1 onClick={handleClickOnLogo} className={cl.logo}>
          anime.search
        </h1>
        <Button onClick={toggleTheme} isOutline={true} role="themeButton">
          {isDarkMode ? <Sun /> : <Moon />}
        </Button>
      </div>
      <section className={cl.searchScreen}>
        <div className="grid">
          <div className={cl.searchBox}>
            <SearchBar />
          </div>
        </div>
        <div className="gradient gradient-top"></div>
        <div className="gradient gradient-left"></div>
        <div className="gradient gradient-bottom"></div>
        <img src={coverImage} alt="Anime Poster" />
      </section>
      <section className={cl.cardSection}>
        <div className={cl.cardSection__wrapper}>
          {isFetching || isLoading ? (
            <Loader />
          ) : (
            <CardSection animeList={data?.data || []} />
          )}

          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>

        {data?.data.length !== 0 ? (
          !isFetching && <Pagination totalItems={totalItems} />
        ) : (
          <></>
        )}
      </section>
    </main>
  );
};

export default SearchScreen;
