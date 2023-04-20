import './index.css';

import {
  Avatar,
  Button,
  Col,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Row,
  Space,
  Tag,
  Typography,
  Modal,
  Card,
  Spin,
  Form,
  Input,
} from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  MenuOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import MenuItems from './MenuItems';
import PageContent from './PageContent';
import UserService from '../../services/userService';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions/useWindowDimensions';
import windowBreakpointWidth from '../../helpers/windowBreakpointWidth';
import { useTheme } from '../../themes/useTheme';
import { TariffListDto } from '../../interfaces/Tariff/TariffListDto';
import { TariffService } from '../../services/TariffService';
import { errorNotification } from '../../helpers/errorNotification';
import { TariffAddRequest } from '../../interfaces/Tariff/TariffAddRequest';
import { TariffRequestService } from '../../services/TariffRequestService';
import grantPermission from '../../helpers/grantPermission';
import AuthenticatedContent from '../../common/AuthenticatedContent';

const { Header, Content, Sider } = Layout;
const PUBLIC_URL = process.env.PUBLIC_URL;

const PageLayout = () => {
  const [profile, setProfile] = useState<any>();
  const [provider, setProvider] = useState<any>();
  const [user, setUser] = useState<any>();
  const [tariffList, setTariffList] = useState<TariffListDto[]>([]);
  const [tariff, setTariff] = useState<TariffListDto>();
  const [isLoading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tariffRegModal, setTariffRegModal] = useState(false);
  const [tariffOkModal, setTariffOkModal] = useState(false);
  const [tariffErrorModal, setTariffErrorModal] = useState(false);
  const [tariffLoadingModal, setTariffLoadingModal] = useState(false);
  const [isDarkMode] = useTheme();
  const { width } = useWindowDimensions();

  const [form] = Form.useForm();

  const menuItemStyle = {
    padding: '10px 12px',
  };

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

  const handleTariffButton = (tariff: TariffListDto) => {
    setTariff(tariff);
    setTariffRegModal(true);
  };

  useEffect(() => {
    // ДЛЯ РЕШЕНИЯ ПРОБЛЕМЫ С ПРОСРОЧКОЙ ТОКЕНА ДЛЯ ВХОДА ДЛЯ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
    if (grantPermission('ROLE_ADMIN', 'baseRole')) {
      UserService.getUserInfo();
      setProfile(UserService.getCurrentUser());
    }
    if (grantPermission('ROLE_PROVIDER', 'baseRole')) {
      UserService.getProfileByPrincipal();
      UserService.getProfileByPrincipal().then((response) => {
        setProvider(response.data);
      });
      setProfile(UserService.getCurrentUser());
    }
  }, []);

  useEffect(() => {
    if (grantPermission('ROLE_PROVIDER', 'baseRole')) {
      if (provider?.tariff === null || provider?.balance === 0) {
        setLoading(true);
        TariffService.getTariffList()
          .then((response) => {
            setTariffList(response.data);
          })
          .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
          .finally(() => setLoading(false));
        setIsModalOpen(true);
      }
    }
  }, [provider?.tariff, provider?.balance]);

  const onFinish = (tariffAdd: TariffAddRequest) => {
    setTariffLoadingModal(true);
    if (tariffAdd !== null) {
      TariffRequestService.createTariffRequest(tariffAdd)
        .then(() => setTariffOkModal(true))
        .catch(() => {
          setTariffErrorModal(true);
        })
        .finally(() => {
          setTariffLoadingModal(false);
        });
    }
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
              <AuthenticatedContent role={'ROLE_PROVIDER'} type={'baseRole'}>
                <Typography.Text style={{ color: 'white', marginRight: 10 }}>Мой баланс:</Typography.Text>
                <Tag color="processing" style={{ fontSize: 14, fontWeight: 600, marginRight: 10 }}>
                  {`${provider?.balance?.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}`}
                </Tag>
              </AuthenticatedContent>
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
      <Modal
        title="Чтобы воспользоваться нашим сервисом, вам необходимо подключить тариф"
        open={isModalOpen}
        closable={false}
        footer={null}
        width={'70%'}
        style={{
          textAlign: 'center',
        }}
      >
        {isLoading ? (
          <Spin />
        ) : (
          <>
            <Typography.Title level={4}>
              После подключения тарифа ваш баланс будет пополнен на сумму стоимости тарифа
            </Typography.Title>
            <Row gutter={16} style={{ marginTop: '25px' }}>
              {tariffList?.map((tariff) => (
                <Col span={8} key={tariff?.id}>
                  <Card
                    title={tariff?.title}
                    actions={[
                      <Button type="primary" value={tariff?.id} onClick={() => handleTariffButton(tariff)}>
                        Подключить
                      </Button>,
                    ]}
                  >
                    <Typography.Title level={4}>Сумма пополнения согласно тарифному плану</Typography.Title>
                    <Typography.Title level={3} style={{ fontWeight: 700 }}>
                      {tariff?.sum?.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} т
                    </Typography.Title>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Modal>
      <Modal
        title="Подключение тарифа"
        open={tariffRegModal}
        footer={null}
        style={{
          textAlign: 'center',
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Typography style={{ textAlign: 'center', fontSize: 18 }}>
            Выбранный вами тариф: {`${tariff?.title}`}
          </Typography>
          <Typography style={{ textAlign: 'center', margin: '10px 0px 20px 0px', fontSize: 18 }}>
            Сумма к оплате: {`${tariff?.sum?.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}`} тг
          </Typography>
          <Form.Item name="tariffId" hidden initialValue={tariff?.id} rules={[{ required: true }]}>
            <Input type="number"></Input>
          </Form.Item>
          <Form.Item
            name="tel"
            label=" Введите номер, который зарегистрирован в Kaspi Bank, по этому номеру мы вышлем счет на оплату"
            rules={[{ required: true }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Отправить заяку
              </Button>
              <Button
                htmlType="button"
                onClick={() => {
                  form.resetFields();
                  setTariffRegModal(false);
                }}
              >
                Отменить
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        closable={true}
        title="Ваша заявка успешно отправлено!"
        open={tariffOkModal}
        footer={null}
        style={{
          textAlign: 'center',
        }}
      >
        {isLoading ? (
          <Spin />
        ) : (
          <>
            <CheckCircleOutlined style={{ fontSize: 56, marginBottom: 20 }} twoToneColor="#52c41a" />
            <Typography.Title level={4}>
              В ближайшее время с вами свяжется наш менеджер, вы получите счет на оплату.
            </Typography.Title>
            <Typography.Title level={5}>После успешной оплаты вам будет доступен наш сервис</Typography.Title>
            <Button
              onClick={() => {
                setTariffOkModal(false);
                form.resetFields();
                setTariffRegModal(false);
              }}
            >
              OK
            </Button>
          </>
        )}
      </Modal>
      <Modal
        title="Произошла ошибка!"
        open={tariffErrorModal}
        footer={null}
        style={{
          textAlign: 'center',
        }}
      >
        <CloseCircleOutlined style={{ fontSize: 56, marginBottom: 20 }} />
        <Typography.Title level={4}>Ошибка в запросе. Пожалуйста, повторите запрос!</Typography.Title>
        <Button
          onClick={() => {
            setTariffErrorModal(false);
            form.resetFields();
            setTariffRegModal(false);
          }}
        >
          OK
        </Button>
      </Modal>
      <Modal
        closable={true}
        open={tariffLoadingModal}
        footer={null}
        style={{
          textAlign: 'center',
        }}
      >
        <Spin />
      </Modal>
    </Layout>
  );
};

export default PageLayout;
