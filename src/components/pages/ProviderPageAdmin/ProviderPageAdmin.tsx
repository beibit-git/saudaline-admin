import { Table, Typography, Grid } from 'antd';
import PageWrapper from '../../../ui/PageWrapper';
import styles from './style.module.css';
import useProviderPageAdmin from './useProviderPageAdmin';

const { Title } = Typography;

const ProviderPageAdmin = () => {
  const { loading, providers, totalProviders, setCurrentPage, columns } = useProviderPageAdmin();
  const breakpoint = Grid.useBreakpoint();
  return (
    <PageWrapper>
      <header className={styles.header}>
        <Title level={3} className={styles.title}>
          Поставщики
        </Title>
        {/* <Link to="/products/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Добавить товар
          </Button>
        </Link> */}
      </header>

      <Table
        pagination={{ defaultPageSize: 10, total: totalProviders }}
        dataSource={providers?.map((provider) => ({
          id: provider.id,
          key: provider.id,
          businessType: provider.businessType,
          name: provider.name,
          businessNumber: provider.businessNumber,
          tariff: provider.tariff,
          phone: provider.phone,
          city: provider.city,
          address: provider.address,
          balance: provider.balance,
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

export default ProviderPageAdmin;
