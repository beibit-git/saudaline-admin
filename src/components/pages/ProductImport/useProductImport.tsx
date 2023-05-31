import { DeleteOutlined, DownloadOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Popconfirm, Space, Image, Tag, Typography, UploadProps } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { errorNotification } from '../../../helpers/errorNotification';
import { successNotification } from '../../../helpers/successNotification';
import { ProductsDtoResponse } from '../../../interfaces/Products/ProductsDtoResponse';
import { FileService } from '../../../services/FileService';
import { ProviderDtoResponse } from '../../../interfaces/provider/ProviderDtoResponse';
import { ProvidersService } from '../../../services/ProvidersService';
import { CategoriesDtoResponse } from '../../../interfaces/Categories/CategoriesDtoResponse';
import { SubCategoriesDtoResponse } from '../../../interfaces/Categories/SubCategoriesDtoResponse';
import { ProductsService } from '../../../services/ProductsService';

const useProductImport = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<ProductsDtoResponse[]>([]);
  const [editData, setEditData] = useState<ProductsDtoResponse>();
  const [importData, setImportData] = useState<{ data: ProductsDtoResponse[]; fileName: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const initialData = useRef<ProductsDtoResponse[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<number | undefined>(undefined);
  const [providers, setProviders] = useState<ProviderDtoResponse[]>([]);

  const columns = [
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
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (record: any) => <> {record} ₸</>,
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Подкатегория',
      dataIndex: 'subCategory',
      key: 'subCategory',
    },
    {
      title: 'Действие',
      dataIndex: 'operation',
      key: 'operation',
      render: (text: any, record: any) => (
        <Space>
          <Button type="default" onClick={() => editProduct(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Вы уверены, что хотите удалить запись?"
            onConfirm={() => deleteRecord(record)}
            okText="Да"
            cancelText="Нет"
          >
            <Button type="default" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: '5%',
    },
  ];

  const importColumns = [
    {
      title: 'Картинка',
      dataIndex: 'mainPhoto',
      key: 'mainPhoto',
      render: (record: any) => (
        <Space> {record ? <Image width={150} src={record?.url}></Image> : <Tag color="error">Нет фото</Tag>}</Space>
      ),
    },
    {
      title: 'Наименование',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      render: (record: any) => <> {record?.title}</>,
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',
      key: 'brand',
      render: (record: any) => <> {record?.name}</>,
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (record: any) => <> {record} ₸</>,
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      render: (record: CategoriesDtoResponse) => <> {record?.title}</>,
    },
    {
      title: 'Подкатегория',
      dataIndex: 'subCategory',
      key: 'subCategory',
      render: (record: SubCategoriesDtoResponse) => <> {record?.title}</>,
    },
  ];

  const props: UploadProps = {
    // @ts-ignore
    action: (file) => {
      setLoading(true);
      FileService.importDataFromExcelFile(file)
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

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = () => {
    setLoading(true);
    ProvidersService.getAll()
      .then(({ data }) => {
        setProviders(data);
      })
      .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
      .finally(() => setLoading(false));
    // CertificateService.getAll()
    //   .then(({ data }) => {
    //     setData(data);
    //     initialData.current = data;
    //   })
    //   .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
    //   .finally(() => setLoading(false));
  };

  const deleteRecord = (record: any) => {
    setLoading(true);
    // CertificateService.deleteCertificate(record.id)
    //   .then(({ data }) => notification.success({ message: 'Удалено' }))
    //   .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
    //   .finally(() => {
    //     setLoading(false);
    //     fetchCertificates();
    //   });
  };

  const createCertificate = () => {
    setCreateModalOpen(true);
  };

  const editProduct = (record: ProductsDtoResponse) => {
    setEditModalOpen(true);
    // CertificateService.getCertificateById(record.id)
    //   .then(({ data }) => {
    //     setEditData(data);
    //   })
    //   .catch((err) => errorNotification('Не удалось получить данные о сертификате', err.response?.status));
  };

  const closeModal = (products: ProductsDtoResponse[] | undefined) => {
    setEditModalOpen(false);
    setCreateModalOpen(false);
    setIsModalOpen(false);
    if (products !== undefined && products !== null) {
      ProductsService.cancelSavingExcel(products);
    }
    setImportData(undefined);

    // fetchCertificates();
  };

  // const searchByParameters = (e: string) => {
  //   if (!e.length) setData(initialData.current);
  //   else {
  //     const resultsByName = data.filter((item) => item.issuedTo.toLowerCase().includes(e.toLowerCase()));
  //     const resultsByCode = data.filter((item) => item.number.toLowerCase().includes(e.toLowerCase()));
  //     setData([...resultsByCode, ...resultsByName]);
  //   }
  // };

  const importFromExcelFile = () => {
    setIsModalOpen(true);
  };

  const saveCertificateList = () => {
    setLoading(true);
    // CertificateService.saveCertificateList(importData!.data)
    //   .then(({ data }) => successNotification('Данные успешно сохранены!'))
    //   .catch((err) => errorNotification('Не удалось импортировать данные', err.response?.status))
    //   .finally(() => setLoading(false));
  };

  return {
    data: {
      data,
      props,
      columns,
      loading,
      editModalOpen,
      createModalOpen,
      importColumns,
      editData,
      isModalOpen,
      importData,
      providers,
      selectedProvider,
    },
    handlers: {
      // searchByParameters,
      closeModal,
      editProduct,
      confirm: deleteRecord,
      createCertificate,
      saveCertificateList,
      importFromExcelFile,
      setSelectedProvider,
    },
  };
};

export default useProductImport;
