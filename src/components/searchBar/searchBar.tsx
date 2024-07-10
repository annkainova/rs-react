import React, { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../ui/button/Button';
import Input from '../ui/input/Input';
import cl from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
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
