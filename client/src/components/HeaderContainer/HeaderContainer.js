import React from 'react';

import Header from '../Header/Header';

import style from './HomeContainer.module.css';

const HeaderContainer = ({ children }) => {
  return (
    <div className={style['header-main']}>
      <Header />
      {children}
    </div>
  );
};

export default HeaderContainer;
