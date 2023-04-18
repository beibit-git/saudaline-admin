import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { ProductDtoRequest } from '../interfaces/Products/ProductDtoRequest';
import { PromotionDtoForAll } from '../interfaces/Promotions/PromotionDtoForAll';
import { PromotionsDtoRequest } from '../interfaces/Promotions/PromotionDtoRequest';
import { Promotions } from '../interfaces/Promotions/Promotions';

export class PromotionsService {
  static baseURL = Constants.API_BASE_URL;

  //   static getCategories() {
  //     return authAxios.get<CategoriesDtoResponse[]>('/api/v1/categories/get-all-categories');
  //   }

  static getPromotions(params: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }

    return authAxios.get<{ list: PromotionDtoForAll[]; total_number: number }>('/api/v1/promotion/get-all-promotions', {
      params,
    });
  }

  static deletePromotion(promotionId: number) {
    return authAxios.delete(`/api/v1/promotion/delete-promotion?promotionId=${promotionId}`);
  }

  static getOnePromotion(promotionId: number) {
    return authAxios.get<Promotions>(`/api/v1/promotion/get-by-id?promotionId=${promotionId}`);
  }

  // status 200
  static updatePromotion(promotionId: number, updatedPromotion: PromotionsDtoRequest) {
    return authAxios.put(`/api/v1/promotion/update-promotion?promotionId=${promotionId}`, updatedPromotion);
  }

  // Возвращает ID только что созданной дисциплины
  static createPromotion(promotion: PromotionsDtoRequest) {
    return authAxios.post<number>('/api/v1/promotion/create-promotion', promotion);
  }
}
