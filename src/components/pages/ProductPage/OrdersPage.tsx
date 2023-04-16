import { Button, Table, Typography, Grid } from 'antd';
import PageWrapper from '../../../ui/PageWrapper';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import useOrdersPage from './useOrdersPage';

const { Title } = Typography;

const OrdersPage = () => {
  const { loading, orders, totalOrders, setCurrentPage, columns } = useOrdersPage();
  const breakpoint = Grid.useBreakpoint();
  return (
    <PageWrapper>
      <header className={styles.header}>
        <Title level={3} className={styles.title}>
          Заказы
        </Title>
        <Link to="/products/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Добавить товар
          </Button>
        </Link>
      </header>

      <Table
        pagination={{ defaultPageSize: 10, total: totalOrders }}
        dataSource={orders?.map((order) => ({
          id: order.id,
          key: order.id,
          created: order.created,
          totalAmount: order.totalAmount,
          totalQuantity: order.totalQuantity,
          totalAmountWithDiscount: order.totalAmountWithDiscount,
          status: order.status,
        }))}
        columns={columns}
        onChange={(pagination) => {
          setCurrentPage(pagination.current);
        }}
        loading={loading}
      />
    </PageWrapper>
  );
};

export default OrdersPage;
