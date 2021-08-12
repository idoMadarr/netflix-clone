import {
  SIGN_IN,
  SIGN_UP,
  EMAIL_VALIDITY,
  SIGN_ERROR,
  SPINNER,
  LOGOUT,
} from '../actionTypes/actionTypes';

const usernameFromLocalOrSeesion =
  JSON.parse(localStorage.getItem('user'))?.username ||
  JSON.parse(sessionStorage.getItem('user'))?.username;

const initState = {
  username: usernameFromLocalOrSeesion || '',
  emailSign: '',
  message: '',
  isAuth: usernameFromLocalOrSeesion ? true : false,
  isLoading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SIGN_IN:
    case SIGN_UP:
      return {
        ...state,
        username: action.payload.username,
        isAuth: true,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        username: '',
        emailSign: '',
        isAuth: false,
        isLoading: false,
      };
    case EMAIL_VALIDITY:
      return {
        ...state,
        emailSign: action.payload,
        isLoading: false,
      };
    case SIGN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
      };
    case SPINNER:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;
