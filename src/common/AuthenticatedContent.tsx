// Будем ли оборачивать в этот компонент отдельные роуты по ролям и правам юзеров?

import React from 'react';
import grantPermission from '../helpers/grantPermission';
interface Role {
  role: string | string[];
  children: any;
  type: string;
  roleList?: string[];
}
const AuthenticatedContent: React.FC<Role> = ({ children, role, type, roleList }): JSX.Element => {
  if (Array.isArray(role)) {
    let isValid = false;
    for (let i = 0; i < role.length; i++) {
      if (grantPermission(role[i], type)) {
        isValid = true;
        break;
      }
    }
    return <>{isValid && children}</>;
  } else return <>{grantPermission(role, type) && children}</>;
};
export default AuthenticatedContent;
