import React from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import CardInfo from '../../../components/CardInfo/CardInfo';
import { Anime } from './CardSection';

const DetailedInformation: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const { animeList } = useOutletContext<{ animeList: Anime[] }>();
  const anime = animeList.find((item) => item.id === cardId);

  if (!anime) {
    return <></>;
  }

  return (
    anime && (
      <CardInfo
        key={anime.id}
        title={anime.attributes.canonicalTitle}
        yearStart={anime.attributes.startDate}
        rating={anime.attributes.averageRating}
        imgLink={anime.attributes.posterImage.large}
        episods={anime.attributes.totalLength}
        description={anime.attributes.description}
      />
    )
  );
};

export default DetailedInformation;
