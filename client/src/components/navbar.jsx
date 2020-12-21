import React, {useContext} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext'
import { Layout, Menu } from 'antd';
import './navbar.css';

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutUser = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
      }


  const { Header } = Layout;
  return (
    <Header>
      <div className="logo">Vegan Way </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <NavLink to="/">Главнвя</NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/map">Карты</NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/favorite">Избранное</NavLink>
        </Menu.Item>
              <button className="button" onClick={logoutUser}>Выйти</button>
              </Menu>
    </Header>
  );
};
