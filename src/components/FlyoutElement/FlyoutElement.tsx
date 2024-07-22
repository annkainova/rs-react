import cn from 'classnames';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../ui/button/Button';

import cl from './FlyoutElement.module.scss';
import { RootState } from '../../state/store';
import { deleteAllSelectedElements } from '../../state/counter/AnimeListSlice';
import ThemeContext from '../../ThemeContext';

interface FlyoutElementProps {
  countElements: number;
}
const FlyoutElement: React.FC<FlyoutElementProps> = ({ countElements }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.anime.selectedElements
  );
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark';

  const handleClickUnselectAll = () => {
    dispatch(deleteAllSelectedElements());
  };

  const handleClickDownload = () => {
    // eslint-disable-next-line no-console
    console.log(selectedItems);
  };

  return (
    <div className={cn(!isDarkMode && cl.lightMode, cl.flyoutElement)}>
      <p className={cl.flyoutElement__text}>{countElements} items selected</p>
      <div className={cl.buttonBox}>
        <Button isMain={true} onClick={handleClickDownload}>
          Download
        </Button>
        <Button
          isMain={true}
          isOutline={isDarkMode}
          isGrey={!isDarkMode}
          onClick={handleClickUnselectAll}
        >
          Unselect all
        </Button>
      </div>
    </div>
  );
};

export default FlyoutElement;
