import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Button, Space, Tag, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { errorNotification } from '../../../../helpers/errorNotification';
import { useNotification } from '../../../../contexts/notificationContext';
import { SubCategoriesService } from '../../../../services/SubCategoriesService';
import { SubCategoriesDtoResponse } from '../../../../interfaces/Categories/SubCategoriesDtoResponse';

const useSubCategoriesPage = () => {
  const [shouldRerender, setShouldRerender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState<SubCategoriesDtoResponse[]>([]);
  const [totalSubCategories, setTotalSubCategories] = useState(0);
  const [currentPage, setCurrentPage] = useState<number | undefined>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const { openNotification } = useNotification();

  useEffect(() => {
    setLoading(true);

    const delayedSearch = setTimeout(() => {
      SubCategoriesService.getSubCategories({
        page: currentPage,
        categoryId: selectedCategory,
        keyword: searchQuery,
      })
        .then((response) => {
          setSubCategories(response.data.list);
          setTotalSubCategories(response.data.total_number);
          setLoading(false);
        })
        .catch((err) => errorNotification('Не удалось получить данные', err.response?.status));
    }, 1000);

    return () => clearInterval(delayedSearch);
  }, [currentPage, searchQuery, selectedCategory, shouldRerender]);

  const onDeleteDiscipline = (subCategoryId: number) => {
    SubCategoriesService.deleteSubCategory(subCategoryId)
      .then(() => {
        openNotification('Запись удалено!', '', 'success', 1.5);
        setShouldRerender(!shouldRerender);
      })
      .catch((err) => errorNotification('Не удалось удалить данные', err.response?.status));
  };

  const columns = [
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
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
          <Button href={`/disciplines/edit/${record.key}`}>
            <EditTwoTone />
          </Button>
          <Popconfirm
            title="Вы уверены, что хотите удалить запись?"
            onConfirm={() => onDeleteDiscipline(record.key)}
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
    subCategories,
    setSubCategories,
    totalSubCategories,
    setTotalSubCategories,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    onDeleteDiscipline,
    columns,
  };
};

export default useSubCategoriesPage;
