import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Space, Popconfirm, Image, Tag, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { errorNotification } from '../../../helpers/errorNotification';
import { useNotification } from '../../../contexts/notificationContext';
import { CategoriesDtoResponse } from '../../../interfaces/Categories/CategoriesDtoResponse';
import { Link } from 'react-router-dom';
import UserService from '../../../services/userService';
import { ProductsService } from '../../../services/ProductsService';
import { ProductsDtoResponse } from '../../../interfaces/Products/ProductsDtoResponse';
import { OrdersDtoForAllResponse } from '../../../interfaces/Orders/OrdersDtoForAllResponse';
import { OrdersService } from '../../../services/OrdersService';
import { OrderStatus } from './OrderStatus/OrderStatus';
import { DateField } from '../../../helpers/DateField';

const useOrdersPage = () => {
  const [shouldRerender, setShouldRerender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrdersDtoForAllResponse[]>([]);
  const [categories, setCategories] = useState<CategoriesDtoResponse[]>([]);
  const [subCategories, setSubCategories] = useState<CategoriesDtoResponse[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState<number | undefined>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | undefined>(undefined);
  const { openNotification } = useNotification();

  useEffect(() => {
    setLoading(true);

    const delayedSearch = setTimeout(() => {
      OrdersService.getOrders({
        page: currentPage,
        userId: UserService.getCurrentUser().id,
        categoryId: selectedCategory,
        subcategoryId: selectedSubCategory,
        keyword: searchQuery,
      })
        .then((response) => {
          setOrders(response.data.list);
          setTotalOrders(response.data.total_number);
          setLoading(false);
        })
        .catch((err) => errorNotification('Не удалось получить данные', err.response?.status));
    }, 1000);

    return () => clearInterval(delayedSearch);
  }, [currentPage, searchQuery, selectedCategory, selectedSubCategory, shouldRerender]);

  const onAcceptOrder = (orderId: number) => {
    OrdersService.acceptOrder(orderId)
      .then(() => {
        openNotification('Заказ принят!', '', 'success', 1.5);
        setShouldRerender(!shouldRerender);
      })
      .catch((err) => errorNotification('Не удалось принят заказ', err.response?.status));
  };

  const onRejectOrder = (orderId: number) => {
    OrdersService.rejectOrder(orderId)
      .then(() => {
        openNotification('Заказ не принят!', '', 'success', 1.5);
        setShouldRerender(!shouldRerender);
      })
      .catch((err) => errorNotification('Не удалось отклонять заказ', err.response?.status));
  };

  const columns = [
    {
      title: 'Номер',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (record: any) => {
        return <OrderStatus status={record} />;
      },
    },
    {
      title: 'Дата',
      dataIndex: 'created',
      key: 'created',
      render: (record: any) => <DateField format="DD-MM-YYYY HH:mm" value={record} />,
    },
    {
      title: 'Кол',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
    },
    {
      title: 'Цена',
      dataIndex: 'totalAmountWithDiscount',
      key: 'totalAmountWithDiscount',
      render: (record: any) => <> {record} ₸</>,
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      key: 'actions',
      width: 120,
      render: (text: any, record: any) => (
        <Space size="middle">
          <Popover title="Посмотреть заказ">
            <Link to={`/orders/show/${record.key}`}>
              <Button>
                <EyeOutlined />
              </Button>
            </Link>
          </Popover>
          <Popover title="Принять заказ">
            <Button type="primary" ghost onClick={() => onAcceptOrder(record.key)}>
              <CheckCircleOutlined twoToneColor="#2ECC71" />
            </Button>
          </Popover>
          <Popover title="Отклонять заказ">
            <Button type="default" danger onClick={() => onRejectOrder(record.key)}>
              <CloseCircleOutlined twoToneColor="#ff0000" />
            </Button>
          </Popover>
        </Space>
      ),
    },
  ];

  return {
    shouldRerender,
    setShouldRerender,
    loading,
    setLoading,
    categories,
    setCategories,
    subCategories,
    setSubCategories,
    orders,
    setOrders,
    totalOrders,
    setTotalOrders,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    onAcceptOrder,
    onRejectOrder,
    columns,
  };
};

export default useOrdersPage;
