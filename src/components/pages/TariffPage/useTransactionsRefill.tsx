import { useEffect, useState } from 'react';
import { errorNotification } from '../../../helpers/errorNotification';
import { useNotification } from '../../../contexts/notificationContext';
import UserService from '../../../services/userService';
import { DateField } from '../../../helpers/DateField';
import { TransactionRefillDto } from '../../../interfaces/Transaction/TransactionRefillDto';
import { TransactionRefillService } from '../../../services/TransactionRefillService';

const useTransactionsRefill = () => {
  const [shouldRerender, setShouldRerender] = useState(false);
  const [loadingRefill, setLoadingRefill] = useState(false);
  const [transactionRefills, setTransactionRefills] = useState<TransactionRefillDto[]>([]);
  const [totalTransactionRefills, setTotalTransactionRefills] = useState(0);
  const [currentPageRefill, setCurrentPageRefill] = useState<number | undefined>(1);
  const { openNotification } = useNotification();

  useEffect(() => {
    setLoadingRefill(true);
    TransactionRefillService.getAllTransactionRefill({
      page: currentPageRefill,
      userId: UserService.getCurrentUser().id,
    })
      .then((response) => {
        setTransactionRefills(response.data.list);
        setTotalTransactionRefills(response.data.total_number);
      })
      .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
      .finally(() => {
        setLoadingRefill(false);
      });
  }, [currentPageRefill, shouldRerender]);

  const columnsRefill = [
    {
      title: 'Номер',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Сумма пополнение',
      dataIndex: 'sum',
      key: 'sum',
      render: (record: any) => <>{record} ₸</>,
    },
    {
      title: 'Время выполнение',
      dataIndex: 'execution_time',
      key: 'execution_time',
      render: (record: any) => <DateField format="DD-MM-YYYY HH:mm" value={record} />,
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
    loadingRefill,
    setLoadingRefill,
    transactionRefills,
    setTransactionRefills,
    totalTransactionRefills,
    setTotalTransactionRefills,
    currentPageRefill,
    setCurrentPageRefill,
    columnsRefill,
  };
};

export default useTransactionsRefill;
