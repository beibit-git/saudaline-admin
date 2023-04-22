import axios from 'axios';
import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { CategoriesDtoResponse } from '../interfaces/Categories/CategoriesDtoResponse';
import { CategoryDtoRequest } from '../interfaces/Categories/CategoryDtoRequest';

export class CategoriesService {
  static baseURL = Constants.API_BASE_URL;

  static getAllCategories() {
    return authAxios.get<{ list: CategoriesDtoResponse[]; total_number: number }>(
      '/api/v1/categories/get-all-categories'
    );
  }

  static getAll() {
    return authAxios.get<CategoriesDtoResponse[]>('/api/v1/categories/get-all');
  }

  static getCategories(params: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }

    return authAxios.get<{ list: CategoriesDtoResponse[]; total_number: number }>(
      '/api/v1/categories/get-all-categories',
      { params }
    );
    // return authAxios.get<{ list: DisciplineDtoResponse[] }>('/astanait-office-module/api/v1/academic-department/discipline/get-disciplines-by-filter', { params })
  }

  static deleteCategory(categoryId: number) {
    return authAxios.delete(`/api/v1/categories/delete-category?id=${categoryId}`);
  }

  static getOneCategory(categoryId: number) {
    return authAxios.get<CategoriesDtoResponse>(`/api/v1/categories/get-by-id?categoryId=${categoryId}`);
  }

  // status 200
  static updateCategory(categoryId: number, updatedCategory: CategoryDtoRequest) {
    return authAxios.put(`/api/v1/categories/update-category?categoryId=${categoryId}`, updatedCategory);
  }

  // Возвращает ID только что созданной дисциплины
  static createCategory(category: CategoryDtoRequest) {
    return authAxios.post<number>('/api/v1/categories/create-category', category);
  }
}
