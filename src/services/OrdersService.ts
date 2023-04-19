import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { OrdersDtoForAllResponse } from '../interfaces/Orders/OrdersDtoForAllResponse';
import { OrderDtoShow } from '../interfaces/Orders/OrderShow/OrderDtoShow';

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

  static acceptOrder(orderId: number | undefined) {
    return authAxios.post(`/api/v1/orders/accept-order?orderId=${orderId}`);
  }

  static rejectOrder(orderId: number | undefined) {
    return authAxios.post(`/api/v1/orders/reject-order?orderId=${orderId}`);
  }

  static getOneOrder(orderId: number) {
    return authAxios.get<OrderDtoShow>(`/api/v1/orders/get-by-id?orderId=${orderId}`);
  }

  // // status 200
  // static updateCategory(categoryId: number, updatedCategory: CategoryDtoRequest) {
  //   return authAxios.put(`/api/v1/orders/update-order?categoryId=${categoryId}`, updatedCategory);
  // }

  // // Возвращает ID только что созданной дисциплины
  // static createCategory(category: CategoryDtoRequest) {
  //   return authAxios.post<number>('/api/v1/orders/create-category', category);
  // }
}
