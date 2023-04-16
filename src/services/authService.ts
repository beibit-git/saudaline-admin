import axios from 'axios';
import { Constants } from '../common/constants';
import { AESEncrypt } from '../common/crypto';
interface JSONResp {
  status: number;
  baseRole: string;
}
class AuthService {
  static isLoggedIn() {
    return !!localStorage.getItem('user');
  }
  static baseURL = Constants.API_BASE_URL;

  static async login(data: string) {
    try {
      const response = await axios.post<JSONResp>(`${this.baseURL}/api/v1/auth/login`, data);
      // console.log(response);
      if (response.status === 200) {
        //console.log(response.headers);
        // const jwtToken = response.headers.get("Jwt-Token");
        // console.log(jwtToken);
        // console.log(response.headers["jwt-token"]);
        this.setToken(response.headers['jwt-token']);
        this.setCredentials(response.data);
        return Promise.resolve(response);
      }
    } catch (error: any) {
      // console.log(error.response);

      const message = error.response?.data?.message;
      if (message) {
        // console.log(message);
        return Promise.reject(message);
      }
      const defaultErr = error.response?.data?.statusText;
      if (defaultErr) {
        return Promise.reject(defaultErr);
      } else {
        return Promise.reject('Server Error');
      }
    }
  }

  static setCredentials(response: any) {
    var baseRole = { roleName: response.role.roleName };
    response.baseRole = AESEncrypt(baseRole.roleName);
    response.role.roleName = AESEncrypt(response.role.roleName);
    localStorage.setItem('user', JSON.stringify(response));
  }

  static setToken(response: any) {
    localStorage.setItem('token', response);
  }
}
export default AuthService;
