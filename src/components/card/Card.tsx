import React from 'react';
import cl from './Card.module.scss';

interface CardProps {
  title: string;
  yearStart: string;
  ageRating: string;
  imgLink: string;
}

interface CardState {}

class Card extends React.Component<CardProps, CardState> {
  render() {
    return (
      <div className={cl.card}>
        <div className={cl.card__img}>
          <div className={cl.rating}>{this.props.ageRating}</div>
          <div className={cl.test}></div>
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
