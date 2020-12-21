import React from 'react';
import { Navbar } from './navbar';
import { Layout as DesignLayout } from 'antd';
import './Layout.css';

export default function Layout(props) {
  const { Content } = DesignLayout;
  return (
    <DesignLayout className="layout">
      <Navbar />
      <Content style={{ padding: '0 50px', marginTop: '30px' }}>
        <div className="site-layout-content">{props.routes}</div>
      </Content>
    </DesignLayout>
  );
}
