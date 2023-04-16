import axios from 'axios';
import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { ProviderDtoResponse } from '../interfaces/provider/ProviderDtoResponse';
import { UserDtoResponse } from '../interfaces/UserDtoResponse';

class UserService {
  static baseURL = Constants.API_BASE_URL;

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '');
  }

  static switchRoles(changeTo: string) {
    const user = this.getCurrentUser();
    user.baseRole = changeTo;
    localStorage.setItem('user', JSON.stringify(user));
  }

  static logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  static getProfileByPrincipal() {
    return authAxios.get<ProviderDtoResponse>('/api/v1/provider/get-provider-by-principal');
  }

  static getProfileById(userId: number) {
    return authAxios.get<ProviderDtoResponse>(`/api/v1/provider/get-by-userid${userId}`);
  }

  static getUserInfo(userId?: number) {
    return axios.get<UserDtoResponse>(
      `${this.baseURL}/astanait-authorization-module/api/v1/auth/get-user-by-id?user_id=${userId}`
    );
  }
}
export default UserService;
