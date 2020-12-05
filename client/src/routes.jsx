import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { MapPage } from './pages/MapPage/MapPage';
import { FavoritePage } from './pages/FavoritePage/FavoritePage';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
    <Switch>
        <Route path="/" exact>
           <MainPage/> 
        </Route>   
        <Route path="/map" exact>
           <MapPage/> 
        </Route>            
        <Route path="/favorite" exact>
           <FavoritePage/>
        </Route>                                     
    </Switch>
    )
  }
  return (
  <Switch>

  </Switch>
  )
};
