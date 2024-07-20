import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetAnimeByIdQuery } from '../../../api/getAnime';

import Loader from '../../../components/loader/Loader';
import CardInfo from '../../../components/CardInfo/CardInfo';

import cl from '../../../components/CardInfo/CardInfo.module.scss';
import { setDetailCard } from '../../../state/counter/AnimeListSlice';

const DetailedInformation: React.FC = () => {
  const dispatch = useDispatch();
  const { cardId } = useParams<{ cardId: string }>();
  const { data, isFetching } = useGetAnimeByIdQuery({ animeId: cardId });

  useEffect(() => {
    if (data) {
      dispatch(setDetailCard(data.data));
    }
  }, [data, dispatch]);

  if (isFetching) {
    return (
      <div className={cl.cardInfo}>
        <Loader />
        <div className={cl.gradient}></div>
      </div>
    );
  }

  if (!data?.data) {
    return <></>;
  }

  return (
    <div className={cl.cardInfo}>
      <CardInfo
        key={data?.data.id}
        title={data!.data.attributes.canonicalTitle}
        yearStart={data!.data.attributes.startDate}
        rating={data!.data.attributes.averageRating}
        imgLink={data!.data.attributes.posterImage.large}
        episods={data!.data.attributes.totalLength}
        description={data!.data.attributes.description}
      />
    </div>
  );
};

export default DetailedInformation;
