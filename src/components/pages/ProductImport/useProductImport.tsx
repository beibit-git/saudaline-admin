import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Button, Space, Popconfirm, Image, Tag, UploadProps, notification } from 'antd';
import { useEffect, useState } from 'react';
import { errorNotification } from '../../../helpers/errorNotification';
import { useNotification } from '../../../contexts/notificationContext';
import { CategoriesDtoResponse } from '../../../interfaces/Categories/CategoriesDtoResponse';
import { Link } from 'react-router-dom';
import UserService from '../../../services/userService';
import { ProductsService } from '../../../services/ProductsService';
import { ProductsDtoResponse } from '../../../interfaces/Products/ProductsDtoResponse';
import { FileService } from '../../../services/FileService';
import { successNotification } from '../../../helpers/successNotification';

const useProductImport = () => {
  const [shouldRerender, setShouldRerender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductsDtoResponse[]>([]);
  const [categories, setCategories] = useState<CategoriesDtoResponse[]>([]);
  const [subCategories, setSubCategories] = useState<CategoriesDtoResponse[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState<number | undefined>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [selectedProvider, setSelectedProvider] = useState<number | undefined>(undefined);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { openNotification } = useNotification();
  const [importData, setImportData] = useState<{ data: ProductsDtoResponse[]; fileName: string }>();

  useEffect(() => {
    setLoading(true);

    const delayedSearch = setTimeout(() => {
      ProductsService.getProducts({
        page: currentPage,
        userId: UserService.getCurrentUser().id,
        categoryId: selectedCategory,
        subcategoryId: selectedSubCategory,
        keyword: searchQuery,
      })
        .then((response) => {
          setProducts(response.data.list);
          setTotalProducts(response.data.total_number);
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
      title: 'Картинка',
      dataIndex: 'mainPhoto',
      key: 'mainPhoto',
      render: (record: any) => (
        <Space> {record ? <Image width={150} src={record}></Image> : <Tag color="error">Нет фото</Tag>}</Space>
      ),
    },
    {
      title: 'Наименование',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (record: any) => <> {record} ₸</>,
    },
    // {
    //   title: 'Статус',
    //   dataIndex: 'isActive',
    //   key: 'id',
    //   render: (record: any) => (
    //     <Space> {record ? <Tag color="success">Активен</Tag> : <Tag color="error">Неактивен</Tag>}</Space>
    //   ),
    //   width: '50',
    // },
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

  const props: UploadProps = {
    // @ts-ignore
    action: (file) => {
      setLoading(true);
      FileService.importDataFromExcelFile(file, selectedProvider)
        .then(({ data }) => {
          setImportData({ data, fileName: file.name });
        })
        .catch((err) =>
          err.response.status === 500
            ? notification.error({
                message: 'Не удалось импортировать файл',
                description: 'Неверное содержание файла',
              })
            : errorNotification('Не удалось импортировать данные', err.response?.status)
        )
        .finally(() => setLoading(false));
    },
    multiple: false,
    showUploadList: false,
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };

  return {
    shouldRerender,
    setShouldRerender,
    loading,
    setLoading,
    categories,
    setCategories,
    subCategories,
    setSubCategories,
    products,
    setProducts,
    totalProducts,
    setTotalProducts,
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
    isModalOpen,
    setIsModalOpen,
  };
};

export default useProductImport;
