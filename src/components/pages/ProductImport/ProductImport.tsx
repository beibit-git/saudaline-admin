import { Button, Table, Typography, Grid } from 'antd';
import PageWrapper from '../../../ui/PageWrapper';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import useProductImport from './useProductImport';

const { Title } = Typography;

const ProductImport = () => {
  const { loading, products, totalProducts, setCurrentPage, columns, isModalOpen, setIsModalOpen } = useProductImport();
  const breakpoint = Grid.useBreakpoint();
  return (
    <PageWrapper>
      <header className={styles.header}>
        <Title level={3} className={styles.title}>
          Импортировать товары из файла excel
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
      {/* <Modal title={'Импорт'} open={isModalOpen} onCancel={closeModal} footer={null} width={1200}>
        <Space direction="horizontal">
          <Upload {...data.props}>
            <Button size={'large'} icon={<ImportOutlined />} loading={data.loading}>
              Импортировать Файл
            </Button>
          </Upload>
          {data.importData && (
            <Button
              type="primary"
              size="large"
              onClick={handlers.saveCertificateList}
              loading={data.loading}
              icon={<SaveOutlined />}
            >
              Сохранить
            </Button>
          )}
        </Space>
        {data.importData && (
          <>
            <Typography.Title level={3} type="secondary" style={{ marginTop: 20 }}>
              {data.importData.fileName}
            </Typography.Title>
            <Table
              dataSource={data.importData.data}
              columns={data.importColumns}
              bordered
              loading={data.loading}
              scroll={{ x: 'auto' }}
              style={{ marginTop: 20 }}
            />
          </>
        )}
      </Modal> */}
    </PageWrapper>
  );
};

export default ProductImport;
