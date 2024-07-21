import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import ArrowBack from '../icons/arrowBack';
import ArrowForward from '../icons/arrowForward';
import Button from '../ui/button/Button';
import { setCurrentPage } from '../../state/counter/AnimeListSlice';
import { Anime } from '../../pages/mainPage/components/CardSection';

import cl from './Pagination.module.scss';

interface PaginationProps {
  data: Anime[];
}

const Pagination: React.FC<PaginationProps> = ({ data }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.anime.currentPage
  );

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    dispatch(setCurrentPage(nextPage));
  };

  const handlePreviousPage = () => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    dispatch(setCurrentPage(prevPage));
  };

  return (
    <div className={cl.paginationButtons}>
      <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
        <ArrowBack />
      </Button>
      <Button onClick={handleNextPage} disabled={data?.length === 0}>
        <ArrowForward />
      </Button>
    </div>
  );
};

export default Pagination;
