import './style.module.css';

import React, { useState } from 'react';
import { Input, Typography, Form, Button, Space, Spin, Select, Upload } from 'antd';
import PageWrapper from '../../../../ui/PageWrapper';
import { CategoriesService } from '../../../../services/CategoriesService';
import { CategoriesDtoResponse } from '../../../../interfaces/Categories/CategoriesDtoResponse';
import BackButton from '../../../../ui/BackButton';
import UserService from '../../../../services/userService';
import { errorNotification } from '../../../../helpers/errorNotification';
import { successNotification } from '../../../../helpers/successNotification';
import { ProductsService } from '../../../../services/ProductsService';
import { ProductDtoRequest } from '../../../../interfaces/Products/ProductDtoRequest';
import { BrandsService } from '../../../../services/BrandsService';
import { BrandsDtoResponse } from '../../../../interfaces/Products/BrandsDtoResponse';
import { SubCategoriesService } from '../../../../services/SubCategoriesService';
import { SubCategoriesDtoResponse } from '../../../../interfaces/Categories/SubCategoriesDtoResponse';
import { Constants } from '../../../../common/constants';

const { Title } = Typography;
const { Option } = Select;

interface Props {
  productId?: number;
}

const ProductCreationPage = ({ productId }: Props) => {
  const apiUrl = Constants.API_BASE_URL;
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const [brands, setBrands] = useState<BrandsDtoResponse[]>([]);
  const [categories, setCategories] = useState<CategoriesDtoResponse[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategoriesDtoResponse[]>([]);

  const styles = { width: '800px', margin: '0 auto' };

  // useEffect для страниц с редактированием дисциплины
  React.useEffect(() => {
    if (productId) {
      setLoading(true);
      ProductsService.getOneProduct(productId)
        .then(({ data }) => {
          form.setFieldsValue({
            title: data.title,
            description: data.description,
            brand: data.brand.id,
            mainPhoto: data.mainPhoto ? [data.mainPhoto] : undefined,
            unitType: data.unitType,
            hits: data.hits,
            price: data.price,
            category: data.category.id,
            subCategory: data.subCategory,
            discount: data.discount,
            discountprice: data.discountprice,
          });
        })
        .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
        .finally(() => setLoading(false));
    }
  }, [productId, form]);

  React.useEffect(() => {
    BrandsService.getBrands()
      .then(({ data }) => {
        setBrands(data.list);
      })
      .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
      .finally(() => setLoading(false));
    CategoriesService.getCategories({ userId: UserService.getCurrentUser().id })
      .then(({ data }) => {
        setCategories(data.list);
      })
      .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
      .finally(() => setLoading(false));
    SubCategoriesService.getSubCategories({
      userId: UserService.getCurrentUser().id,
    })
      .then(({ data }) => {
        setSubCategories(data.list);
      })
      .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
      .finally(() => setLoading(false));
  }, []);

  const onFinish = (product: ProductDtoRequest) => {
    setLoading(true);
    productId
      ? ProductsService.updateProduct(productId, product)
          .then(() => successNotification('Данные успешно обновлены'))
          .catch((err) => errorNotification('Не удалось обновить данные', err.response?.status))
          .finally(() => setLoading(false))
      : ProductsService.createProduct(product)
          .then(() => successNotification('Данные успешно сохранены'))
          .catch((err) => errorNotification('Не удалось сохранить данные', err.response?.status))
          .finally(() => setLoading(false));
  };

  return (
    <PageWrapper>
      <BackButton />
      <header style={styles}>
        <Title level={3}>{productId ? 'Редактировать товар' : 'Добавление товара'}</Title>
      </header>
      {isLoading ? (
        <Spin />
      ) : (
        <Form
          layout="vertical"
          size="large"
          style={styles}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Наименование товара"
            name="title"
            rules={[
              {
                required: true,
                message: 'Введите наименование товара',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Картинка товара"
            name="mainPhoto"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[
              {
                required: true,
                message: 'Загрузите картинку товара',
              },
            ]}
          >
            <Upload
              accept="image/*"
              maxCount={1}
              listType="picture-card"
              action={`${apiUrl}/api/v1/file/upload-photos`}
              className="avatar-uploader"
            >
              + Загрузить картинку
            </Upload>
          </Form.Item>
          <Form.Item
            label="Краткое описание продукта"
            name="description"
            rules={[
              {
                required: true,
                message: 'Введите краткое описание продукта',
              },
            ]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item
            name="provider"
            initialValue={UserService.getCurrentUser().id}
            hidden
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Категория"
            name="category"
            rules={[
              {
                required: true,
                message: 'Выберите категорию товара',
              },
            ]}
          >
            <Select showSearch placeholder="Категория">
              {categories?.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Подкатегория" name="subcategory">
            <Select showSearch placeholder="Подкатегория">
              {subCategories?.map((subCategory) => (
                <Option key={subCategory.id} value={subCategory.id}>
                  {subCategory.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Торговая марка"
            name="brand"
            rules={[
              {
                required: true,
                message: 'Выберите торговую марку',
              },
            ]}
          >
            <Select showSearch placeholder="Торговая марка">
              {brands?.map((brand) => (
                <Option key={brand.id} value={brand.id}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Цена"
            name="price"
            rules={[
              {
                required: true,
                message: 'Введите цену для товара',
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
              <Button htmlType="button" onClick={() => form.resetFields()}>
                Сбросить форму
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </PageWrapper>
  );
};

export default ProductCreationPage;
