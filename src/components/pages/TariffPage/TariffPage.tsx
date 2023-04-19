import { useEffect, useState } from 'react';
import { Button, Typography, Row, Col, Card, Tag, Table, Tooltip } from 'antd';
import PageWrapper from '../../../ui/PageWrapper';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import UserService from '../../../services/userService';
import useTransactionDeduction from './useTransactionDeduction';
import useTransactionsRefill from './useTransactionsRefill';
import useTariffRequest from './useTariffRequest';

const { Title } = Typography;
const { Text } = Typography;

const TariffPage = () => {
  const { loading, transactionDeductions, totalTransactionDeductions, setCurrentPage, columns } =
    useTransactionDeduction();
  const { loadingRefill, transactionRefills, totalTransactionRefills, setCurrentPageRefill, columnsRefill } =
    useTransactionsRefill();
  const { loadingTRequest, tariffRequests, totalTariffRequests, setCurrentPageTRequest, columnsTRequest } =
    useTariffRequest();
  const [activeTabKey, setActiveTabKey] = useState('1');
  const [provider, setProvider] = useState<any>();

  useEffect(() => {
    UserService.getProfileByPrincipal().then((response) => {
      setProvider(response.data);
    });
  }, []);

  const handleButtonClick = (tabKey: string) => {
    setActiveTabKey(tabKey);
  };
  return (
    <PageWrapper>
      {/* <header className={styles.header}>
        <Title level={3} className={styles.title}>
          Мой тариф
        </Title>
        <Link to="/products/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Добавить товар
          </Button>
        </Link>
      </header> */}
      <Row gutter={[20, 20]}>
        <Col xl={6} xs={24}>
          <Card>
            <Col style={{ marginBottom: 15 }}>
              <Typography.Text style={{ fontSize: 15, marginRight: 10 }}>Мой баланс:</Typography.Text>
              <Tag color="processing" style={{ fontSize: 15, fontWeight: 600, marginRight: 10 }}>
                {`${provider?.balance?.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}`} ₸
              </Tag>

              <Button type="primary" size="small" icon={<PlusOutlined />} style={{ marginRight: 10 }}>
                Пополнить
              </Button>
              <Tooltip title="Обновить данные">
                <Button shape="circle" size="small" icon={<ReloadOutlined />} />
              </Tooltip>
            </Col>
            <Col style={{ marginBottom: 10 }}>
              <Button onClick={() => handleButtonClick('1')}>Пополнение</Button>
              <Button onClick={() => handleButtonClick('2')}>Издержки</Button>
              <Button onClick={() => handleButtonClick('3')}>Заявки</Button>
            </Col>
            <Col style={{ marginBottom: 15 }}>
              <Typography.Text style={{ fontSize: 16, marginRight: 10 }}>Мой тариф:</Typography.Text>
              <Typography.Text color="processing" style={{ fontSize: 16, fontWeight: 600, marginRight: 10 }}>
                {`${provider?.tariff?.title}`}
              </Typography.Text>
              <Button type="primary" size="small" icon={<PlusOutlined />} style={{ marginRight: 10 }}>
                Изменить тариф
              </Button>
            </Col>
            <Col style={{ marginBottom: 15 }}>
              <Typography.Text style={{ fontSize: 16, marginRight: 10 }}>
                Сумма пополнения согласно тарифному плану:
              </Typography.Text>
              <Typography.Text color="processing" style={{ fontSize: 16, fontWeight: 600, marginRight: 10 }}>
                {`${provider?.tariff?.sum.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} ₸`}
              </Typography.Text>
            </Col>
            <Col style={{ marginBottom: 15 }}>
              <Typography.Text style={{ fontSize: 14, marginRight: 10 }}>
                При пополнении баланса все предыдущие остатки сохраняются.
              </Typography.Text>
            </Col>
          </Card>
        </Col>
        <Col xl={18} xs={24}>
          {activeTabKey === '1' ? (
            <Card>
              <Title level={5}>Список пополнений</Title>
              <Table
                pagination={{ defaultPageSize: 10, total: totalTransactionRefills }}
                dataSource={transactionRefills?.map((transactionRefill) => ({
                  id: transactionRefill.id,
                  key: transactionRefill.id,
                  sum: transactionRefill.sum,
                  execution_time: transactionRefill.execution_time,
                }))}
                columns={columnsRefill}
                onChange={(pagination) => {
                  setCurrentPageRefill(pagination.current);
                }}
                loading={loadingRefill}
              />
            </Card>
          ) : null}
          {activeTabKey === '2' ? (
            <Card>
              <Title level={5}>Перечень транзакционных издержек</Title>
              <Table
                pagination={{ defaultPageSize: 10, total: totalTransactionDeductions }}
                dataSource={transactionDeductions?.map((transactionDeduction) => ({
                  id: transactionDeduction.id,
                  key: transactionDeduction.id,
                  sum: transactionDeduction.sum,
                  execution_time: transactionDeduction.execution_time,
                  order: transactionDeduction.order,
                }))}
                columns={columns}
                onChange={(pagination) => {
                  setCurrentPage(pagination.current);
                }}
                loading={loading}
              />
            </Card>
          ) : null}
          {activeTabKey === '3' ? (
            <Card>
              <Title level={5}>Заявки на пополнение счета</Title>
              <Table
                pagination={{ defaultPageSize: 10, total: totalTariffRequests }}
                dataSource={tariffRequests?.map((tarifRequest) => ({
                  id: tarifRequest.id,
                  key: tarifRequest.id,
                  sum: tarifRequest.sum,
                  tariff: tarifRequest.tariff,
                  created: tarifRequest.created,
                  status: tarifRequest.status,
                }))}
                columns={columnsTRequest}
                onChange={(pagination) => {
                  setCurrentPageTRequest(pagination.current);
                }}
                loading={loadingTRequest}
              />
            </Card>
          ) : null}
        </Col>
      </Row>
    </PageWrapper>
  );
};

export default TariffPage;
