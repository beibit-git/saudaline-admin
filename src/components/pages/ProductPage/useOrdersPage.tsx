import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Button, Space, Popconfirm, Image, Tag } from 'antd';
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

  const onDeleteProduct = (productId: number) => {
    ProductsService.deleteProduct(productId)
      .then(() => {
        openNotification('Запись удалено!', '', 'success', 1.5);
        setShouldRerender(!shouldRerender);
      })
      .catch((err) => errorNotification('Не удалось удалить данные', err.response?.status));
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
      render: (record: any) => <Tag color="error">{record}</Tag>,
    },
    {
      title: 'Дата',
      dataIndex: 'created',
      key: 'created',
    },
    {
      title: 'Кол',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
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
          <Link to={`/products/edit/${record.key}`}>
            <Button>
              <EditTwoTone />
            </Button>
          </Link>
          <Popconfirm
            title="Вы уверены, что хотите удалить запись?"
            onConfirm={() => onDeleteProduct(record.key)}
            okText="Да"
            cancelText="Нет"
          >
            <Button type="default" danger>
              <DeleteTwoTone twoToneColor="#ff0000" />
            </Button>
          </Popconfirm>
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
    onDeleteProduct,
    columns,
  };
};

export default useOrdersPage;
