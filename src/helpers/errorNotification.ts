import { notification } from 'antd';
import { setErrorMessageByCode } from './setErrorMessageByCode';

export const errorNotification = (message: string, code?: string | number) => {
  notification.error({
    message: message,
    description: code ? setErrorMessageByCode(code) : null,
  });
};
