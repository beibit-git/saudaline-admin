import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Button, Space, Tag, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { errorNotification } from '../../../helpers/errorNotification';
import { useNotification } from '../../../contexts/notificationContext';
import { AcademicDegreeDtoResponse } from '../../../interfaces/AcademicDegreeDtoResponse';
import { CategoriesDtoResponse } from '../../../interfaces/Categories/CategoriesDtoResponse';
import { DisciplineDtoResponse } from '../../../interfaces/DisciplineDtoResponse';
import { PersistentStateConstants } from '../../../PersistentStateConstants';
import { CategoriesService } from '../../../services/CategoriesService';
import { Link } from 'react-router-dom';
import UserService from '../../../services/userService';
import styles from './style.module.css';

const useCategoriesPage = () => {
  const [shouldRerender, setShouldRerender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoriesDtoResponse[]>([]);
  const [academicDegrees, setAcademicDegrees] = useState<AcademicDegreeDtoResponse[]>([]);
  const [disciplines, setDisciplines] = useState<DisciplineDtoResponse[]>([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [currentPage, setCurrentPage] = useState<number | undefined>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<number | undefined>(undefined);
  const [selectedAcademicDegree, setSelectedAcademicDegree] = useState<number | undefined>(undefined);
  const { openNotification } = useNotification();

  useEffect(() => {
    setLoading(true);

    const delayedSearch = setTimeout(() => {
      CategoriesService.getCategories({
        page: currentPage,
        userId: UserService.getCurrentUser().id,
        academicDegreeId: selectedAcademicDegree,
        keyword: searchQuery,
      })
        .then((response) => {
          setCategories(response.data.list);
          setTotalCategories(response.data.total_number);
          setLoading(false);
        })
        .catch((err) => errorNotification('Не удалось получить данные', err.response?.status));
    }, 1000);

    return () => clearInterval(delayedSearch);
  }, [currentPage, searchQuery, selectedDepartment, selectedAcademicDegree, shouldRerender]);

  const onDeleteDiscipline = (categoryId: number) => {
    CategoriesService.deleteCategory(categoryId)
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
          <Link to={`/categories/edit/${record.key}`}>
            <Button>
              <EditTwoTone />
            </Button>
          </Link>
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
    categories,
    setCategories,
    academicDegrees,
    setAcademicDegrees,
    disciplines,
    setDisciplines,
    totalCategories,
    setTotalCategories,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    selectedAcademicDegree,
    setSelectedAcademicDegree,
    onDeleteDiscipline,
    columns,
  };
};

export default useCategoriesPage;
