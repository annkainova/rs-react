import React from 'react';
import Button from '../ui/button/Button';
import Input from '../ui/input/Input';

import cl from './SearchBar.module.scss';

class SearchBar extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className={cl.searchBar}>
        <Input type="text" id="search" placeholder="Search More" />
        <Button>Search</Button>
      </div>
    );
  }
}

export default SearchBar;
