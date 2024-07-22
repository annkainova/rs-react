import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../ui/button/Button';

import cl from './FlyoutElement.module.scss';
import { RootState } from '../../state/store';
import { deleteAllSelectedElements } from '../../state/counter/AnimeListSlice';

interface FlyoutElementProps {
  countElements: number;
}
const FlyoutElement: React.FC<FlyoutElementProps> = ({ countElements }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.anime.selectedElements
  );

  const handleClickUnselectAll = () => {
    dispatch(deleteAllSelectedElements());
  };

  const handleClickDownload = () => {
    // eslint-disable-next-line no-console
    console.log(selectedItems);
  };

  return (
    <div className={cl.flyoutElement}>
      <p className={cl.flyoutElement__text}>{countElements} items selected</p>
      <div className={cl.buttonBox}>
        <Button isMain={true} onClick={handleClickDownload}>
          Download
        </Button>
        <Button isMain={true} isOutline={true} onClick={handleClickUnselectAll}>
          Unselect all
        </Button>
      </div>
    </div>
  );
};

export default FlyoutElement;
