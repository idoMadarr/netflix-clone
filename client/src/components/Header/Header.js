import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  LOGOUT,
  RESTART_CREDENTIALS,
} from '../../store/actionTypes/actionTypes';

import style from './Header.module.css';
import Logo from './logo.svg';
import icons from '../../fixtures/icons.json';

const Header = ({ history }) => {
  const [widthScreen] = useState({ windowWidth: window.innerWidth });
  const [manuState, setManuState] = useState(false);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const username = useSelector((state) => state.authReducer.username);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    dispatch({ type: LOGOUT });
    dispatch({ type: RESTART_CREDENTIALS });
    history.push('/');
  };

  const onClickHandler = () => {
    if (widthScreen.windowWidth <= 375) {
      setManuState(!manuState);
    }
  };

  let controller = (
    <Link to={'/sign-in'} className={style['sign-in']}>
      Sgin In
    </Link>
  );
  if (isAuth) {
    controller = (
      <div className={style['icon-container']} onClick={onClickHandler}>
        <div>
          <p>{username}</p>
          <i className='fas fa-user'></i>
          <img
            src={icons[0].icon}
            alt={'icon'}
            className={style['user-icon']}
          />
        </div>
        <ul className={style[manuState ? 'onClicssk' : '']}>
          <li>
            <Link to={'/favorites'}>Favorites</Link>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className={style['neflix-nav']}>
      <img
        src={Logo}
        alt={'logo'}
        onClick={isAuth ? () => history.push('/main') : () => history.push('/')}
        className={style['logo']}
      />
      {controller}
    </div>
  );
};

export default withRouter(Header);
