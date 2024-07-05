import cn from 'classnames';
import React from 'react';
import Card from '../../../components/card/Card';
import cl from '../mainPage.module.scss';

export interface Anime {
  id: string;
  attributes: {
    canonicalTitle: string;
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

// interface CardSectionState {
//   animeList: Anime[];
// }

const CardSection: React.FC<CardSectionProps> = ({ animeList }) => (
  <section className={cn('container', cl.cardSection)}>
    <div className={cl.cardSection__box}>
      {animeList.map((anime: Anime) => (
        <Card
          key={anime.id}
          title={anime.attributes.canonicalTitle}
          yearStart={anime.attributes.startDate}
          rating={anime.attributes.averageRating}
          imgLink={anime.attributes.posterImage.large}
        />
      ))}
    </div>
  </section>
);

export default CardSection;
