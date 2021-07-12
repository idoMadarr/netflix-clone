import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { emailCheck } from '../../store/actions/authActions';

import style from './GetStarted.module.css';

const GetStarted = ({ history }) => {
  const [inputState, setInputState] = useState('');
  const dispatch = useDispatch();

  const getStartedHandler = () => {
    if (inputState.trim() === '') {
      return;
    }
    dispatch(emailCheck(inputState, history));
  };

  return (
    <div className={style['home-content']}>
      <div>
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h3>Watch anywhere. Cancel anytime.</h3>
        <div className={style['header-search-bar']}>
          <input
            type={'email'}
            value={inputState}
            onChange={(e) => setInputState(e.target.value)}
          />
          <button onClick={getStartedHandler}>Get Started!</button>
        </div>
      </div>
      <div className={style['header-footer']}>
        <small>
          Ready to watch? Enter your email to create or restart your membership.
        </small>
      </div>
    </div>
  );
};

export default withRouter(GetStarted);
