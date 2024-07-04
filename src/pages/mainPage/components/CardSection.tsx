import cn from 'classnames';
import React from 'react';
import Card from '../../../components/card/Card';
import cl from '../mainPage.module.scss';
import getAnime from '../../../api/getAnime';

interface Anime {
  id: string;
  attributes: {
    canonicalTitle: string;
    startDate: string;
    averageRating: string;
    posterImage: {
      large: string;
    };
  };
}

interface CardSectionProps {}

interface CardSectionState {
  animeList: Anime[];
}

class CardSection extends React.Component<CardSectionProps, CardSectionState> {
  constructor(props: CardSectionProps) {
    super(props);
    this.state = {
      animeList: [],
    };
  }

  async componentDidMount() {
    const animeList = await getAnime('Naruto');
    this.setState({ animeList });
  }

  render() {
    const { animeList } = this.state;

    return (
      <section className={cn('container', cl.cardSection)}>
        <div className={cl.cardSection__box}>
          {animeList.map((anime: Anime) => (
            <Card
              key={anime.id}
              title={anime.attributes.canonicalTitle}
              yearStart={anime.attributes.startDate.slice(0, 4)}
              rating={anime.attributes.averageRating}
              imgLink={anime.attributes.posterImage.large}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default CardSection;
