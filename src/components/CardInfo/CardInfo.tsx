import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CardProps } from '../card/Card';
import StarIcon from '../icons/star';
import Button from '../ui/button/Button';

import cl from './CardInfo.module.scss';

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
}) => {
  // const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className={cl.cardInfo__box}>
      <div className={cl.cardInfo__info}>
        <Button onClick={handleClose}>закрыть</Button>

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
      </div>
      <div className={cl.gradient}></div>
      <img className={cl.cardInfo__image} src={imgLink} alt={`poster image ${title}`} />
    </div>
  );
};
export default CardInfo;
