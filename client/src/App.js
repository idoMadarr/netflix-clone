import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PrivateRoute from './utills/PrivateRoute';
import HomeScreen from './Containers/HomeScreen/HomeScreen';
import SignInScreen from './Containers/SignInScreen/SignInScreen';
import SignUpScreen from './Containers/SignUpScreen/SignUpScreen';
import MainScreen from './Containers/MainScreen/MainScreen';
import FavoriteScreen from './Containers/FavoriteScreen/FavoriteScreen';
import Footer from './components/Footer/Footer';

import './App.css';

const App = () => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  return (
    <div className={'App'}>
      <Switch>
        <Route path={'/'} exact component={HomeScreen} />
        <Route path={'/sign-in'} component={SignInScreen} />
        <Route path={'/sign-up'} component={SignUpScreen} />
        <PrivateRoute path={'/main'} component={MainScreen} isAuth={isAuth} />
        <PrivateRoute
          path={'/favorites'}
          component={FavoriteScreen}
          isAuth={isAuth}
        />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
