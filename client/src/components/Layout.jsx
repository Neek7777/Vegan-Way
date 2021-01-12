import React from 'react';
import { Navbar } from './Navigation';
import { Layout as DesignLayout } from 'antd';
import './Layout.css';

export default function Layout(props) {
  const { Content } = DesignLayout;
  return (
    <DesignLayout className="layout">
      <Navbar />
      <Content className="content">
        <div className="site-layout-content">{props.routes}</div>
      </Content>
    </DesignLayout>
  );
}
