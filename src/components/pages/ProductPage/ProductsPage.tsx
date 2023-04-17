import { Button, Table, Typography, Grid } from 'antd';
import PageWrapper from '../../../ui/PageWrapper';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import useProductsPage from './useProductsPage';

const { Title } = Typography;

const ProductsPage = () => {
  const { loading, products, totalProducts, setCurrentPage, columns } = useProductsPage();
  const breakpoint = Grid.useBreakpoint();
  return (
    <PageWrapper>
      <header className={styles.header}>
        <Title level={3} className={styles.title}>
          Товары
        </Title>
        <Link to="/products/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Добавить товар
          </Button>
        </Link>
      </header>

      <Table
        pagination={{ defaultPageSize: 10, total: totalProducts }}
        dataSource={products?.map((product) => ({
          id: product.id,
          key: product.id,
          title: `${product.title}`,
          mainPhoto: product.mainPhoto[0].url,
          category: product.category.title,
          price: product.price,
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

export default ProductsPage;
