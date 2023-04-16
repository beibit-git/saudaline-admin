import { Typography } from 'antd';
import React from 'react';
import PageWrapper from '../PageWrapper';

interface PageProps {
  children?: React.ReactNode[] | React.ReactNode;
  title?: string;
  subtitle?: string;
  width?: number | string;
  center?: boolean;
  style?: React.CSSProperties;
}

const Page = ({ children, title, subtitle, width, center, style }: PageProps) => {
  return (
    <PageWrapper width={width} center={center} style={style}>
      <Typography.Title style={{ margin: 0 }}>{title}</Typography.Title>
      <Typography.Title level={3} type="secondary" style={{ margin: 0, marginBottom: 20 }}>
        {subtitle}
      </Typography.Title>
      {children}
    </PageWrapper>
  );
};

export default Page;
