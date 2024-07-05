import React, { ChangeEvent, FormEvent } from 'react';
import Button from '../ui/button/Button';
import Input from '../ui/input/Input';
import cl from './SearchBar.module.scss';

interface SearchBarProps {
  // eslint-disable-next-line no-unused-vars
  onSearch: (query: string) => void;
}

interface SearchBarState {
  query: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = this.state.query.trim();
    if (trimmedQuery) {
      this.props.onSearch(trimmedQuery);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={cl.searchBar}>
        <Input
          type="text"
          id="search"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Search More"
        />
        <Button>Search</Button>
      </form>
    );
  }
}

export default SearchBar;
