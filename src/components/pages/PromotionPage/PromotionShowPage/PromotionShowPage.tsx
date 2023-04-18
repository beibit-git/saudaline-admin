import React, { useState, ReactNode } from 'react';
import { Button, Typography, Row, Col, Spin, Avatar, Table, Space, Image, Tag, Divider } from 'antd';
import { FieldTimeOutlined, PlusOutlined } from '@ant-design/icons';
import PageWrapper from '../../../../ui/PageWrapper';
import BackButton from '../../../../ui/BackButton';
import { errorNotification } from '../../../../helpers/errorNotification';
import { useNotification } from '../../../../contexts/notificationContext';
import { Constants } from '../../../../common/constants';
import styles from './style.module.css';
import {
  Courier,
  CourierBoxContainer,
  CourierInfoBoxText,
  CourierInfoText,
  Product,
  ProductText,
  PromotionFinishDateBox,
  PromotionInfoBox,
} from './styled';
import { PromotionsService } from '../../../../services/PromotionsService';
import { Promotions } from '../../../../interfaces/Promotions/Promotions';
import { PromotionStatus } from './PromotionStatus';
import { DateField } from '../../../../helpers/DateField';
import { PromotionProducts } from '../../../../interfaces/Promotions/PromotionProducts';
import ProductAddModal from './ProductAddModal';

const { Title } = Typography;
const { Text } = Typography;

interface Props {
  promotionId?: number;
}

const PromotionShowPage = ({ promotionId }: Props) => {
  const apiUrl = Constants.API_BASE_URL;
  const [shouldRerender, setShouldRerender] = useState(false);
  const [openProductModalValue, setOpenProductModalValue] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [promotion, setPromotion] = useState<Promotions>();
  const { openNotification } = useNotification();
  const [loadings, setLoadings] = useState<boolean[]>([]);

  // useEffect для страниц с редактированием дисциплины
  React.useEffect(() => {
    if (promotionId) {
      setLoading(true);
      PromotionsService.getOnePromotion(promotionId)
        .then(({ data }) => {
          setPromotion(data);
        })
        .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
        .finally(() => setLoading(false));
    }
  }, [promotionId, shouldRerender]);

  const openProductAddModal = () => {
    setOpenProductModalValue(true);
  };

  const promotionStartDate = (text: string, icon: ReactNode, value: string) => (
    <PromotionInfoBox>
      {icon}
      <CourierInfoBoxText>
        <Text style={{ color: '#ffffff' }}>{text.toUpperCase()}</Text>
        <DateField format="DD-MM-YYYY HH:mm" value={value} />
      </CourierInfoBoxText>
    </PromotionInfoBox>
  );

  const promotionFinishDate = (text: string, icon: ReactNode, value: string) => (
    <PromotionFinishDateBox>
      {icon}
      <CourierInfoBoxText>
        <Text style={{ color: '#ffffff' }}>{text.toUpperCase()}</Text>
        <DateField format="DD-MM-YYYY HH:mm" value={value} />
      </CourierInfoBoxText>
    </PromotionFinishDateBox>
  );
  const renderProducts = () => (
    <>
      <header className={styles.header}>
        <Title level={5} className={styles.title}>
          Товары, участвующие в акции
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={openProductAddModal}>
          Добавить товар
        </Button>
      </header>
      <Table pagination={false} dataSource={promotion?.products}>
        <Table.Column<PromotionProducts>
          defaultSortOrder="descend"
          sorter={(a: PromotionProducts, b: PromotionProducts) => (a.product.title > b.product.title ? 1 : -1)}
          dataIndex="name"
          title="Товар"
          render={(value, record) => (
            <Product>
              <Avatar
                size={{
                  md: 60,
                  lg: 108,
                  xl: 108,
                  xxl: 108,
                }}
                src={record?.product?.mainPhoto[0]?.url}
              />
              <ProductText>
                <Text style={{ fontWeight: 700 }}>{record?.product?.title}</Text>
                <Text>#{record.id}</Text>
              </ProductText>
            </Product>
          )}
        />
        <Table.Column<PromotionProducts>
          title="Является активным"
          dataIndex="isActive"
          align="center"
          render={(value: any) => <PromotionStatus status={value} />}
        />
        <Table.Column<PromotionProducts>
          title="Цена без скидки"
          dataIndex="discount"
          sorter={(a: PromotionProducts, b: PromotionProducts) => a.product?.price - b.product?.price}
          render={(value, record) => (
            <Text style={{ fontWeight: 600, fontSize: '18px' }}>{record?.product?.price} ₸</Text>
          )}
        />
        <Table.Column<PromotionProducts>
          title="Скидка"
          dataIndex="discount"
          align="center"
          sorter={(a: PromotionProducts, b: PromotionProducts) => a?.discount - b?.discount}
          render={(value, record) => (
            <Tag style={{ fontWeight: 600, fontSize: '18px' }} color={'green'}>
              {record?.discount} %
            </Tag>
          )}
        />
        <Table.Column<PromotionProducts>
          title="Цена со скидкой"
          dataIndex="discount"
          align="center"
          sorter={(a: PromotionProducts, b: PromotionProducts) => a?.discountPrice - b?.discountPrice}
          render={(value, record) => (
            <Text style={{ fontWeight: 600, fontSize: '18px' }}>{record?.discountPrice}₸</Text>
          )}
        />
        <Table.Column<PromotionProducts>
          title="Действия"
          key="actions"
          align="center"
          dataIndex="actions"
          render={(_text, record) => {
            return (
              <Space>
                {/* <EditButton
                  hideText
                  size="small"
                  resource="promotion-product"
                  onClick={() => editShow(record.id)}
                />
                <DeleteButton
                  hideText
                  size="small"
                  recordItemId={(record as BaseRecord).id as BaseKey}
                  resource="promotion-product"
                /> */}
              </Space>
            );
          }}
        />
      </Table>
    </>
  );

  return (
    <PageWrapper>
      <BackButton />
      <br />
      {isLoading ? (
        <Spin />
      ) : promotion ? (
        <Row justify="center">
          <Col xl={12} lg={12}>
            <Courier>
              <CourierInfoText>
                <Text>ID #{promotion?.id}</Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  {promotion?.title}
                </Text>
                <Text>
                  Статус акции: <PromotionStatus status={promotion?.isActive} />
                </Text>
                <Title level={5}>Поставщик</Title>
                <Text>{promotion?.provider?.title}</Text>
                <Title level={5}>Подзаголовок</Title>
                <Text>{promotion?.subTitle}</Text>
                <Title level={5}>Описание</Title>
                <Text>{promotion?.description}</Text>
              </CourierInfoText>
            </Courier>
          </Col>
          <CourierBoxContainer xl={12} lg={12} md={24}>
            <Image src={promotion?.photo[0]?.url} title={promotion?.photo[0]?.name} width={'30%'} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {promotionStartDate(
                'Дата начала',
                <FieldTimeOutlined style={{ color: '#ffff', fontSize: 28 }} />,
                promotion?.startDate.toString()
              )}
              {promotionFinishDate(
                'Дата окончания',
                <FieldTimeOutlined style={{ color: '#ffff', fontSize: 28 }} />,
                promotion?.startDate.toString()
              )}
            </div>
          </CourierBoxContainer>
        </Row>
      ) : null}
      <Divider />
      {renderProducts()}
      <ProductAddModal
        openModal={openProductModalValue}
        promotionId={promotionId}
        onClose={() => setOpenProductModalValue(false)}
      />
    </PageWrapper>
  );
};

export default PromotionShowPage;
