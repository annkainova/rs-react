import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../state/store';
import { setCurrentPage, setSearchQuery } from '../../../state/counter/AnimeListSlice';
import { useGetAnimeQuery } from '../../../api/getAnime';

import useLocalStorage from '../../../hooks/useLocalStorage';

import SearchBar from '../../../components/searchBar/searchBar';
import CardSection from './CardSection';
import Loader from '../../../components/loader/Loader';
import Pagination from '../../../components/pagination/Pagination';

import cl from '../mainPage.module.scss';

const SearchScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pageNumber } = useParams<{ pageNumber?: string }>();
  const [queryLocal, setValueLocalStorge, deleteValueLocalStorge] = useLocalStorage('searchQuery');

  const currentPage = useSelector((state: RootState) => state.anime.currentPage);
  const searchQuery = useSelector((state: RootState) => state.anime.searchQuery);

  useEffect(() => {
    if (queryLocal) {
      dispatch(setSearchQuery(queryLocal));
    }
    if (pageNumber) {
      dispatch(setCurrentPage(Number(pageNumber)));
    }
  }, [dispatch, pageNumber, queryLocal]);

  const limit = 8;
  const offset = currentPage * limit;

  const { data, isLoading, isFetching } = useGetAnimeQuery({ request: searchQuery, offset });

  useEffect(() => {
    setValueLocalStorge(searchQuery);
  }, [setValueLocalStorge, searchQuery]);

  useEffect(() => {
    navigate(`/search/${currentPage}`);
  }, [navigate, currentPage]);

  const handleClickOnLogo = () => {
    deleteValueLocalStorge();
    dispatch(setSearchQuery(''));
    dispatch(setCurrentPage(1));
  };

  const defaultImage = 'https://i.imgur.com/i9anCwy.jpg';
  const coverImage = data?.data.length
    ? data.data[0].attributes.coverImage?.original
    : defaultImage;

  return (
    <main>
      <section className={cl.searchScreen}>
        <h1 onClick={handleClickOnLogo} className={cl.searchScreen__title}>
          anime.search
        </h1>
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
          {isFetching || isLoading ? <Loader /> : <CardSection animeList={data?.data || []} />}

          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>

        {!isLoading && <Pagination data={data!.data} />}
      </section>
    </main>
  );
};

export default SearchScreen;
