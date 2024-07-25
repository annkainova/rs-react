import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import Button from '../ui/button/Button';
import { setCurrentPage } from '../../state/counter/AnimeListSlice';

import cl from './Pagination.module.scss';

interface PaginationProps {
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.anime.currentPage
  );

  const totalPages = Math.ceil(totalItems / 12);
  const maxPageNumbers = 5;

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    dispatch(setCurrentPage(nextPage));
  };

  const handleStartPage = () => {
    dispatch(setCurrentPage(1));
  };

  const handlePageClick = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    for (let i = startPage; i <= endPage; i += 1) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          isAсtiveState={i === currentPage}
          isMain={false}
          isGrey={true}
        >
          {i}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={cl.pagination}>
      {currentPage > 1 && (
        <Button isMain={true} onClick={handleStartPage}>
          Start
        </Button>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <Button isMain={true} onClick={handleNextPage}>
          Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;
