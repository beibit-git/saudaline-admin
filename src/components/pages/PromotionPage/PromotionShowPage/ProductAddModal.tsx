import React, { useState } from 'react';
import { Button, Typography, Modal, Form, InputNumber, Radio, Select, Space, Col, Image, Spin } from 'antd';
import { errorNotification } from '../../../../helpers/errorNotification';
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
const { Text } = Typography;

interface Props {
  promotionId?: number;
  productPromotionId?: number | null;
  openModal: boolean;
  onClose: () => void;
}

const ProductAddModal = ({ promotionId, openModal, productPromotionId, onClose }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldRerender, setShouldRerender] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoriesDtoResponse[]>([]);
  const [products, setProducts] = useState<ProductsDtoResponse[]>([]);
  const [categoryId, setCategoryId] = useState<number>();
  const [subCategoryId, setSubCategoryId] = useState<number>();
  const [subCategories, setSubCategories] = useState<SubCategoriesDtoResponse[]>([]);

  const handleCancel = () => {
    form.resetFields();
    onClose();
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  // useEffect для страниц с редактированием дисциплины
  React.useEffect(() => {
    setIsModalOpen(openModal);
    form.resetFields();
    if (productPromotionId !== null && productPromotionId !== undefined) {
      setLoading(true);
      ProductPromotionService.getOneProductPromotion(productPromotionId)
        .then(({ data }) => {
          form.setFieldsValue({
            id: data.id,
            discount: data.discount,
            discountPrice: data.discountPrice,
            isActive: data.isActive,
            productDetails: data.product,
            product: data.product.id,
            photo: data.product.mainPhoto[0].url,
          });
        })
        .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
        .finally(() => setLoading(false));
    }
  }, [productPromotionId, shouldRerender, openModal]);

  React.useEffect(() => {
    CategoriesService.getAllCategories()
      .then(({ data }) => {
        setCategories(data.list);
      })
      .catch((err) => errorNotification('Не удалось получить данные', err.response?.status));
    SubCategoriesService.getSubCategories({})
      .then(({ data }) => {
        if (data.list == null) {
          setSubCategories([]);
        } else {
          setSubCategories(data.list);
        }
      })
      .catch((err) => errorNotification('Не удалось получить данные', err.response?.status));
    ProductsService.getProducts({})
      .then(({ data }) => {
        if (data.list == null) {
          setProducts([]);
        } else {
          setProducts(data.list);
        }
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
    productPromotionId
      ? ProductPromotionService.updateProductPromotion(productPromotionId, promotionProduct)
          .then(() => successNotification('Данные успешно обновлены'))
          .catch((err) => {
            if (err.response.data.message === 'This product is already discounted.') {
              errorNotification('Этот товар уже со скидкой.');
            } else {
              errorNotification('Не удалось обновить данные', err.response?.status);
            }
          })
          .finally(() => setLoading(false))
      : ProductPromotionService.createProductPromotion(promotionProduct)
          .then(() => successNotification('Данные успешно сохранены'))
          .catch((err) => {
            if (err.response.data.message === 'This product is already discounted.') {
              errorNotification('Этот товар уже со скидкой.');
            } else {
              errorNotification('Не удалось сохранить данные', err.response?.status);
            }
          })
          .finally(() => setLoading(false));
  };

  return (
    <Modal
      title={productPromotionId ? 'Добавьте товар в акцию' : 'Изменить скидку на продукт'}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={false}
    >
      {isLoading ? (
        <Spin />
      ) : (
        <>
          {productPromotionId !== null && productPromotionId !== undefined ? (
            <>
              {form.getFieldValue('productDetails') !== null && form.getFieldValue('productDetails') !== undefined ? (
                <Form form={form} layout="vertical" onFinish={onFinish}>
                  <Image
                    src={form.getFieldValue('photo')}
                    title={form.getFieldValue('productDetails')?.title}
                    width={'30%'}
                  />
                  <Typography>{form.getFieldValue('productDetails')?.title}</Typography>
                  <Form.Item hidden label="Товар" name="product"></Form.Item>
                  <Form.Item name="discount" label="Скидка" rules={[{ required: true }]}>
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    label="Сделать активным"
                    name="isActive"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Radio.Group defaultValue={true}>
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
              ) : null}
            </>
          ) : (
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Col span={24}>
                <Text>Категория</Text>
                <Select
                  showSearch
                  placeholder="Категория"
                  optionFilterProp="children"
                  onSelect={(value: number) => setCategoryId(value)}
                  style={{ width: '100%' }}
                >
                  {categories?.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.title}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={24} style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Text>Подкатегория</Text>
                <Select
                  showSearch
                  placeholder="Подкатегория"
                  optionFilterProp="children"
                  onSelect={(value: number) => setSubCategoryId(value)}
                  style={{ width: '100%' }}
                >
                  {subCategories?.map((subCategory) => (
                    <Option key={subCategory.id} value={subCategory.id}>
                      {subCategory.title}
                    </Option>
                  ))}
                </Select>
              </Col>
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
                <Select showSearch optionFilterProp="children" placeholder="Товар" className="selectProduct">
                  {products ? (
                    products?.map((product) => (
                      <Option key={product.id} value={product.id} className="optionProducts">
                        {product.title}
                      </Option>
                    ))
                  ) : (
                    <Option>Нет товар</Option>
                  )}
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
                  <Button htmlType="button" onClick={() => handleCancel()}>
                    Отменить
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          )}
        </>
      )}
    </Modal>
  );
};

export default ProductAddModal;
