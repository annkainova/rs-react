import React from 'react';
import cl from './Card.module.scss';
import StarIcon from '../icons/star';

interface CardProps {
  title: string;
  yearStart: string;
  rating: string;
  imgLink: string;
}

interface CardState {}

class Card extends React.Component<CardProps, CardState> {
  render() {
    return (
      <div className={cl.card}>
        <div className={cl.card__img}>
          <div className={cl.rating}>
            <StarIcon />
            {this.props.rating}
          </div>
          <div className="gradient gradient-bottom-light"></div>
          <img src={this.props.imgLink} alt={`${this.props.title} cover`} />
        </div>
        <div className={cl.card__info}>
          <p className={cl.card__title}>{this.props.title}</p>
          <p className={cl.card__yearStart}>{this.props.yearStart}</p>
        </div>
      </div>
    );
  }
}

export default Card;
