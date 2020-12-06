import React from 'react';
import 'antd/dist/antd.css';
import { DatePicker, Button } from 'antd';
import { useRoutes } from './routes';
import {
  BrowserRouter as Router,
  // Route,
  // // NavLink,
  // Switch,
  // Redirect,
} from 'react-router-dom';
function App(props) {
  const routes = useRoutes(false);
  return (
          <Router>{routes}</Router>
     );
}
export default App;
