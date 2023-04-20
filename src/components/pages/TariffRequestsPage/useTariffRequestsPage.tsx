import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Space, Popconfirm, Image, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { errorNotification } from '../../../helpers/errorNotification';
import { useNotification } from '../../../contexts/notificationContext';
import { Link } from 'react-router-dom';
import UserService from '../../../services/userService';
import { Promotions } from '../../../interfaces/Promotions/Promotions';
import { PromotionsService } from '../../../services/PromotionsService';
import { DateField } from '../../../helpers/DateField';
import { PromotionDtoForAll } from '../../../interfaces/Promotions/PromotionDtoForAll';
import { TariffRequestDto } from '../../../interfaces/Tariff/TariffRequestDto';
import { TariffRequestService } from '../../../services/TariffRequestService';
import { TariffStatus } from '../TariffPage/TariffStatus';
const useTariffRequestsPage = () => {
  const [shouldRerender, setShouldRerender] = useState(false);
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(false);
  const [tariffRequests, setTariffRequests] = useState<TariffRequestDto[]>([]);
  const [totalTariffRequests, setTotalTariffRequests] = useState(0);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { openNotification } = useNotification();

  useEffect(() => {
    setLoading(true);

    TariffRequestService.getAllTariffRequest({
      page: currentPage,
      keyword: searchQuery,
    })
      .then((response) => {
        setTariffRequests(response.data.list);
        setTotalTariffRequests(response.data.total_number);
        setLoading(false);
      })
      .catch((err) => errorNotification('Не удалось получить данные', err.response?.status));
  }, [currentPage, searchQuery, shouldRerender]);

  const onConfirmTariff = (tariffRequestId: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[tariffRequestId] = true;
      return newLoadings;
    });
    TariffRequestService.confirmTariff(tariffRequestId)
      .then(() => {
        openNotification('Тариф успешно подключен к поставщику!', '', 'success', 1.5);
        setShouldRerender(!shouldRerender);
      })
      .catch((err) => errorNotification('Не удалось обновить данные', err.response?.status))
      .finally(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[tariffRequestId] = false;
          return newLoadings;
        });
      });
  };

  const onDontConfirmTariff = (tariffRequestId: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[tariffRequestId] = true;
      return newLoadings;
    });
    TariffRequestService.dontConfirmTariff(tariffRequestId)
      .then(() => {
        openNotification('Тариф отклонен поставщику!', '', 'success', 1.5);
        setShouldRerender(!shouldRerender);
      })
      .catch((err) => errorNotification('Не удалось обновить данные', err.response?.status))
      .finally(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[tariffRequestId] = false;
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
      title: 'Поставщик',
      dataIndex: 'provider',
      key: 'provider',
      render: (record: any) => <>{record.name}</>,
    },
    {
      title: 'Телефон номер',
      dataIndex: 'tel',
      key: 'tel',
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
      render: (record: any) => <>{`${record?.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}`} ₸</>,
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
    {
      title: 'Действия',
      dataIndex: 'actions',
      key: 'actions',
      width: 120,
      render: (text: any, record: any) => {
        const canAcceptOrder = record?.status === 'NEW';
        const canRejectOrder = record?.status === 'NEW';
        return (
          <Space size="middle">
            <Tooltip title="Подтвердить платеж">
              <Button
                disabled={!canAcceptOrder}
                type="primary"
                ghost
                onClick={() => onConfirmTariff(record.id)}
                loading={loadings[record.id]}
              >
                <CheckCircleOutlined twoToneColor="#52c41a" />
              </Button>
            </Tooltip>
            <Tooltip title="Платеж не произведен" placement="left">
              <Button
                disabled={!canRejectOrder}
                danger
                onClick={() => onDontConfirmTariff(record.id)}
                loading={loadings[record.id]}
              >
                <CloseCircleOutlined twoToneColor="#eb2f96" />
              </Button>
            </Tooltip>
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
    tariffRequests,
    setTariffRequests,
    totalTariffRequests,
    setTotalTariffRequests,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    onConfirmTariff,
    onDontConfirmTariff,
    columns,
  };
};

export default useTariffRequestsPage;
