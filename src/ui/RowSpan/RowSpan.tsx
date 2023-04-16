import { Col, Row } from 'antd';
import React from 'react';

interface RowSpanProps {
  left?: React.ReactNode[] | React.ReactNode;
  right?: React.ReactNode[] | React.ReactNode;
}

const RowSpan = ({ left, right }: RowSpanProps) => {
  return (
    <Row gutter={[16, 20]}>
      <Col flex={0}>{left}</Col>
      <Col flex={'auto'}></Col>
      <Col flex={0}>{right}</Col>
    </Row>
  );
};

export default RowSpan;
