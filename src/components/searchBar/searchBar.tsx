import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/button/Button';
import Input from '../ui/input/Input';
import cl from './SearchBar.module.scss';

import useLocalStorage from '../../hooks/useLocalStorage';

interface SearchBarProps {
  onSearch: (query: string, page: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [queryLocal, setValueLocalStorge] = useLocalStorage('searchQuery');
  const navigate = useNavigate();

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
    const numberFirstPage = 1;
    onSearch(trimmedQuery, numberFirstPage);
    navigate(`/search/1`);
  };

  return (
    <form onSubmit={handleSubmit} className={cl.searchBar}>
      <Input
        type="text"
        id="search"
        value={query}
        onChange={handleChange}
        placeholder="Search More"
      />
      <Button isMain={true}>Search</Button>
    </form>
  );
};

export default SearchBar;
