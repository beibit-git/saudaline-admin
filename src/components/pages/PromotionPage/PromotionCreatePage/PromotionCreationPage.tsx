import './style.module.css';

import React, { useState } from 'react';
import { Input, Typography, Form, Button, Space, Checkbox, Spin, Select, Upload, Image, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PageWrapper from '../../../../ui/PageWrapper';
import BackButton from '../../../../ui/BackButton';
import UserService from '../../../../services/userService';
import { errorNotification } from '../../../../helpers/errorNotification';
import { successNotification } from '../../../../helpers/successNotification';
import { Constants } from '../../../../common/constants';
import { PromotionsService } from '../../../../services/PromotionsService';
import { PromotionsDtoRequest } from '../../../../interfaces/Promotions/PromotionDtoRequest';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from 'moment';

const { Title } = Typography;

interface Props {
  promotionId?: number;
}

const PromotionCreationPage = ({ promotionId }: Props) => {
  const apiUrl = Constants.API_BASE_URL;
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY/MM/DD';

  const styles = { width: '800px', margin: '0 auto' };

  // useEffect для страниц с редактированием дисциплины
  React.useEffect(() => {
    if (promotionId) {
      setLoading(true);
      PromotionsService.getOnePromotion(promotionId)
        .then(({ data }) => {
          console.log('121321321');
          form.setFieldsValue({
            title: data.title,
            subTitle: data.subTitle,
            description: data.description,
            startDate: moment(data.startDate),
            finishDate: moment(data.finishDate),
            isActive: data.isActive,
            photo: data.photo,
          });
        })
        .catch((err) => errorNotification('Не удалось получить данные', err.response?.status))
        .finally(() => setLoading(false));
    }
  }, [promotionId, form]);

  const onFinish = (promotion: PromotionsDtoRequest) => {
    setLoading(true);
    promotionId
      ? PromotionsService.updatePromotion(promotionId, promotion)
          .then(() => successNotification('Данные успешно обновлены'))
          .catch((err) => errorNotification('Не удалось обновить данные', err.response?.status))
          .finally(() => setLoading(false))
      : PromotionsService.createPromotion(promotion)
          .then(() => successNotification('Данные успешно сохранены'))
          .catch((err) => errorNotification('Не удалось сохранить данные', err.response?.status))
          .finally(() => setLoading(false));
  };

  return (
    <PageWrapper>
      <BackButton />
      <header style={styles}>
        <Title level={3}>{promotionId ? 'Редактировать акцию' : 'Создание акций'}</Title>
      </header>
      {isLoading ? (
        <Spin />
      ) : form ? (
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
            label="Название рекламной акции"
            name="title"
            rules={[
              {
                required: true,
                message: 'Введите название рекламной акции',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Подзаголовок акции"
            name="subTitle"
            rules={[
              {
                required: true,
                message: 'Подзаголовок акции',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Картинка акции"
            name="photo"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[
              {
                required: true,
                message: 'Загрузите картинку для акции',
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
              {/* <Button icon={<UploadOutlined />}></Button> */}
            </Upload>
          </Form.Item>
          <Form.Item
            label="Краткое описание акции"
            name="description"
            rules={[
              {
                required: true,
                message: 'Введите краткое описание акции',
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
            label="Дата начала"
            name="startDate"
            valuePropName="defaultValue"
            rules={[
              {
                required: true,
                message: 'Выберите дату начала акции',
              },
            ]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            label="Дата окончания"
            name="finishDate"
            valuePropName="defaultValue"
            rules={[
              {
                required: true,
                message: 'Выберите дату окончания акции',
              },
            ]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            label="Статус"
            name="isActive"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: 'Выберите дату окончания акции',
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
      ) : null}
    </PageWrapper>
  );
};

export default PromotionCreationPage;
