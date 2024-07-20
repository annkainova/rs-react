import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/card/Card';
import cl from '../mainPage.module.scss';
import Input from '../../../components/ui/input/Input';

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
}

const CardSection: React.FC<CardSectionProps> = ({ animeList }) => (
  <>
    <div className={cl.cardSection__box}>
      {animeList.map((anime: Anime) => (
        <div className={cl.cardBox}>
          <Link key={anime.id} to={`card/${anime.id}`}>
            <Card
              title={anime.attributes.canonicalTitle}
              yearStart={anime.attributes.startDate}
              rating={anime.attributes.averageRating}
              imgLink={anime.attributes.posterImage.large}
            />
          </Link>
          <div className={cl.checkboxBox}>
            {' '}
            <Input type="checkbox" id="checkbox" />
          </div>
        </div>
      ))}
    </div>
    {animeList.length === 0 && (
      <p className={cl.cardSection__message}> Unfortunately we didn't find anything</p>
    )}
  </>
);

export default CardSection;
