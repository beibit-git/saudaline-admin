import { AESDecrypt, AESEncrypt } from '../common/crypto';

const grantPermission = (requestedRole, type) => {
  const baseRole = JSON.parse(localStorage.getItem('user'));
  var isValid = false;
  if (baseRole) {
    if (type === 'baseRole') {
      isValid = requestedRole === AESDecrypt(baseRole.baseRole);
      return isValid;
    } else {
      baseRole.roleList.forEach((role) => {
        if (AESDecrypt(role.roleName) === requestedRole) {
          isValid = true;
          return true;
        }
      });
      return isValid;
    }
  }
};

export default grantPermission;
