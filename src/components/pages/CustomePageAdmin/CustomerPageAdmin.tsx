import { Table, Typography, Grid } from 'antd';
import PageWrapper from '../../../ui/PageWrapper';
import styles from './style.module.css';
import useCustomerPageAdmin from './useCustomerPageAdmin';

const { Title } = Typography;

const CustomerPageAdmin = () => {
  const { loading, customers, totalCustomers, setCurrentPage, columns } = useCustomerPageAdmin();
  const breakpoint = Grid.useBreakpoint();
  return (
    <PageWrapper>
      <header className={styles.header}>
        <Title level={3} className={styles.title}>
          Магазины
        </Title>
        {/* <Link to="/products/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Добавить товар
          </Button>
        </Link> */}
      </header>

      <Table
        pagination={{ defaultPageSize: 10, total: totalCustomers }}
        dataSource={customers?.map((customer) => ({
          id: customer.id,
          key: customer.id,
          businessType: customer.businessType,
          name: customer.name,
          businessNumber: customer.businessNumber,
          phone: customer.phone,
          city: customer.city,
          address: customer.address,
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

export default CustomerPageAdmin;
