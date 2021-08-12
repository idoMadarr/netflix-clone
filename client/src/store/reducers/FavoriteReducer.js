import {
  FETCH_FAVORITES,
  ADD_FAVORITE,
  ADD_FAVORITE_FAIL,
  REMOVE_FAVORITE,
  REMOVE_FAVORITE_FAIL,
  SPINNER_WHITE,
  NO_FAVORITES,
  CLEAR_MESSAGE,
  RESTART_CREDENTIALS,
} from '../actionTypes/actionTypes';

const initState = {
  favorites: [],
  getSlidesResults: false,
  message: '',
  isLoading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_FAVORITES:
      return {
        ...state,
        favorites: action.payload.favorites,
        getSlidesResults: true,
        isLoading: false,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [action.payload.addFavorite, ...state.favorites],
        message: action.payload.message,
        isLoading: false,
      };
    case REMOVE_FAVORITE_FAIL:
    case ADD_FAVORITE_FAIL:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (slide) => slide.slideId !== action.payload.favorite.slideId
        ),
        message: action.payload.message,
        isLoading: false,
      };
    case NO_FAVORITES:
      return {
        ...state,
        getSlidesResults: true,
        message: action.payload,
        isLoading: false,
      };
    case RESTART_CREDENTIALS:
      return {
        favorites: [],
        getSlidesResults: false,
        message: '',
        isLoading: false,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: '',
      };
    case SPINNER_WHITE:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;
