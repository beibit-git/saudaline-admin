import { Col, Row } from 'antd';
import React from 'react';

interface RightProps {
  children: React.ReactNode[] | React.ReactNode;
  style?: React.CSSProperties;
}

const Right = ({ children, style }: RightProps) => {
  return (
    <Row style={style}>
      <Col flex={0}></Col>
      <Col flex={'auto'}></Col>
      <Col flex={0}>{children}</Col>
    </Row>
  );
};

export default Right;
