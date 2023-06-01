import { ImportOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Space, Table, Typography, Upload, UploadProps, Select, Divider } from 'antd';
import Page from '../../../ui/Page';
import useProductImport from './useProductImport';
const { Option } = Select;

const ProductImport = () => {
  const { data, handlers } = useProductImport();

  return (
    <Page title={'Импорт товаров'}>
      <Row style={{ marginBottom: 20 }}>
        <Col flex={0}>
          {/* <Input
            placeholder="ФИО, Номер сертификата..."
            // onChange={(e) => handlers.searchByParameters(e.target.value)}
            style={{ width: 300 }}
          /> */}
          <Upload {...data.props}>
            <Button size={'large'} icon={<ImportOutlined />} loading={data.loading}>
              Импортировать Файл
            </Button>
          </Upload>
        </Col>
        <Col flex={'auto'}></Col>
        <Col flex={0}>
          <Space direction="horizontal">
            {data.importData && (
              <>
                <Select
                  showSearch
                  size="large"
                  placeholder="Выберите поставщика"
                  onSelect={(e: any) => handlers.setSelectedProvider(e)}
                >
                  {data.providers?.map((provider) => (
                    <Option key={provider.id} value={provider.id}>
                      {provider.name}
                    </Option>
                  ))}
                </Select>
                <Button
                  type="primary"
                  size="large"
                  onClick={handlers.saveCertificateList}
                  loading={data.loading}
                  icon={<SaveOutlined />}
                  disabled={!data.selectedProvider}
                >
                  Сохранить
                </Button>
                <Button
                  type="primary"
                  size="large"
                  danger
                  onClick={handlers.handleCancel}
                  loading={data.loading}
                  icon={<CloseOutlined />}
                >
                  Отменить
                </Button>
              </>
            )}
          </Space>
          {/* <Space direction="horizontal">
            <Button type="primary" onClick={handlers.importFromExcelFile} icon={<ImportOutlined />}>
              Импортировать из .xlsx файла
            </Button>
            <Button type="primary" onClick={handlers.createCertificate} icon={<PlusOutlined />}>
              Зарегистрировать сертификат
            </Button>
          </Space> */}
        </Col>
      </Row>
      {/* <Table dataSource={data.data} columns={data.columns} bordered loading={data.loading} /> */}
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
      {/* {data.editData && (
        <EditCertificateModal open={data.editModalOpen} onCancel={handlers.closeModal} data={data.editData} />
      )}
      <CreateCertificateModal open={data.createModalOpen} onCancel={handlers.closeModal} /> */}
      <Modal
        title={'Импорт'}
        open={data.isModalOpen}
        onCancel={() => handlers.closeModal(data?.importData?.data)}
        footer={null}
        width={1200}
      >
        <Row justify="center">
          <Col span={2}>
            <Typography.Text>Поставщик:</Typography.Text>{' '}
          </Col>
          <Col span={6}></Col>
        </Row>
        <Divider plain></Divider>
        <Row justify="center"></Row>
      </Modal>
    </Page>
  );
};

export default ProductImport;
