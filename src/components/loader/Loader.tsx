import React from 'react';
import cl from './Loader.module.scss';

const Loader: React.FC = () => (
  <div className={cl.loaderContainer}>
    <div className={cl.loader}></div>
  </div>
);

export default Loader;
