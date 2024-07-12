import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnimeById } from '../../../api/getAnime';
import { Anime } from './CardSection';

import Loader from '../../../components/loader/Loader';
import CardInfo from '../../../components/CardInfo/CardInfo';

import cl from '../../../components/CardInfo/CardInfo.module.scss';

const DetailedInformation: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [anime, setAnime] = useState<Anime | null>(null);

  const searchAnimeById = async (id: string) => {
    setIsLoading(true);
    const searchAnimeResponse = await getAnimeById(id);
    setIsLoading(false);
    setAnime(searchAnimeResponse);
  };

  useEffect(() => {
    if (cardId) {
      setIsLoading(true);
      searchAnimeById(cardId);
    }
  }, [cardId]);

  if (isLoading) {
    return (
      <div className={cl.cardInfo}>
        <Loader />
        <div className={cl.gradient}></div>
      </div>
    );
  }

  if (!anime) {
    return <></>;
  }

  return (
    <div className={cl.cardInfo}>
      <CardInfo
        key={anime.id}
        title={anime.attributes.canonicalTitle}
        yearStart={anime.attributes.startDate}
        rating={anime.attributes.averageRating}
        imgLink={anime.attributes.posterImage.large}
        episods={anime.attributes.totalLength}
        description={anime.attributes.description}
      />
    </div>
  );
};

export default DetailedInformation;
