import { useEffect, useState } from 'react';
import { errorNotification } from '../../../helpers/errorNotification';
import { useNotification } from '../../../contexts/notificationContext';
import { ProviderDtoResponse } from '../../../interfaces/provider/ProviderDtoResponse';
import { ProvidersService } from '../../../services/ProvidersService';
import { CustomerDtoResponse } from '../../../interfaces/Customers/CustomerDtoResponse';
import { CustomersService } from '../../../services/CustomersService';

const useCustomerPageAdmin = () => {
  const [shouldRerender, setShouldRerender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<CustomerDtoResponse[]>([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { openNotification } = useNotification();

  useEffect(() => {
    setLoading(true);
    CustomersService.getCustomers({
      page: currentPage,
      keyword: searchQuery,
    })
      .then((response) => {
        setCustomers(response.data.list);
        setTotalCustomers(response.data.total_number);
        setLoading(false);
      })
      .catch((err) => errorNotification('Не удалось получить данные', err.response?.status));
  }, [currentPage, searchQuery, shouldRerender]);

  // const onDeleteProduct = (productId: number) => {
  //   ProductsService.deleteProduct(productId)
  //     .then(() => {
  //       openNotification('Запись удалено!', '', 'success', 1.5);
  //       setShouldRerender(!shouldRerender);
  //     })
  //     .catch((err) => errorNotification('Не удалось удалить данные', err.response?.status));
  // };

  const columns = [
    {
      title: 'Номер',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Тип орг.',
      dataIndex: 'businessType',
      key: 'businessType',
      render: (record: any) => <> {record.name}</>,
    },
    {
      title: 'Названия',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'БИН',
      dataIndex: 'businessNumber',
      key: 'businessNumber',
    },
    {
      title: 'Тел.',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Город',
      dataIndex: 'city',
      key: 'city',
      render: (record: any) => <> {record?.name}</>,
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
    },
    // {
    //   title: 'Тариф',
    //   dataIndex: 'tariff',
    //   key: 'tariff',
    //   render: (record: any) => <> {record?.title}</>,
    // },
    // {
    //   title: 'Баланс',
    //   dataIndex: 'balance',
    //   key: 'balance',
    //   render: (record: any) => <> {record} ₸</>,
    // },
    // {
    //   title: 'Статус',
    //   dataIndex: 'isActive',
    //   key: 'id',
    //   render: (record: any) => (
    //     <Space> {record ? <Tag color="success">Активен</Tag> : <Tag color="error">Неактивен</Tag>}</Space>
    //   ),
    //   width: '50',
    // },
    // {
    //   title: 'Действия',
    //   dataIndex: 'actions',
    //   key: 'actions',
    //   width: 120,
    //   render: (text: any, record: any) => (
    //     <Space size="middle">
    //       <Link to={`/products/edit/${record.key}`}>
    //         <Button>
    //           <EditTwoTone />
    //         </Button>
    //       </Link>
    //       <Popconfirm
    //         title="Вы уверены, что хотите удалить запись?"
    //         onConfirm={() => onDeleteProduct(record.key)}
    //         okText="Да"
    //         cancelText="Нет"
    //       >
    //         <Button type="default" danger>
    //           <DeleteTwoTone twoToneColor="#ff0000" />
    //         </Button>
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
  ];

  return {
    shouldRerender,
    setShouldRerender,
    loading,
    setLoading,
    customers,
    setCustomers,
    totalCustomers,
    setTotalCustomers,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    columns,
  };
};

export default useCustomerPageAdmin;
