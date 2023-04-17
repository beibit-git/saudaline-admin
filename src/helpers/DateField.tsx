import React from 'react';
import dayjs from 'dayjs';
import { Typography } from 'antd';

import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);

const defaultLocale = dayjs.locale();

type DateFieldProps = {
  value: string;
  format: string;
};

export const DateField: React.FC<DateFieldProps> = ({ value, format: dateFormat = 'L', ...rest }) => {
  const { Text } = Typography;

  return <Text {...rest}>{dayjs(value).locale(defaultLocale).format(dateFormat)}</Text>;
};
