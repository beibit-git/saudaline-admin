import axios from 'axios';
import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { CategoriesDtoResponse } from '../interfaces/Categories/CategoriesDtoResponse';
import { CategoryDtoRequest } from '../interfaces/Categories/CategoryDtoRequest';
import { OrderDtoResponse } from '../interfaces/OrderDtoResponse';
import { OrdersDtoForAllResponse } from '../interfaces/Orders/OrdersDtoForAllResponse';

export class OrdersService {
  static baseURL = Constants.API_BASE_URL;

  static getAllCategories() {
    return authAxios.get<{ list: OrdersDtoForAllResponse[]; total_number: number }>('/api/v1/orders/get-all-orders');
  }

  static getOrders(params: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }

    return authAxios.get<{ list: OrdersDtoForAllResponse[]; total_number: number }>('/api/v1/orders/get-all-orders', {
      params,
    });
  }

  static deleteCategory(categoryId: number) {
    return authAxios.delete(`/api/v1/orders/delete-category?id=${categoryId}`);
  }

  static getOneCategory(categoryId: number) {
    return authAxios.get<CategoriesDtoResponse>(`/api/v1/orders/get-by-id?categoryId=${categoryId}`);
  }

  // status 200
  static updateCategory(categoryId: number, updatedCategory: CategoryDtoRequest) {
    return authAxios.put(`/api/v1/orders/update-order?categoryId=${categoryId}`, updatedCategory);
  }

  // Возвращает ID только что созданной дисциплины
  static createCategory(category: CategoryDtoRequest) {
    return authAxios.post<number>('/api/v1/orders/create-category', category);
  }
}
