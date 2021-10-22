import React, { useEffect } from 'react';
import { Router, Route } from 'react-router';
import FormConfig from '../MainScreen/MainScreen';
import Report from '../Report/Report';
import { firebaseRef } from '../../firebase/firebase';
import history from '../../history';

const MainContainer = () => {
  useEffect(() => {
    firebaseRef.auth()
      .onAuthStateChanged(async (user) => {
        if (user) {
          // User is signed in.
          localStorage.setItem('mail', user.email);
        }
        return user;
      });
    // eslint-disable-next-line
  }, []);

  return (
    <Router history={history}>
      <Route exact path={'/'}>
        <FormConfig/>
      </Route>
      <Route exact path={'/reportes'}>
        <Report/>
      </Route>
  </Router>
  );

};

export default MainContainer;