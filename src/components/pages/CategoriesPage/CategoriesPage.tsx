import { Button, Table, Typography, Grid } from 'antd';
import PageWrapper from '../../../ui/PageWrapper';
import useCategoriesPage from './useCategoriesPage';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import SubCategoriesPage from './SubcategoriesPage';
import UserService from '../../../services/userService';
import { CategoriesDtoResponse } from '../../../interfaces/Categories/CategoriesDtoResponse';

const { Title } = Typography;

const CategoriesPage = () => {
  const { loading, categories, totalCategories, setCurrentPage, columns } = useCategoriesPage();
  const breakpoint = Grid.useBreakpoint();
  return (
    <PageWrapper>
      <header className={styles.header}>
        <Title level={3} className={styles.title}>
          Категория
        </Title>
        <Link to="/categories/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Создать категорию
          </Button>
        </Link>
      </header>

      <Table
        pagination={{ defaultPageSize: 10, total: totalCategories }}
        expandable={{
          expandedRowRender: !breakpoint.xs ? expandedRowRender : undefined,
        }}
        dataSource={categories?.map((category) => ({
          id: category.id,
          key: category.id,
          title: `${category.title}`,
          description: category.description,
          isActive: category.isActive,
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

const expandedRowRender = (record: CategoriesDtoResponse) => {
  return <SubCategoriesPage categoryId={record.id} />;
};

export default CategoriesPage;
