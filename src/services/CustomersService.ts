import axios from 'axios';
import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { CategoryDtoRequest } from '../interfaces/Categories/CategoryDtoRequest';
import { ProviderDtoResponse } from '../interfaces/provider/ProviderDtoResponse';
import { CustomerDtoResponse } from '../interfaces/Customers/CustomerDtoResponse';

export class CustomersService {
  static baseURL = Constants.API_BASE_URL;

  static getAllCustomers() {
    return authAxios.get<{ list: CustomerDtoResponse[]; total_number: number }>('/api/v1/customer/get-all-customers');
  }

  static getAll() {
    return authAxios.get<CustomerDtoResponse[]>('/api/v1/customer/get-all');
  }

  static getCustomers(params: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }

    return authAxios.get<{ list: CustomerDtoResponse[]; total_number: number }>('/api/v1/customer/get-all-customers', {
      params,
    });
    // return authAxios.get<{ list: DisciplineDtoResponse[] }>('/astanait-office-module/api/v1/academic-department/discipline/get-disciplines-by-filter', { params })
  }

  static deleteProvider(providerId: number) {
    return authAxios.delete(`/api/v1/customer/delete-category?id=${providerId}`);
  }

  static getOneProvider(providerId: number) {
    return authAxios.get<ProviderDtoResponse>(`/api/v1/customer/get-by-id?providerId=${providerId}`);
  }

  // status 200
  static updateProvider(providerId: number, updatedCategory: CategoryDtoRequest) {
    return authAxios.put(`/api/v1/customer/update-category?providerId=${providerId}`, updatedCategory);
  }

  // Возвращает ID только что созданной дисциплины
  static createCategory(category: CategoryDtoRequest) {
    return authAxios.post<number>('/api/v1/customer/create-category', category);
  }
}
