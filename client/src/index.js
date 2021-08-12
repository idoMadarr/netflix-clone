import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// React Router
import { BrowserRouter } from 'react-router-dom';

// Redux
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Reducers
import authReducer from './store/reducers/authReducer';
import favoriteReducer from './store/reducers/FavoriteReducer';

// Redux Devtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Root Reducer
const rootReducer = combineReducers({
  authReducer,
  favoriteReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
