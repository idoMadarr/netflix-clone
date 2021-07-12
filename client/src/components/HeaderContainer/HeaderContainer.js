import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import style from './HomeContainer.module.css';
import Logo from './logo.svg';

const HeaderContainer = ({ children, history }) => {
  return (
    <div className={style['header-main']}>
      <div className={style['neflix-nav']}>
        <img src={Logo} alt={'logo'} onClick={() => history.push('/')} />
        <Link to={'/sign-in'}>Sgin In</Link>
      </div>
      {children}
    </div>
  );
};

export default withRouter(HeaderContainer);
