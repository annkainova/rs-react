import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/searchBar/searchBar';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <SearchBar />
    </div>{' '}
  </React.StrictMode>,
  document.getElementById('root')
);
