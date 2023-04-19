import { Tag } from 'antd';

type TariffStatusProps = {
  status: 'NEW' | 'PAID' | 'UNPAID' | undefined;
};

export const TariffStatus: React.FC<TariffStatusProps> = ({ status }) => {
  let color;
  let text;

  switch (status) {
    case 'NEW':
      color = 'orange';
      text = 'заявка отправлена';
      break;
    case 'PAID':
      color = 'green';
      text = 'оплаченный';
      break;
    case 'UNPAID':
      color = 'blue';
      text = 'неоплаченный';
      break;
    default:
      color = 'red';
      text = 'Ошибка';
      break;
  }

  return <Tag color={color}>{text}</Tag>;
};
