import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentPage,
  setSearchQuery,
} from '../../state/slice/AnimeListSlice';

import useLocalStorage from '../../hooks/useLocalStorage';

import Button from '../ui/button/Button';
import Input from '../ui/input/Input';

import cl from './SearchBar.module.scss';
import SearchIcon from '../icons/search';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [queryLocal, setValueLocalStorge] = useLocalStorage('searchQuery');

  useEffect(() => {
    setQuery(queryLocal);
  }, [queryLocal]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    setValueLocalStorge(trimmedQuery);
    dispatch(setSearchQuery(trimmedQuery));
    dispatch(setCurrentPage(1));
    navigate('/search/1');
  };

  return (
    <form onSubmit={handleSubmit} className={cl.searchBar}>
      <div className={cl.searchBar__input}>
        <SearchIcon />
        <Input
          type="text"
          id="search"
          value={query}
          onChange={handleChange}
          placeholder="Search More"
        />
      </div>
      <Button isMain={true}>Search</Button>
    </form>
  );
};

export default SearchBar;
