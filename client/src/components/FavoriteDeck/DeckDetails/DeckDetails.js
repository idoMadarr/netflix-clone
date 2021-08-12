import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addFavorite,
  removeFavorite,
} from '../../../store/actions/favoriteAction';

import SpinnerWhite from '../../UIElements/SpinnerWhite/SpinnerWhite';
import Spinner from '../../UIElements/Spinner/Spinner';

import style from './DeckDetails.module.css';

const DeckDetails = ({ results, isFavorite }) => {
  const isLoading = useSelector((state) => state.favoriteReducer.isLoading);
  const message = useSelector((state) => state.favoriteReducer.message);
  const dispatch = useDispatch();

  const removeHandler = (id) => {
    dispatch(removeFavorite(id));
  };

  const addHandler = (state) => {
    dispatch(addFavorite(state));
  };

  return (
    <div className={style['deck-details']}>
      <small>
        {message !== '' && <i className='fas fa-exclamation-triangle'></i>}
        {message}
      </small>
      <small>{results.overview}</small>
      {isFavorite ? (
        <button
          onClick={() => removeHandler(results.id)}
          className={style['remove-btn']}
        >
          {isLoading ? <SpinnerWhite /> : 'Remove'}
        </button>
      ) : (
        <button
          onClick={() => addHandler(results)}
          className={style['add-btn']}
        >
          {isLoading ? <Spinner /> : 'Add'}
        </button>
      )}
    </div>
  );
};

export default DeckDetails;
