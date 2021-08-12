import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { emailCheck } from '../../store/actions/authActions';

import Spinner from '../UIElements/Spinner/Spinner';

import { motion } from 'framer-motion';
import style from './GetStarted.module.css';

const GetStarted = ({ history }) => {
  const isLoading = useSelector((state) => state.authReducer.isLoading);

  const [validState, setValidState] = useState(true);
  const [inputState, setInputState] = useState('');
  const dispatch = useDispatch();

  const getStartedHandler = () => {
    if (inputState.trim() === '' || !inputState.includes('@')) {
      setValidState(false);
      return;
    }
    dispatch(emailCheck(inputState, history));
  };

  const animation = {
    scale: 1.05,
  };

  const init = {
    scale: 0.5,
  };

  return (
    <motion.div
      initial={init}
      animate={animation}
      className={style['home-content']}
    >
      <div className={style['home-content-main']}>
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h3>Watch anywhere. Cancel anytime.</h3>
        <div className={style['header-search-bar']}>
          <input
            className={style[validState ? '' : 'err']}
            type={'email'}
            value={inputState}
            onChange={(e) => {
              setInputState(e.target.value);
              setValidState(true);
            }}
          />
          <button onClick={getStartedHandler}>
            {isLoading ? <Spinner /> : 'Get Started!'}
          </button>
        </div>
      </div>
      <div className={style['header-footer']}>
        <small>
          Ready to watch? Enter your email to create or restart your membership.
        </small>
      </div>
    </motion.div>
  );
};

export default withRouter(GetStarted);
