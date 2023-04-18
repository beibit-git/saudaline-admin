import React, { useState } from 'react';
import { Button, Typography, Modal, Form, InputNumber, Radio, Select, Space } from 'antd';
import { errorNotification } from '../../../../helpers/errorNotification';
import { useNotification } from '../../../../contexts/notificationContext';
import { Constants } from '../../../../common/constants';
import { CategoriesDtoResponse } from '../../../../interfaces/Categories/CategoriesDtoResponse';
import { SubCategoriesDtoResponse } from '../../../../interfaces/Categories/SubCategoriesDtoResponse';
import { CategoriesService } from '../../../../services/CategoriesService';
import { SubCategoriesService } from '../../../../services/SubCategoriesService';
import { ProductsService } from '../../../../services/ProductsService';
import { ProductsDtoResponse } from '../../../../interfaces/Products/ProductsDtoResponse';
import { PromotionProductDtoRequest } from '../../../../interfaces/Promotions/PromotionProductDtoRequest';
import { ProductPromotionService } from '../../../../services/ProductPromotionService';
import { successNotification } from '../../../../helpers/successNotification';
const { Option } = Select;

interface Props {
  promotionId?: number;
  productPromotionId?: number;
  openModal: boolean;
  onClose: () => void;
}

const ProductAddModal = ({ promotionId, openModal, productPromotionId, onClose }: Props) => {
  const apiUrl = Constants.API_BASE_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldRerender, setShouldRerender] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoriesDtoResponse[]>([]);
  const [products, setProducts] = useState<ProductsDtoResponse[]>([]);
  const [categoryId, setCategoryId] = useState<number>();
  const [subCategoryId, setSubCategoryId] = useState<number>();
  const [subCategories, setSubCategories] = useState<SubCategoriesDtoResponse[]>([]);
  const { openNotification } = useNotification();
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const handleCancel = () => {
    onClose();

    setIsModalOpen(false);
  };

  const handleOk = () => {
    onClose();
    setIsModalOpen(false);
    console.log(form);
  };

  const [form] = Form.useForm();

  // useEffect для страниц с редактированием дисциплины
  React.useEffect(() => {
    setIsModalOpen(openModal);
    if (promotionId) {
      //   .finally(() => setLoading(false));
    }
  }, [promotionId, shouldRerender, openModal]);

  React.useEffect(() => {
    CategoriesService.getAllCategories()
      .then(({ data }) => {
        setCategories(data.list);
      })
      .catch((err) => errorNotification('Не удалось получить данные', err.response?.status));
  }, []);

  React.useEffect(() => {
    SubCategoriesService.getSubCategories({ categoryId })
      .then(({ data }) => {
        if (data.list == null) {
          setSubCategories([]);
        } else {
          setSubCategories(data.list);
        }
      })
      .catch((err) => errorNotification('Не удалось получить данные', err.response?.status));
    ProductsService.getProducts({ categoryId, subCategoryId })
      .then(({ data }) => {
        if (data.list == null) {
          setProducts([]);
        } else {
          setProducts(data.list);
        }
      })
      .catch((err) => errorNotification('Не удалось получить данные', err.response?.status));
  }, [categoryId, subCategoryId]);

  const onFinish = (promotionProduct: PromotionProductDtoRequest) => {
    setLoading(true);
    ProductPromotionService.createProductPromotion(promotionProduct)
      .then(() => successNotification('Данные успешно сохранены'))
      .catch((err) => errorNotification('Не удалось сохранить данные', err.response?.status))
      .finally(() => setLoading(false));
    // productId
    //   ? ProductsService.updateProduct(productId, product)
    //       .then(() => successNotification('Данные успешно обновлены'))
    //       .catch((err) => errorNotification('Не удалось обновить данные', err.response?.status))
    //       .finally(() => setLoading(false))
    //   : ProductsService.createProduct(product)
    //       .then(() => successNotification('Данные успешно сохранены'))
    //       .catch((err) => errorNotification('Не удалось сохранить данные', err.response?.status))
    //       .finally(() => setLoading(false));
  };

  return (
    <Modal
      title={productPromotionId ? 'Добавьте товар в акцию' : 'Изменить скидку на продукт'}
      open={isModalOpen}
      footer={false}
    >
      <Form form={form} layout="vertical" name="userForm" onFinish={onFinish}>
        <Select
          showSearch
          placeholder="Категория"
          optionFilterProp="children"
          onSelect={(value: number) => setCategoryId(value)}
        >
          {categories?.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.title}
            </Option>
          ))}
        </Select>
        <Select
          showSearch
          placeholder="Подкатегория"
          optionFilterProp="children"
          onSelect={(value: number) => setSubCategoryId(value)}
        >
          {subCategories?.map((subCategory) => (
            <Option key={subCategory.id} value={subCategory.id}>
              {subCategory.title}
            </Option>
          ))}
        </Select>
        <Form.Item
          label="Товар"
          name="product"
          rules={[
            {
              required: true,
              message: 'Выберите товар',
            },
          ]}
        >
          <Select showSearch optionFilterProp="children" placeholder="Товар">
            {products ? (
              products?.map((product) => (
                <Option key={product.id} value={product.id}>
                  {product.title}
                </Option>
              ))
            ) : (
              <Option>Нет товар</Option>
            )}
            {}
          </Select>
        </Form.Item>
        <Form.Item name="discount" label="Скидка" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item hidden initialValue={promotionId} name="promotion"></Form.Item>
        <Form.Item
          label="Сделать активным"
          name="isActive"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group>
            <Radio value="true"> Да</Radio>
            <Radio value="false"> Нет </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
            <Button
              htmlType="button"
              onClick={() => {
                form.resetFields();
                onClose();
                setIsModalOpen(false);
              }}
            >
              Отменить
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductAddModal;
