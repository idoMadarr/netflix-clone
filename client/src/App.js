import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeScreen from './Containers/HomeScreen/HomeScreen';
import SignInScreen from './Containers/SignInScreen/SignInScreen';
import SignUpScreen from './Containers/SignUpScreen/SignUpScreen';
import MainScreen from './Containers/MainScreen/MainScreen';
import Footer from './components/Footer/Footer';

import './App.css';

const App = () => {
  return (
    <div className={'App'}>
      <Switch>
        <Route path={'/'} exact component={HomeScreen} />
        <Route path={'/sign-in'} component={SignInScreen} />
        <Route path={'/sign-up'} component={SignUpScreen} />
        <Route path={'/main'} component={MainScreen} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
