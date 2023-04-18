import { DeleteTwoTone, EditTwoTone, EyeOutlined } from '@ant-design/icons';
import { Button, Space, Popconfirm, Image, Tag, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { errorNotification } from '../../../helpers/errorNotification';
import { useNotification } from '../../../contexts/notificationContext';
import { Link } from 'react-router-dom';
import UserService from '../../../services/userService';
import { Promotions } from '../../../interfaces/Promotions/Promotions';
import { PromotionsService } from '../../../services/PromotionsService';
import { DateField } from '../../../helpers/DateField';
import { PromotionDtoForAll } from '../../../interfaces/Promotions/PromotionDtoForAll';

const usePromotionsPage = () => {
  const [shouldRerender, setShouldRerender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promotions, setPromotions] = useState<PromotionDtoForAll[]>([]);
  const [totalPromotions, setTotalPromotions] = useState(0);
  const [currentPage, setCurrentPage] = useState<number | undefined>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { openNotification } = useNotification();

  useEffect(() => {
    setLoading(true);

    const delayedSearch = setTimeout(() => {
      PromotionsService.getPromotions({
        page: currentPage,
        userId: UserService.getCurrentUser().id,
        keyword: searchQuery,
      })
        .then((response) => {
          setPromotions(response.data.list);
          setTotalPromotions(response.data.total_number);
          setLoading(false);
        })
        .catch((err) => errorNotification('Не удалось получить данные', err.response?.status));
    }, 1000);

    return () => clearInterval(delayedSearch);
  }, [currentPage, searchQuery, shouldRerender]);

  const onDeletePromotion = (promotionId: number) => {
    PromotionsService.deletePromotion(promotionId)
      .then(() => {
        openNotification('Акция удалено!', '', 'success', 1.5);
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
    // {
    //   title: 'Картинка',
    //   dataIndex: 'photo',
    //   key: 'photo',
    //   render: (record: any) => (
    //     <Space> {record ? <Image width={150} src={record}></Image> : <Tag color="error">Нет фото</Tag>}</Space>
    //   ),
    // },
    {
      title: 'Наименование',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Дата начала',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (value: any) => <DateField format="DD-MM-YYYY HH:mm" value={value} />,
    },
    {
      title: 'Дата окончания',
      dataIndex: 'finishDate',
      key: 'finishDate',
      render: (value: any) => <DateField format="DD-MM-YYYY HH:mm" value={value} />,
    },
    {
      title: 'Статус',
      dataIndex: 'isActive',
      key: 'id',
      render: (record: any) => (
        <Space> {record ? <Tag color="success">Активен</Tag> : <Tag color="error">Неактивен</Tag>}</Space>
      ),
      width: '50',
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      key: 'actions',
      width: 120,
      render: (text: any, record: any) => (
        <Space size="middle">
          <Popover title="Посмотреть акцию">
            <Link to={`/promotions/show/${record.key}`}>
              <Button>
                <EyeOutlined />
              </Button>
            </Link>
          </Popover>
          <Popover title="Изменить акцию">
            <Link to={`/promotions/edit/${record.key}`}>
              <Button>
                <EditTwoTone />
              </Button>
            </Link>
          </Popover>
          <Popconfirm
            title="Вы уверены, что хотите удалить запись?"
            onConfirm={() => onDeletePromotion(record.key)}
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
    promotions,
    setPromotions,
    totalPromotions,
    setTotalPromotions,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    onDeletePromotion,
    columns,
  };
};

export default usePromotionsPage;
