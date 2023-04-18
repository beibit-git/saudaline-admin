import React, { useEffect } from 'react';
import { Menu, Switch } from 'antd';
import {
  BookFilled,
  HomeFilled,
  LogoutOutlined,
  PaperClipOutlined,
  SnippetsFilled,
  OrderedListOutlined,
  MedicineBoxFilled,
  FilePdfFilled,
  CheckSquareFilled,
  FileDoneOutlined,
  TeamOutlined,
  IdcardOutlined,
  UserOutlined,
  LineChartOutlined,
  SolutionOutlined,
  UnorderedListOutlined,
  InfoCircleOutlined,
  StarOutlined,
  AreaChartOutlined,
  ProfileOutlined,
  FileTextFilled,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import AuthenticatedContent from '../../../common/AuthenticatedContent';
import UserService from '../../../services/userService';
import { useTheme } from '../../../themes/useTheme';
import grantPermission from '../../../helpers/grantPermission';

const MenuItems = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useTheme();

  useEffect(() => {
    // AcademicDebtService.AcademicDebtsNumberForStudent().then((res) => setDebtNumber(res.data));
  }, []);

  return (
    <React.Fragment>
      <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" selectedKeys={[location.pathname]}>
        <Menu.Item key="/" icon={<HomeFilled />}>
          <Link to="/" />
          Главная
        </Menu.Item>
      </Menu>
      {/* Не выходит сделать switch menu универсальным на данный момент. Позже вынесу его в отдельный компонент с параметрами */}
      <AuthenticatedContent role={'ROLE_PROVIDER'} type={'baseRole'}>
        <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/categories" icon={<MedicineBoxFilled />}>
            <Link to="/categories"></Link>
            Категория
          </Menu.Item>
        </Menu>
        <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/products" icon={<MedicineBoxFilled />}>
            <Link to="/products"></Link>
            Товары
          </Menu.Item>
        </Menu>
        <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/orders" icon={<MedicineBoxFilled />}>
            <Link to="/orders"></Link>
            Заказы
          </Menu.Item>
        </Menu>
        <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/orders" icon={<MedicineBoxFilled />}>
            <Link to="/promotions"></Link>
            Акции
          </Menu.Item>
        </Menu>
      </AuthenticatedContent>

      <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" selectedKeys={[location.pathname]}>
        <Menu.Item key={uuidv4()} icon={<LogoutOutlined />} onClick={UserService.logOut}>
          Log out
        </Menu.Item>
        <Menu.Item key="dark-mode">
          <Switch checked={darkMode} onChange={setDarkMode} checkedChildren="Dark" unCheckedChildren="Light" />
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
};

export default MenuItems;
