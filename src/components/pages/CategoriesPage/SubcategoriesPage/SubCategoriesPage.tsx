import { Button, Table, Typography } from 'antd';
import PageWrapper from '../../../../ui/PageWrapper';
import useSubCategoriesPage from './useSubCategoriesPage';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

interface SubCategoriesPageProps {
  categoryId: number;
}

const { Title } = Typography;

const SubCategoriesPage = ({ categoryId }: SubCategoriesPageProps) => {
  const { loading, subCategories, totalSubCategories, setSelectedCategory, setCurrentPage, columns } =
    useSubCategoriesPage();

  useEffect(() => {
    setSelectedCategory(categoryId);
  }, [categoryId]);

  return (
    <PageWrapper>
      <header className={styles.header}>
        <Title level={5} className={styles.title}>
          Подкатегорий
        </Title>

        <Link to="/disciplines/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Создать подкатегорию
          </Button>
        </Link>
      </header>
      <Table
        pagination={{ defaultPageSize: 10, total: totalSubCategories }}
        dataSource={subCategories?.map((subCategory) => ({
          key: subCategory.id,
          title: `${subCategory.title}`,
          description: subCategory.description,
          isActive: subCategory.isActive,
        }))}
        columns={columns}
        onChange={(pagination) => setCurrentPage(pagination.current)}
        loading={loading}
      />
    </PageWrapper>
  );
};

export default SubCategoriesPage;
