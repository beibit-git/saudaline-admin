import { Button, Checkbox, DatePicker, Form, Input, Modal, notification } from 'antd';
import { useNotification } from '../../../contexts/notificationContext';
import { errorNotification } from '../../../helpers/errorNotification';
import { setErrorMessageByCode } from '../../../helpers/setErrorMessageByCode';
import { FileService } from '../../../services/FileService';

interface CreateModalProps {
  open: boolean;
  onCancel: () => void;
}

const CreateProductModal = ({ open, onCancel }: CreateModalProps) => {
  const form = Form.useFormInstance();
  const { openNotification } = useNotification();
  const onExit = () => {
    // console.log('Are you sure you want to leave?');
  };

  const onSubmit = (form: any) => {
    // FileService.ex(form)
    //   .then(({ data }) => notification.success({ message: 'Сертификат зарегистрирован!' }))
    //   .catch((err) =>
    //     notification.error({
    //       message: 'Не удалось зарегистрировать сертификат',
    //       description: setErrorMessageByCode(err.response?.status),
    //     })
    //   )
    //   .finally(() => onCancel());
  };

  return (
    <Modal title="Зарегистрировать сертификата" centered open={open} onCancel={onCancel} width={700} footer={null}>
      <Form layout="vertical" onValuesChange={onExit} onFinish={onSubmit} form={form}>
        <Form.Item name="issuedTo" label="ФИО" rules={[{ required: true }]}>
          <Input placeholder="Введите ФИО" />
        </Form.Item>
        <Form.Item name="courseName" label="Название курса">
          <Input placeholder="Введите название" />
        </Form.Item>
        <Form.Item name="number" label="Номер сертификата" rules={[{ required: true }]}>
          <Input placeholder="Введите номер сертификата" />
        </Form.Item>
        <Form.Item name="type" label="Тип сертификата">
          <Input placeholder="Введите тип сертификата" />
        </Form.Item>
        <Form.Item name="issuedDate" label="Дата выдачи">
          <DatePicker placeholder="Выберите дату" />
        </Form.Item>
        <Form.Item name="validUntil" label="Действителен до">
          <DatePicker placeholder="Выберите дату" />
        </Form.Item>
        <Form.Item name="isActive" valuePropName="checked" initialValue={false}>
          <Checkbox>Активен?</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зарегистрировать
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
