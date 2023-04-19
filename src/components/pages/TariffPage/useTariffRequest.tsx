import { useEffect, useState } from 'react';
import { errorNotification } from '../../../helpers/errorNotification';
import { useNotification } from '../../../contexts/notificationContext';
import UserService from '../../../services/userService';
import { DateField } from '../../../helpers/DateField';
import { TransactionRefillService } from '../../../services/TransactionRefillService';
import { TariffRequestDto } from '../../../interfaces/Tariff/TariffRequestDto';
import { TariffRequestService } from '../../../services/TariffRequestService';
import { TariffStatus } from './OrderStatus';

const useTariffRequest = () => {
  const [shouldRerender, setShouldRerender] = useState(false);
  const [loadingTRequest, setLoadingTRequest] = useState(false);
  const [tariffRequests, setTariffRequests] = useState<TariffRequestDto[]>([]);
  const [totalTariffRequests, setTotalTariffRequests] = useState(0);
  const [currentPageTRequest, setCurrentPageTRequest] = useState<number | undefined>(1);
  const { openNotification } = useNotification();

  useEffect(() => {
    setLoadingTRequest(true);
    TariffRequestService.getAllTariffRequest({
      page: currentPageTRequest,
      userId: UserService.getCurrentUser().id,
    })
      .then((response) => {
        setTariffRequests(response.data.list);
        setTotalTariffRequests(response.data.total_number);
      })
      .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
      .finally(() => {
        setLoadingTRequest(false);
      });
  }, [currentPageTRequest, shouldRerender]);

  const columnsTRequest = [
    {
      title: 'Номер',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Тариф',
      dataIndex: 'tariff',
      key: 'tariff',
      render: (record: any) => <>{record.title}</>,
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      key: 'sum',
      render: (record: any) => <>{record} ₸</>,
    },
    {
      title: 'Время',
      dataIndex: 'created',
      key: 'created',
      render: (record: any) => <DateField format="DD-MM-YYYY HH:mm" value={record} />,
    },
    {
      title: 'Статус заявки',
      dataIndex: 'status',
      key: 'status',
      render: (record: any) => <TariffStatus status={record} />,
    },
    // {
    //   title: 'Заказ №',
    //   dataIndex: 'order',
    //   key: 'order',
    //   render: (record: any) => <>№ {record.id}</>,
    // },
    // {
    //   title: 'Сумма заказа',
    //   dataIndex: 'order',
    //   key: 'order',
    //   render: (record: any) => <>{record.totalAmountWithDiscount} ₸</>,
    // },
  ];

  return {
    shouldRerender,
    setShouldRerender,
    loadingTRequest,
    setLoadingTRequest,
    tariffRequests,
    setTariffRequests,
    totalTariffRequests,
    setTotalTariffRequests,
    currentPageTRequest,
    setCurrentPageTRequest,
    columnsTRequest,
  };
};

export default useTariffRequest;
