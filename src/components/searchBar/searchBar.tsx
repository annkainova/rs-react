import React from 'react';
import SearchIcon from '../icons/search';
import Button from '../ui/button/Button';
import Input from '../ui/input/Input';

import cl from './SearchBar.module.scss';

class SearchBar extends React.Component {
  render() {
    return (
      <div className={cl.searchBar}>
        <div className={cl.searchBar__input}>
          <SearchIcon />
          <Input type="text" id="search" placeholder="search" />
        </div>
        <Button>Search</Button>
      </div>
    );
  }
}

export default SearchBar;
