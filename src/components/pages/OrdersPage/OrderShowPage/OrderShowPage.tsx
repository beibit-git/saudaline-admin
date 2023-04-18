import React, { useState, ReactNode } from 'react';
import { Button, Typography, Card, Row, Col, Spin, Select, Avatar, List, Table } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MobileOutlined,
  EnvironmentOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';
import PageWrapper from '../../../../ui/PageWrapper';
import { CategoriesService } from '../../../../services/CategoriesService';
import { CategoriesDtoResponse } from '../../../../interfaces/Categories/CategoriesDtoResponse';
import BackButton from '../../../../ui/BackButton';
import UserService from '../../../../services/userService';
import { errorNotification } from '../../../../helpers/errorNotification';
import { successNotification } from '../../../../helpers/successNotification';
import { CategoryDtoRequest } from '../../../../interfaces/Categories/CategoryDtoRequest';
import { ProductsService } from '../../../../services/ProductsService';
import { ProductDtoRequest } from '../../../../interfaces/Products/ProductDtoRequest';
import { BrandsService } from '../../../../services/BrandsService';
import { BrandsDtoResponse } from '../../../../interfaces/Products/BrandsDtoResponse';
import { SubCategoriesService } from '../../../../services/SubCategoriesService';
import { SubCategoriesDtoResponse } from '../../../../interfaces/Categories/SubCategoriesDtoResponse';
import { useNotification } from '../../../../contexts/notificationContext';
import { Constants } from '../../../../common/constants';
import { OrderDtoShow } from '../../../../interfaces/Orders/OrderShow/OrderDtoShow';
import { OrdersService } from '../../../../services/OrdersService';
import { OrderStatus } from '../OrderStatus/OrderStatus';
import styles from './style.module.css';
import { DateField } from '../../../../helpers/DateField';
import {
  ContainerDetails,
  CourierBoxContainer,
  CourierInfoBox,
  CourierInfoBoxText,
  Product,
  ProductFooter,
  ProductText,
} from './styled';
import { DeliveryDetailsDto } from '../../../../interfaces/Orders/OrderShow/DeliveryDetailsDto';
import { OrderDetailsDto } from '../../../../interfaces/Orders/OrderShow/OrderDetailsDto';

const { Title } = Typography;
const { Text } = Typography;
const { Option } = Select;

interface Props {
  orderId?: number;
}

const OrderShowPage = ({ orderId }: Props) => {
  const apiUrl = Constants.API_BASE_URL;
  const [shouldRerender, setShouldRerender] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderDtoShow>();
  const { openNotification } = useNotification();
  const [loadings, setLoadings] = useState<boolean[]>([]);

  // useEffect для страниц с редактированием дисциплины
  React.useEffect(() => {
    if (orderId) {
      setLoading(true);
      OrdersService.getOneOrder(orderId)
        .then(({ data }) => {
          setOrder(data);
        })
        .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
        .finally(() => setLoading(false));
    }
  }, [orderId, shouldRerender]);

  const onAcceptOrder = (orderId: number | undefined) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    OrdersService.acceptOrder(orderId)
      .then(() => {
        openNotification('Заказ принят!', '', 'success', 1.5);
        setShouldRerender(!shouldRerender);
      })
      .catch((err) => errorNotification('Не удалось принят заказ', err.response?.status))
      .finally(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[0] = false;
          return newLoadings;
        });
      });
  };

  const onRejectOrder = (orderId: number | undefined) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[1] = true;
      return newLoadings;
    });
    OrdersService.rejectOrder(orderId)
      .then(() => {
        openNotification('Заказ не принят!', '', 'success', 1.5);
        setShouldRerender(!shouldRerender);
      })
      .catch((err) => errorNotification('Не удалось отклонять заказ', err.response?.status))
      .finally(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[1] = false;
          return newLoadings;
        });
      });
  };

  const canAcceptOrder = order?.status === 'NEW';
  const canRejectOrder = order?.status === 'NEW' || order?.status === 'APPROVED';

  const courierInfoBox = (text: string, icon: ReactNode, value?: ReactNode) => (
    <CourierInfoBox>
      {icon}
      <CourierInfoBoxText>
        <Text style={{ color: '#ffffff' }}>{text.toUpperCase()}</Text>
        {value}
      </CourierInfoBoxText>
    </CourierInfoBox>
  );

  const renderProducts = () => (
    <>
      {order ? (
        <>
          <Text style={{ fontSize: 22, fontWeight: 800 }}>Товары</Text>
          <Table
            pagination={false}
            dataSource={order.details}
            footer={(_data) => (
              <>
                <ProductFooter>
                  <Text>Общие количество: </Text>
                  <Text>{order?.totalQuantity} шт</Text>
                </ProductFooter>
                <ProductFooter>
                  <Text>Сумма: </Text>
                  <Text> {order?.totalAmount} ₸</Text>
                </ProductFooter>
                <ProductFooter>
                  <Text>Скидка: </Text>
                  <Text>
                    - {order?.totalAmountWithDiscount ? order?.totalAmount - order?.totalAmountWithDiscount : 0} ₸
                  </Text>
                </ProductFooter>
                <ProductFooter>
                  <Text style={{ fontSize: '18px', color: '#1677ff' }}>Итого: </Text>
                  <Text style={{ fontSize: '18px' }}> {order?.totalAmountWithDiscount} ₸</Text>
                </ProductFooter>
              </>
            )}
          >
            <Table.Column<OrderDetailsDto>
              defaultSortOrder="descend"
              sorter={(a: OrderDetailsDto, b: OrderDetailsDto) => (a.product.title > b.product.title ? 1 : -1)}
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
                    src={record.product.mainPhoto[0].url}
                  />
                  <ProductText>
                    <Text style={{ fontWeight: 700 }}>{record.product.title}</Text>
                    <Text>#{record.id}</Text>
                  </ProductText>
                </Product>
              )}
            />
            <Table.Column<OrderDetailsDto>
              title="Количество"
              dataIndex="quantity"
              sorter={(a: OrderDetailsDto, b: OrderDetailsDto) => a.quantity - b.quantity}
              render={(value, record) => <Text style={{ fontWeight: 800 }}>{record.quantity} шт</Text>}
            />
            <Table.Column<OrderDetailsDto>
              defaultSortOrder="descend"
              sorter={(a: OrderDetailsDto, b: OrderDetailsDto) => a.price - b.price}
              dataIndex="price"
              title="Цена"
              render={(value, record) => <Text style={{ fontWeight: 800 }}>{record?.price} ₸</Text>}
            />
            <Table.Column<OrderDetailsDto>
              defaultSortOrder="descend"
              sorter={(a: OrderDetailsDto, b: OrderDetailsDto) => a.discount - b.discount}
              dataIndex="price"
              align="center"
              title="Скидка"
              render={(value, record) => (
                <Text style={{ fontWeight: 800 }}>{record?.discount != 0 ? <>{record?.discount} %</> : <>-</>}</Text>
              )}
            />
            <Table.Column<OrderDetailsDto>
              defaultSortOrder="descend"
              sorter={(a: OrderDetailsDto, b: OrderDetailsDto) => a.discount - b.discount}
              dataIndex="price"
              align="center"
              title="Цена со скидкой"
              render={(value, record) => (
                <Text style={{ fontWeight: 800 }}>
                  {record?.discount != 0 ? <>{record?.priceWithDiscount} ₸</> : <>-</>}
                </Text>
              )}
            />
            <Table.Column<OrderDetailsDto>
              defaultSortOrder="descend"
              sorter={(a: OrderDetailsDto, b: OrderDetailsDto) => a.price * a.quantity - b.price * b.quantity}
              dataIndex="price"
              title="Итого"
              render={(value, record) => (
                <Text style={{ fontWeight: 800 }}>
                  {record?.discount != 0 ? <>{record?.sumWithDiscount} ₸</> : <>{record.sum} ₸</>}
                </Text>
              )}
            />
          </Table>
        </>
      ) : null}
    </>
  );

  return (
    <PageWrapper>
      <BackButton />
      <br />
      <Col xl={24} lg={24}>
        <Title level={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{order ? `Заказ №${order.id}` : 'Загрузка'} </div>
          <div>
            <Text style={{ fontSize: '16px' }}>
              Статус заказа: <OrderStatus status={order?.status} />
            </Text>
            <Button
              disabled={!canAcceptOrder}
              key="accept"
              icon={<CheckCircleOutlined />}
              type="primary"
              onClick={() => onAcceptOrder(order?.id)}
              loading={loadings[0]}
            >
              Принимать
            </Button>
            {`     `}
            <Button
              disabled={!canRejectOrder}
              key="reject"
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => onRejectOrder(order?.id)}
              loading={loadings[1]}
            >
              Отклонять
            </Button>
          </div>
        </Title>
      </Col>
      {isLoading ? (
        <Spin />
      ) : order ? (
        <>
          <Card>
            <Row justify="space-between">
              <Col xl={12} lg={12}>
                <div className={styles.flexrow}>
                  <Avatar size={108} src={order?.customer.logotype[0].url} />
                  <div className={styles.orderer}>
                    <Text style={{ fontSize: 16 }}>ЗАКАЗЧИК:</Text>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                      }}
                    >
                      {order?.customer.businessType.name} {order?.customer.name}
                    </Text>
                    <Text>
                      Дата: <DateField format="DD-MM-YYYY HH:mm" value={order.created.toString()} />
                    </Text>
                  </div>
                </div>
                <Col>
                  <Text>
                    <strong>ФИО заказчика:</strong> {order?.deliveryDetails.fio}
                  </Text>
                  <br />
                  <Text>
                    <strong>Телефон:</strong> {order?.deliveryDetails.tel}
                  </Text>
                  <br />
                </Col>
                <Col>
                  <Text>
                    <strong>Эл. почта:</strong> {order?.deliveryDetails.email}
                  </Text>
                  <br />
                  <Text>
                    <strong>Регион:</strong> {order?.deliveryDetails.region.nameRu}
                    {'   '}
                    <strong>Город:</strong>
                    {order?.deliveryDetails.city.name}
                  </Text>
                  <br />
                  <Text>
                    <strong>Адрес:</strong> {order?.deliveryDetails.address}
                  </Text>
                </Col>
              </Col>
              <ContainerDetails xl={12} lg={12}>
                <CourierBoxContainer xl={24} lg={24} md={24}>
                  {courierInfoBox(
                    'Телефон',
                    <MobileOutlined style={{ color: '#ffff', fontSize: 32 }} />,
                    order?.deliveryDetails.tel
                  )}
                  {courierInfoBox(
                    'Адрес',
                    <EnvironmentOutlined style={{ color: '#ffff', fontSize: 32 }} />,
                    order?.deliveryDetails.address
                  )}
                </CourierBoxContainer>
                <CourierBoxContainer xl={24} lg={24} md={24}>
                  {courierInfoBox(
                    'Дата заказа',
                    <FieldTimeOutlined style={{ color: '#ffff', fontSize: 32 }} />,
                    <DateField format="DD-MM-YYYY HH:mm" value={order.created.toString()} />
                  )}
                  {courierInfoBox(
                    'Дата поставки',
                    <FieldTimeOutlined style={{ color: '#ffff', fontSize: 32 }} />,
                    <DateField format="DD-MM-YYYY HH:mm" value={order.created.toString()} />
                  )}
                </CourierBoxContainer>
              </ContainerDetails>
            </Row>
          </Card>
        </>
      ) : null}
      {renderProducts()}
    </PageWrapper>
  );
};

export default OrderShowPage;
