import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hooks';
import { AuthContext } from './context/AuthContext';
import { AuthPage } from './pages/AuthPage/AuthPage';
import 'antd/dist/antd.css';
import Layout from './components/Layout';

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
      }}
    >
      <Router>
        <div className="main">
          {isAuthenticated && <Layout routes={routes} />}
          {!isAuthenticated && <AuthPage />}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
export default App;
