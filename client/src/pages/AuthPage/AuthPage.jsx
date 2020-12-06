import React, { useState } from 'react';
import './AuthPage.css';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const AuthPage = () => {
  const [form, setForm] = useState({
    email: '', password: ''
  })
  const changeHandler = ({target}) => {
    setForm({...form, [target.name]:target.value})
  }

  return (
    <div className="login-wrapper">
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      // onFinish={onFinish}
    >
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Зарегистрироваться
        </Button>
        Или  <a href="">войдите под своим именем!</a>
      </Form.Item>
    </Form>
    </div>
  );
};
