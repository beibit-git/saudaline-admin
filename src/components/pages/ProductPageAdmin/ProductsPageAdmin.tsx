import { Button, Table, Typography, Grid } from 'antd';
import PageWrapper from '../../../ui/PageWrapper';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import useProductsPageAdmin from './useProductsPageAdmin';

const { Title } = Typography;

const ProductsPageAdmin = () => {
  const { loading, products, totalProducts, setCurrentPage, columns } = useProductsPageAdmin();
  const breakpoint = Grid.useBreakpoint();
  return (
    <PageWrapper>
      <header className={styles.header}>
        <Title level={3} className={styles.title}>
          Товары
        </Title>
        <Link to="/products-admin/create">
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
          mainPhoto: product.mainPhoto?.url,
          category: product.category.title,
          price: product.price,
          provider: product.provider.name,
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

export default ProductsPageAdmin;
