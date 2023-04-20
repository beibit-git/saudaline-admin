import { Table, Typography, Grid } from 'antd';
import PageWrapper from '../../../ui/PageWrapper';
import styles from './style.module.css';
import usePromotionsPage from './useTariffRequestsPage';

const { Title } = Typography;

const TariffRequestsPage = () => {
  const { loading, tariffRequests, totalTariffRequests, setCurrentPage, columns } = usePromotionsPage();
  const breakpoint = Grid.useBreakpoint();
  return (
    <PageWrapper>
      <header className={styles.header}>
        <Title level={3} className={styles.title}>
          Запросы тарифов
        </Title>
      </header>

      <Table
        pagination={{ defaultPageSize: 10, total: totalTariffRequests }}
        dataSource={tariffRequests?.map((tariffRequest) => ({
          id: tariffRequest.id,
          key: tariffRequest.id,
          tariff: tariffRequest.tariff,
          sum: tariffRequest.sum,
          created: tariffRequest.created,
          status: tariffRequest.status,
          provider: tariffRequest.provider,
          tel: tariffRequest.tel,
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

export default TariffRequestsPage;
