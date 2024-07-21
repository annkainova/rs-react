import React from 'react';
import Button from '../ui/button/Button';

import cl from './FlyoutElement.module.scss';

interface FlyoutElementProps {
  countElements: number;
}
const FlyoutElement: React.FC<FlyoutElementProps> = ({ countElements }) => (
  <div className={cl.flyoutElement}>
    <p className={cl.flyoutElement__text}>{countElements} items selected</p>
    <div className={cl.buttonBox}>
      <Button isMain={true}>Download</Button>
      <Button isMain={true} isOutline={true}>
        Unselect all
      </Button>
    </div>
  </div>
);

export default FlyoutElement;
