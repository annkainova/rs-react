import React from 'react';
import cl from './Card.module.scss';
import StarIcon from '../icons/star';

export interface CardProps {
  title: string;
  yearStart: string;
  rating: string;
  imgLink: string;
}

const Card: React.FC<CardProps> = ({ title, yearStart, rating, imgLink }) => (
  <div className={cl.card}>
    <div className={cl.card__img}>
      <div className={cl.rating}>
        <StarIcon />
        {rating}
      </div>
      <div className="gradient gradient-bottom-light"></div>
      <img src={imgLink} alt={`${title} cover`} />
    </div>
    <div className={cl.card__info}>
      <p className={cl.card__title}>{title}</p>
      <div className={cl.bottomBlock}>
        <p className={cl.card__yearStart}>
          {yearStart ? yearStart.slice(0, 4) : ''}
        </p>
      </div>
    </div>
  </div>
);

export default Card;
