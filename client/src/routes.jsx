import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { MapPage } from './pages/MapPage/MapPage';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/main" exact>
          <MainPage />
        </Route>
        <Route path="/map" exact>
          <MapPage />
        </Route>
        <Redirect to="/main" />
      </Switch>
    );
  }
};
