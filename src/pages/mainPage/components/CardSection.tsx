import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../../../components/card/Card';
import cl from '../mainPage.module.scss';
import Input from '../../../components/ui/input/Input';
import { RootState } from '../../../state/store';
import {
  deleteSelectedElements,
  setSelectedElements,
} from '../../../state/counter/AnimeListSlice';
import FlyoutElement from '../../../components/FlyoutElement/FlyoutElement';

export interface Anime {
  id: string;
  attributes: {
    canonicalTitle: string;
    description: string;
    totalLength: string;
    startDate: string;
    averageRating: string;
    posterImage: {
      large: string;
    };
    coverImage: {
      original: string;
    };
  };
}

interface CardSectionProps {
  animeList: Anime[];
}

const CardSection: React.FC<CardSectionProps> = ({ animeList }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.anime.selectedElements
  );

  const handleChangeCheckbox = (chosenAnime: Anime) => {
    const isSelected = selectedItems.includes(chosenAnime);

    if (isSelected) {
      dispatch(deleteSelectedElements(chosenAnime.id));
    } else {
      dispatch(setSelectedElements(chosenAnime));
    }
  };

  return (
    <>
      {selectedItems.length >= 1 && (
        <FlyoutElement countElements={selectedItems.length} />
      )}

      <div className={cl.cardSection__box}>
        {animeList.map((anime: Anime) => (
          <div key={anime.id} className={cl.cardBox}>
            <Link to={`card/${anime.id}`}>
              <Card
                title={anime.attributes.canonicalTitle}
                yearStart={anime.attributes.startDate}
                rating={anime.attributes.averageRating}
                imgLink={anime.attributes.posterImage.large}
              />
            </Link>
            <div className={cl.checkboxBox}>
              {' '}
              <Input
                // key={anime.id}
                type="checkbox"
                id="checkbox"
                onChange={() => handleChangeCheckbox(anime)}
                checked={selectedItems.some(
                  (itemAnime) => anime.id === itemAnime.id
                )}
              />
            </div>
          </div>
        ))}
      </div>
      {animeList.length === 0 && (
        <p className={cl.cardSection__message}>
          {' '}
          Unfortunately we didn't find anything
        </p>
      )}
    </>
  );
};

export default CardSection;
