import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Button from '../ui/button/Button';
import Input from '../ui/input/Input';
import cl from './SearchBar.module.scss';

import useLocalStorage from '../../hooks/useLocalStorage';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
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
    onSearch(trimmedQuery);
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
