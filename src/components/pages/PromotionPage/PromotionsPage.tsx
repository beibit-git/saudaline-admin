import { Button, Table, Typography, Grid } from 'antd';
import PageWrapper from '../../../ui/PageWrapper';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import usePromotionsPage from './usePromotionsPage';

const { Title } = Typography;

const PromotionsPage = () => {
  const { loading, promotions, totalPromotions, setCurrentPage, columns } = usePromotionsPage();
  const breakpoint = Grid.useBreakpoint();
  return (
    <PageWrapper>
      <header className={styles.header}>
        <Title level={3} className={styles.title}>
          Акции
        </Title>
        <Link to="/promotions/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Создать акцию
          </Button>
        </Link>
      </header>

      <Table
        pagination={{ defaultPageSize: 10, total: totalPromotions }}
        dataSource={promotions?.map((promotion) => ({
          id: promotion.id,
          key: promotion.id,
          title: `${promotion.title}`,
          // mainPhoto: promotion.mainPhoto[0].url,
          startDate: promotion.startDate,
          finishDate: promotion.finishDate,
          isActive: promotion.isActive,
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

export default PromotionsPage;
