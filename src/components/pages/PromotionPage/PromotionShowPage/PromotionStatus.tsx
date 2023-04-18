import { Tag } from 'antd';

type PromotionStatusProps = {
  status: boolean | undefined;
};

export const PromotionStatus: React.FC<PromotionStatusProps> = ({ status }) => {
  let color;
  let text;

  switch (status) {
    case true:
      color = 'green';
      text = 'Активный';
      break;
    case false:
      color = 'orange';
      text = 'Неактивный';
      break;
    default:
      color = 'gray';
      text = 'Ошибка';
      break;
  }

  return (
    <Tag style={{ fontSize: '16px' }} color={color}>
      {text}
    </Tag>
  );
};
