import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, /* useNavigate, */ useParams } from 'react-router-dom';
import SearchBar from '../../../components/searchBar/searchBar';
import { useGetAnimeQuery } from '../../../api/getAnime';
import cl from '../mainPage.module.scss';
import CardSection /* Anime */ from './CardSection';
import Loader from '../../../components/loader/Loader';
// import useLocalStorage from '../../../hooks/useLocalStorage';
import Button from '../../../components/ui/button/Button';
import ArrowBack from '../../../components/icons/arrowBack';
import ArrowForward from '../../../components/icons/arrowForward';
import { RootState } from '../../../state/store';
import { setCurrentPage, setSearchQuery } from '../../../state/counter/AnimeListSlice';

const SearchScreen: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pageNumber } = useParams<{ pageNumber?: string }>();

  // const [currentPage, setCurrentPage] = useState(Number(pageNumber) || 1);
  // const [queryLocal, , deleteValueLocalStorge] = useLocalStorage('searchQuery');

  const currentPage = useSelector((state: RootState) => state.anime.currentPage);
  const searchQuery = useSelector((state: RootState) => state.anime.searchQuery);

  useEffect(() => {
    if (pageNumber) {
      dispatch(setCurrentPage(Number(pageNumber)));
    }
  }, [dispatch, pageNumber]);

  const limit = 8;
  const offset = currentPage * limit;

  const { data, /* error, */ isLoading } = useGetAnimeQuery({ request: searchQuery, offset });

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const handlePreviousPage = () => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    setCurrentPage(prevPage);
  };

  const handleClickOnLogo = async () => {
    // deleteValueLocalStorge();
    // performSearch('');
    setCurrentPage(1);
  };

  const performSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    setCurrentPage(1);
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
            <SearchBar onSearch={performSearch} />
          </div>
        </div>
        <div className="gradient gradient-top"></div>
        <div className="gradient gradient-left"></div>
        <div className="gradient gradient-bottom"></div>
        <img src={coverImage} alt="Anime Poster" />
      </section>
      <section className={cl.cardSection}>
        <div className={cl.cardSection__wrapper}>
          {isLoading ? <Loader /> : <CardSection animeList={data?.data || []} />}
          <Outlet />
        </div>

        {!isLoading && (
          <div className={cl.paginationButtons}>
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <ArrowBack />
            </Button>
            <Button onClick={handleNextPage} disabled={data?.data.length === 0}>
              <ArrowForward />
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default SearchScreen;
