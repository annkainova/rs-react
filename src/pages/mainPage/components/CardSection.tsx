import cn from 'classnames';
import React from 'react';
import Card from '../../../components/card/Card';
import cl from '../mainPage.module.scss';

interface CardSectionProps {}

interface CardSectionState {}

class CardSection extends React.Component<CardSectionProps, CardSectionState> {
  render() {
    return (
      <section className={cn('container', cl.cardSection)}>
        <div className={cl.cardSection__box}>
          <Card
            title="Naruto"
            yearStart="2007"
            ageRating="R"
            imgLink="https://media.kitsu.io/anime/11/poster_image/4512d403727b2a19a6eb7e7a959be0c3.jpg"
          />
        </div>
      </section>
    );
  }
}

export default CardSection;
