import './style.module.css';

import React, { useState } from 'react';
import { Input, Typography, Form, Button, Space, Checkbox, Spin } from 'antd';
import PageWrapper from '../../../../ui/PageWrapper';
import { CategoriesService } from '../../../../services/CategoriesService';
import { CategoriesDtoResponse } from '../../../../interfaces/Categories/CategoriesDtoResponse';
import BackButton from '../../../../ui/BackButton';
import UserService from '../../../../services/userService';
import { errorNotification } from '../../../../helpers/errorNotification';
import { successNotification } from '../../../../helpers/successNotification';
import { CategoryDtoRequest } from '../../../../interfaces/Categories/CategoryDtoRequest';

const { Title } = Typography;

interface Props {
  categoryId?: number;
}

const CategoryCreationPage = ({ categoryId }: Props) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);

  const styles = { width: '800px', margin: '0 auto' };

  // useEffect для страниц с редактированием дисциплины
  React.useEffect(() => {
    if (categoryId) {
      setLoading(true);
      CategoriesService.getOneCategory(categoryId)
        .then(({ data }) => {
          form.setFieldsValue({
            title: data.title,
            description: data.description,
            isActive: data.isActive,
          });
        })
        .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
        .finally(() => setLoading(false));
    }
  }, [categoryId, form]);

  const onFinish = (category: CategoryDtoRequest) => {
    setLoading(true);
    categoryId
      ? CategoriesService.updateCategory(categoryId, category)
          .then(() => successNotification('Данные успешно обновлены'))
          .catch((err) => errorNotification('Не удалось обновить данные', err.response?.status))
          .finally(() => setLoading(false))
      : CategoriesService.createCategory(category)
          .then(() => successNotification('Данные успешно сохранены'))
          .catch((err) => errorNotification('Не удалось сохранить данные', err.response?.status))
          .finally(() => setLoading(false));
  };

  return (
    <PageWrapper>
      <BackButton />
      <header style={styles}>
        <Title level={3}>{categoryId ? 'Редактировать категорию' : 'Создание категории'}</Title>
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
            label="Название категории"
            name="title"
            rules={[
              {
                required: true,
                message: 'Введите название категории',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Краткое описание категории"
            name="description"
            rules={[
              {
                required: true,
                message: 'Введите краткое описание категории',
              },
            ]}
          >
            <Input.TextArea />
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
            label="Сделать категорию активной"
            name="isActive"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: 'Поставьте галочку, если хотите сделать категорию активной',
              },
            ]}
          >
            <Checkbox>Активный</Checkbox>
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

export default CategoryCreationPage;
