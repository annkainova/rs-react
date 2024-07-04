import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/searchBar/searchBar';
import './index.scss';
import Card from './components/card/Card';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <SearchBar />

      <div>
        <Card
          title="Naruto"
          yearStart="2007"
          ageRating="R"
          imgLink="https://media.kitsu.io/anime/11/poster_image/4512d403727b2a19a6eb7e7a959be0c3.jpg"
        />
      </div>
    </div>{' '}
  </React.StrictMode>,
  document.getElementById('root')
);
