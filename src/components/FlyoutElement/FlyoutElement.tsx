import cn from 'classnames';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../ui/button/Button';

import cl from './FlyoutElement.module.scss';
import { RootState } from '../../state/store';
import { deleteAllSelectedElements } from '../../state/slice/AnimeListSlice';
import ThemeContext from '../../ThemeContext';
import DownloadButton from './components/DownloadButton';

const FlyoutElement: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.anime.selectedElements
  );
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark';

  const handleClickUnselectAll = () => {
    dispatch(deleteAllSelectedElements());
  };

  return (
    <div className={cn(!isDarkMode && cl.lightMode, cl.flyoutElement)}>
      <p className={cl.flyoutElement__text}>
        {selectedItems.length} items selected
      </p>
      <div className={cl.buttonBox}>
        <DownloadButton />
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
