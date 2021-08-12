import axios from 'axios';
import {
  SIGN_IN,
  SIGN_UP,
  EMAIL_VALIDITY,
  SIGN_ERROR,
  SPINNER,
} from '../actionTypes/actionTypes';
const database = 'http://localhost:5000';

export const signUp = (state, history) => async (dispatch) => {
  try {
    dispatch({
      type: SPINNER,
    });
    const response = await axios.post(`${database}/auth/sign-up`, { ...state });
    dispatch({
      type: SIGN_UP,
      payload: response.data,
    });
    sessionStorage.setItem('user', JSON.stringify(response.data));
    history.push('/main');
  } catch (error) {
    dispatch({
      type: SIGN_ERROR,
      payload: error.message,
    });
  }
};

export const signIn = (state, history) => async (dispatch) => {
  try {
    dispatch({
      type: SPINNER,
    });
    const response = await axios.post(`${database}/auth/sign-in`, { ...state });
    dispatch({
      type: SIGN_IN,
      payload: response.data,
    });
    state.rememberMe
      ? localStorage.setItem('user', JSON.stringify(response.data))
      : sessionStorage.setItem('user', JSON.stringify(response.data));
    history.push('/main');
  } catch (error) {
    dispatch({
      type: SIGN_ERROR,
      payload: error.response.data.message || error.message,
    });
  }
};

export const emailCheck = (email, history) => async (dispatch) => {
  try {
    dispatch({
      type: SPINNER,
    });
    await axios.post(`${database}/auth/email-validation`, {
      email,
    });
    dispatch({
      type: EMAIL_VALIDITY,
      payload: email,
    });
    history.push('/sign-up');
  } catch (error) {
    dispatch({
      type: EMAIL_VALIDITY,
      payload: email,
    });
    history.push('/sign-in');
  }
};
