import { Col, Row } from 'antd';
import React from 'react';

interface CenterProps {
  children: React.ReactNode[] | React.ReactNode;
  style?: React.CSSProperties;
  lg?: number;
}

const Center = ({ children, style, lg = 8 }: CenterProps) => {
  return (
    <Row style={style}>
      <Col lg={(24 - lg) / 2} xs={24}></Col>
      <Col lg={lg} xs={24}>
        {children}
      </Col>
      <Col lg={(24 - lg) / 2} xs={24}></Col>
    </Row>
  );
};

export default Center;
