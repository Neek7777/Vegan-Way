import React, { useContext } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Layout, Menu } from 'antd';
import './Navigation.css';

export const Navbar = () => {
  const { Header } = Layout;
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);

  const logoutUser = (event) => {
    event.preventDefault();
    auth.logout();
    history.push('/main');
  };

  const paths = {
    '/main': '1',
    '/map': '2',
  };

  return (
    <Header>
      <div className="logo">Vegan Way</div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={paths[location.pathname]}
      >
        <Menu.Item key="1">
          <NavLink className="navLink" activeClassName="active" to="/main">
            Главная
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink className="navLink" activeClassName="active" to="/map">
            Карты
          </NavLink>
        </Menu.Item>
        <button className="button" onClick={logoutUser}>
          Выйти
        </button>
      </Menu>
    </Header>
  );
};
