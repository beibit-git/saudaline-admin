import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { errorNotification } from '../../../helpers/errorNotification';
import { useNotification } from '../../../contexts/notificationContext';
import { CategoriesDtoResponse } from '../../../interfaces/Categories/CategoriesDtoResponse';
import { Link } from 'react-router-dom';
import UserService from '../../../services/userService';
import { OrdersDtoForAllResponse } from '../../../interfaces/Orders/OrdersDtoForAllResponse';
import { OrdersService } from '../../../services/OrdersService';
import { OrderStatus } from './OrderStatus/OrderStatus';
import { DateField } from '../../../helpers/DateField';

const useOrdersPageAdmin = () => {
  const [shouldRerender, setShouldRerender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState<boolean[]>([]);
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

  const onRejectOrder = (orderId: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[1] = true;
      return newLoadings;
    });
    OrdersService.rejectOrder(orderId)
      .then(() => {
        openNotification('Заказ отклонен!', '', 'success', 1.5);
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
      render: (record: any) => <> {record - Math.round((record / 100) * 1)} ₸</>,
    },
    {
      title: 'Поставщик',
      dataIndex: 'provider',
      key: 'provider',
      render: (record: any) => <> {record}</>,
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      key: 'actions',
      width: 120,
      render: (text: any, record: any) => {
        const canAcceptOrder = record?.status === 'NEW';
        const canRejectOrder = record?.status === 'NEW' || record?.status === 'APPROVED';
        return (
          <Space size="middle">
            <Tooltip title="Посмотреть заказ">
              <Link to={`/order-admin/show/${record.key}`}>
                <Button>
                  <EyeOutlined />
                </Button>
              </Link>
            </Tooltip>
            {/* <Tooltip title="Принять заказ">
              <Button
                type="primary"
                ghost
                onClick={() => onAcceptOrder(record.key)}
                loading={loadings[0]}
                disabled={!canAcceptOrder}
              >
                <CheckCircleOutlined twoToneColor="#2ECC71" />
              </Button>
            </Tooltip> */}
            {/* <Tooltip title="Отклонять заказ">
              <Button
                type="default"
                danger
                onClick={() => onRejectOrder(record.key)}
                loading={loadings[1]}
                disabled={!canRejectOrder}
              >
                <CloseCircleOutlined twoToneColor="#ff0000" />
              </Button>
            </Tooltip> */}
          </Space>
        );
      },
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

export default useOrdersPageAdmin;
