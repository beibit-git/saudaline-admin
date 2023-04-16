import './index.css';

import { Avatar, Button, Col, Drawer, Dropdown, Layout, Menu, Row, Space, Typography } from 'antd';
import { UserOutlined, LogoutOutlined, DownOutlined, MenuOutlined, UserSwitchOutlined } from '@ant-design/icons';

import MenuItems from './MenuItems';
import PageContent from './PageContent';
import UserService from '../../services/userService';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions/useWindowDimensions';
import windowBreakpointWidth from '../../helpers/windowBreakpointWidth';
import { useTheme } from '../../themes/useTheme';
import AuthenticatedContent from '../../common/AuthenticatedContent';
import checkRoleListContains from '../../helpers/checkRoleListContains';

const { Header, Content, Sider } = Layout;
const PUBLIC_URL = process.env.PUBLIC_URL;

const PageLayout = () => {
  const [profile, setProfile] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [isDarkMode] = useTheme();
  const history = useHistory();
  const { width } = useWindowDimensions();

  const menuItemStyle = {
    padding: '10px 12px',
  };

  const role = useRef(UserService.getCurrentUser());

  const popoverContent = (
    <Menu style={{ borderRadius: 12 }}>
      {/* <AuthenticatedContent role={['ROLE_PROVIDER']} type="baseRole">
        <Menu.Item onClick={() => history.push('/profile')} style={menuItemStyle}>
          <UserOutlined title="Profile" /> Profile
        </Menu.Item>
      </AuthenticatedContent> */}
      <Menu.Item onClick={UserService.logOut} style={menuItemStyle}>
        <LogoutOutlined title="Logout" /> Logout
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    // ДЛЯ РЕШЕНИЯ ПРОБЛЕМЫ С ПРОСРОЧКОЙ ТОКЕНА ДЛЯ ВХОДА ДЛЯ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
    UserService.getProfileByPrincipal();
    setProfile(UserService.getCurrentUser());
  }, []);

  const switchRoles = (changeTo: string) => {
    UserService.switchRoles(changeTo);
    window.location.reload();
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Drawer
        placement="left"
        onClose={() => setVisible(false)}
        open={visible}
        drawerStyle={isDarkMode ? { backgroundColor: 'none' } : { backgroundColor: '#001529' }}
        width={250}
        headerStyle={{ padding: 0, marginTop: -1 }}
      >
        <Link to="/">
          <img className="logo" src={`${PUBLIC_URL}/assets/aitu-logo.svg`} alt="logo" />
        </Link>
        <MenuItems />
      </Drawer>
      <Sider breakpoint="xl" collapsedWidth="0" trigger={null}>
        <Link to="/">
          <img className="logo" src={`${PUBLIC_URL}/assets/aitu-logo.svg`} alt="logo" />
        </Link>
        <MenuItems />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ height: '65px', padding: '0 30px' }}>
          <Row>
            <Col flex={0}>
              <Button
                type="primary"
                icon={<MenuOutlined />}
                onClick={() => setVisible(true)}
                style={width > windowBreakpointWidth.xl ? { display: 'none' } : { display: 'block', marginTop: 20 }}
              />
            </Col>
            <Col flex={'auto'}></Col>
            <Col flex={0}>
              <Space>
                <Dropdown overlay={popoverContent} trigger={['click']} overlayStyle={{ padding: '10px 0' }}>
                  <a>
                    <Avatar style={{ backgroundColor: '#87d068', marginRight: 10 }} icon={<UserOutlined />} />
                    <Typography.Text style={{ marginRight: 10, color: 'white' }}>{`${profile?.name}`}</Typography.Text>
                    <DownOutlined />
                  </a>
                </Dropdown>
              </Space>
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: '0' }}>
          <PageContent />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
