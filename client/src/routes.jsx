import React from 'react';
import {
  // BrowserRouter as Router,
  Route,
  // NavLink,
  Switch,
  Redirect,
} from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import  MapPage  from './pages/MapPage/MapPage';
import { FavoritePage } from './pages/FavoritePage/FavoritePage';
// import { AuthPage } from './pages/AuthPage/AuthPage';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/map" exact>
          <MapPage />
        </Route>
        <Route path="/favorite" exact>
          <FavoritePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  // return (
  //   <Switch>
  //     <Route path="/" exact>
  //       <AuthPage />
  //     </Route>
  //     {/* <Route path="/map" exact>
  //       <MapPage />
  //     </Route>
  //     <Route path="/auth" exact>
  //       <MainPage />
  //     </Route> */}
  //     <Redirect to="/" />
  //   </Switch>
  // );
};
