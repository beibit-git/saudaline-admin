import { useEffect, useState } from 'react';
import { errorNotification } from '../../../helpers/errorNotification';
import { useNotification } from '../../../contexts/notificationContext';
import UserService from '../../../services/userService';
import { TransactionDeductionDto } from '../../../interfaces/Transaction/TransactionDeductionDto';
import { TransactionDeductionService } from '../../../services/TransactionDeductionService';
import { DateField } from '../../../helpers/DateField';

const useTransactionDeduction = () => {
  const [shouldRerender, setShouldRerender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionDeductions, setTransactionDeductions] = useState<TransactionDeductionDto[]>([]);
  const [totalTransactionDeductions, setTotalTransactionDeductions] = useState(0);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const { openNotification } = useNotification();

  useEffect(() => {
    setLoading(true);
    TransactionDeductionService.getTransactionDeduction({
      page: currentPage,
      userId: UserService.getCurrentUser().id,
    })
      .then((response) => {
        setTransactionDeductions(response.data.list);
        setTotalTransactionDeductions(response.data.total_number);
      })
      .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, shouldRerender]);

  const columns = [
    {
      title: 'Номер',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Сумма издержки',
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
    {
      title: 'Заказ №',
      dataIndex: 'order',
      key: 'order',
      render: (record: any) => <>№ {record.id}</>,
    },
    {
      title: 'Сумма заказа',
      dataIndex: 'order',
      key: 'order',
      render: (record: any) => <>{record.totalAmountWithDiscount} ₸</>,
    },
  ];

  return {
    shouldRerender,
    setShouldRerender,
    loading,
    setLoading,
    transactionDeductions,
    setTransactionDeductions,
    totalTransactionDeductions,
    setTotalTransactionDeductions,
    currentPage,
    setCurrentPage,
    columns,
  };
};

export default useTransactionDeduction;
