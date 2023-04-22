import axios from 'axios';
import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { CategoriesDtoResponse } from '../interfaces/Categories/CategoriesDtoResponse';
import { CategoryDtoRequest } from '../interfaces/Categories/CategoryDtoRequest';
import { ProviderDtoResponse } from '../interfaces/provider/ProviderDtoResponse';

export class ProvidersService {
  static baseURL = Constants.API_BASE_URL;

  static getAllProviders() {
    return authAxios.get<{ list: ProviderDtoResponse[]; total_number: number }>('/api/v1/provider/get-all-providers');
  }

  static getAll() {
    return authAxios.get<ProviderDtoResponse[]>('/api/v1/provider/get-all');
  }

  static getProviders(params: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }

    return authAxios.get<{ list: ProviderDtoResponse[]; total_number: number }>('/api/v1/provider/get-all-providers', {
      params,
    });
    // return authAxios.get<{ list: DisciplineDtoResponse[] }>('/astanait-office-module/api/v1/academic-department/discipline/get-disciplines-by-filter', { params })
  }

  static deleteProvider(providerId: number) {
    return authAxios.delete(`/api/v1/provider/delete-category?id=${providerId}`);
  }

  static getOneProvider(providerId: number) {
    return authAxios.get<ProviderDtoResponse>(`/api/v1/provider/get-by-id?providerId=${providerId}`);
  }

  // status 200
  static updateProvider(providerId: number, updatedCategory: CategoryDtoRequest) {
    return authAxios.put(`/api/v1/provider/update-category?providerId=${providerId}`, updatedCategory);
  }

  // Возвращает ID только что созданной дисциплины
  static createCategory(category: CategoryDtoRequest) {
    return authAxios.post<number>('/api/v1/provider/create-category', category);
  }
}
