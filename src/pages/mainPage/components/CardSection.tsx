import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../../components/card/Card';
import cl from '../mainPage.module.scss';

export interface Anime {
  id: string;
  attributes: {
    canonicalTitle: string;
    description: string;
    totalLength: string;
    startDate: string;
    averageRating: string;
    posterImage: {
      large: string;
    };
    coverImage: {
      original: string;
    };
  };
}

interface CardSectionProps {
  animeList: Anime[];
  // onCardClick: (animeId: string) => void;
}

const CardSection: React.FC<CardSectionProps> = ({ animeList /* , onCardClick */ }) => (
  <>
    <div className={cl.cardSection__box}>
      {animeList.map((anime: Anime) => (
        <Link key={anime.id} to={`card/${anime.id}`} /* onClick={() => onCardClick(anime.id)} */>
          <Card
            title={anime.attributes.canonicalTitle}
            yearStart={anime.attributes.startDate}
            rating={anime.attributes.averageRating}
            imgLink={anime.attributes.posterImage.large}
          />
        </Link>
      ))}
    </div>
    {animeList.length === 0 && (
      <p className={cl.cardSection__message}> Unfortunately we didn't find anything</p>
    )}
  </>
);

export default CardSection;
