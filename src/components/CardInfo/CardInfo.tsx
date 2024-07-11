import React from 'react';

import cl from './CardInfo.module.scss';
import { CardProps } from '../card/Card';
import StarIcon from '../icons/star';

interface CardInfoProps extends CardProps {
  episods: string;
  description: string;
}

const CardInfo: React.FC<CardInfoProps> = ({
  title,
  yearStart,
  rating,
  imgLink,
  episods,
  description,
}) => (
  <div className={cl.cardInfo}>
    <h2 className={cl.cardInfo__header}>{title}</h2>
    <div className={cl.cardInfo__additional}>
      <div className={cl.cardInfo__rating}>
        <StarIcon />
        {rating}
      </div>
      <p>{episods}</p>
      <p>{yearStart}</p>
    </div>
    <p className={cl.cardInfo__description}>{description}</p>
    <img className={cl.cardInfo__image} src={imgLink} alt={`poster image ${title}`} />
  </div>
);

export default CardInfo;
