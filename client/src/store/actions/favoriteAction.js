import axios from 'axios';
import {
  FETCH_FAVORITES,
  NO_FAVORITES,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ADD_FAVORITE_FAIL,
  CLEAR_MESSAGE,
  SPINNER_WHITE,
} from '../actionTypes/actionTypes';
const database = 'http://localhost:5000';

export const fetchFavorite = () => async (dispatch) => {
  const user =
    JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(sessionStorage.getItem('user'));

  try {
    const response = await axios.get(`${database}/favorite`, {
      headers: { Authentication: `Beader ${user.token}` },
    });
    dispatch({
      type: FETCH_FAVORITES,
      payload: response.data,
    });
  } catch (error) {
    const message = error.response.data.message;
    dispatch({
      type: NO_FAVORITES,
      payload: message,
    });
  }
};

export const addFavorite = (state) => async (dispatch) => {
  const body = {
    slideId: state.id,
    title: state.title || state.name,
    rate: state.vote_average,
    genre: state.genres
      ? state.genres[0]?.name
      : state.genre_ids[0]?.toString() || 'Not Sorted',
    overview: state.overview,
    img: state.poster_path,
  };

  const user =
    JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(sessionStorage.getItem('user'));

  try {
    dispatch({
      type: SPINNER_WHITE,
    });
    const response = await axios.post(
      `${database}/favorite/add/${state.id}`,
      body,
      { headers: { Authentication: `Bearer ${user.token}` } }
    );
    dispatch({
      type: ADD_FAVORITE,
      payload: response.data,
    });
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }, 3000);
  } catch (error) {
    const message = error.response.data.message;
    dispatch({
      type: ADD_FAVORITE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }, 3000);
  }
};

export const removeFavorite = (slideId) => async (dispatch) => {
  const user =
    JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(sessionStorage.getItem('user'));

  try {
    dispatch({
      type: SPINNER_WHITE,
    });
    const response = await axios.delete(
      `${database}/favorite/remove/${slideId}`,
      { headers: { Authentication: `Bearer ${user.token}` } }
    );
    dispatch({
      type: REMOVE_FAVORITE,
      payload: response.data,
    });
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }, 3000);
  } catch (error) {
    const message = error.response.data.message;
    dispatch({
      type: ADD_FAVORITE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }, 3000);
  }
};
