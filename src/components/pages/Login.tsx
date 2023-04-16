import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Typography, Spin, Row, Col, Form, Input } from 'antd';
import { WindowsOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import '../../style/login.css';
import Password from 'antd/lib/input/Password';
import AuthService from '../../services/authService';
import { Constants } from '../../common/constants';
const Login = () => {
  const history = useHistory();
  const [errorMesage, setErrorMessage] = useState('');
  const urlParam = new URLSearchParams(window.location.search);
  const [isLoading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    AuthService.login(values)
      .then((response: any) => {
        setLoading(false);
        history.push('/');
      })
      .catch((error: any) => {
        setLoading(false);
        setErrorMessage(error);
      });
  };

  return (
    <div className="main-container">
      <Row>
        <Col flex="auto"></Col>
        <Col flex={0}>
          <div className="logo-container"></div>
          {isLoading ? (
            <Spin />
          ) : (
            <Form className="form-itself" onFinish={onFinish}>
              <Form.Item name="login">
                <Input
                  size="large"
                  prefix={<UserOutlined style={{ color: 'grey' }} />}
                  placeholder="Username"
                  className="site-form-item-icon"
                />
              </Form.Item>
              <Form.Item name="password">
                <Password size="large" prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Войти
                </Button>
              </Form.Item>
            </Form>
          )}
          {errorMesage && (
            <Typography.Title level={5} type="danger" style={{ textAlign: 'center', marginTop: 20 }}>
              Что-то пошло не так, попробуйте еще раз или свяжитесь с администрацией!
            </Typography.Title>
          )}
        </Col>
        <Col flex="auto"></Col>
      </Row>
    </div>
  );
};

export default Login;
