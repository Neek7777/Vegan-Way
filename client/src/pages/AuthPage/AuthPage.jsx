import React, { useState, useEffect, useContext } from 'react';
import './AuthPage.css';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHttp } from '../../hooks/http.hooks';
import { useMessage } from '../../hooks/message.hooks';
import { AuthContext } from '../../context/AuthContext';

export const AuthPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
      auth.login(data.token, data.userId);
    } catch (e) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="login-wrapper">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <h1>Vegan Way</h1>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите свой Email!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            name="email"
            onChange={changeHandler}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите свой пароль!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
            name="password"
            onChange={changeHandler}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={registerHandler}
            disabled={loading}
          >
            Зарегистрироваться
          </Button>
          <Button
            htmlType="submit"
            className="login-form-button"
            onClick={loginHandler}
            disabled={loading}
          >
            Войти под своим именем
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
