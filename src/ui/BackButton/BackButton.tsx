import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const BackButton = () => {
  return (
    <Button type="default" icon={<LeftOutlined />} onClick={() => window.history.back()}>
      Назад
    </Button>
  );
};

export default BackButton;
