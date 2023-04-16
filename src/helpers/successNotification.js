import { notification } from 'antd';

export const successNotification = (message) => {
  notification.success({
    message: message,
  });
};
